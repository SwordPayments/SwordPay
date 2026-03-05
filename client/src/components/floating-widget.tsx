import { useState } from "react";
import { useTranslation } from "react-i18next";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

function FileshareModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-none sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col w-full sm:w-[420px]"
        style={{ height: '100dvh', maxHeight: '100dvh' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 bg-white/80 hover:bg-white rounded-full p-1.5 shadow text-gray-500 hover:text-gray-800 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        {/* iframe — loads swordpay.me upload flow directly */}
        <iframe
          src="https://www.swordpay.me/upload-file"
          className="w-full h-full border-0"
          title="SWORD FileShare"
          allow="camera; microphone; payment; clipboard-write"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
        />
      </div>
    </div>
  );
}

export function FloatingWidget() {
  const [showModal, setShowModal] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      {showModal && <FileshareModal onClose={() => setShowModal(false)} />}
      {/* Mobile: just the button */}
      <div
        className="fixed bottom-4 right-2 z-50 flex sm:hidden"
        onClick={() => setShowModal(true)}
        data-testid="floating-widget-mobile"
      >
        <Button className="bg-blue-600 hover:bg-blue-700 rounded-full font-semibold animate-pulse text-xs px-3 py-2 shadow-lg">
          {t('widget.cta')}
        </Button>
      </div>

      {/* Desktop: full card */}
      <div
        className="hidden sm:flex fixed bottom-6 right-6 z-50 cursor-pointer hover:scale-105 transition-transform flex-col items-center gap-0"
        style={{ width: '120px' }}
        onClick={() => setShowModal(true)}
        data-testid="floating-widget"
      >
        <Button
          className="w-full bg-blue-600 hover:bg-blue-700 rounded-full font-semibold animate-pulse py-1 px-3"
          style={{ fontSize: '13.2px' }}
        >
          {t('widget.cta')}
        </Button>
        <div className="relative w-full">
          <img
            src="/images/fileshare-new.jpg"
            alt="SWORD FileShare"
            className="w-full rounded-xl shadow-2xl border border-white/30"
          />
          <div className="absolute inset-0 rounded-xl pointer-events-none">
            <span className="absolute font-black text-black tracking-wider text-center bg-white rounded px-2 py-1 w-full block animate-pulse" style={{ top: '15%', fontSize: '15.4px' }}>SET PRICE</span>
            <span className="absolute font-black text-black tracking-wider text-center bg-white rounded px-2 py-1 w-full block animate-pulse" style={{ top: '35%', fontSize: '15.4px' }}>ADD FILE</span>
            <span className="absolute font-black text-black tracking-wider text-center bg-white rounded px-2 py-1 w-full block animate-pulse" style={{ top: '55%', fontSize: '15.4px' }}>SHARE</span>
          </div>
        </div>
      </div>
    </>
  );
}
