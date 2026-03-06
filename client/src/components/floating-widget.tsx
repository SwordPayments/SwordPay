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
      {/* Full card widget on all screen sizes */}
      <div
        className="fixed bottom-4 right-2 min-[414px]:bottom-6 min-[414px]:right-4 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8 z-50 cursor-pointer hover:scale-105 transition-transform flex flex-col items-center gap-0 w-[146px] min-[414px]:w-[193px] sm:w-[165px] lg:w-[198px]"
        onClick={() => setShowModal(true)}
        data-testid="floating-widget"
      >
        <Button
          className="w-full bg-blue-600 hover:bg-blue-700 rounded-full font-semibold animate-pulse py-1 px-3 text-[17.5px] min-[414px]:text-[23px] sm:text-[19.8px] lg:text-[24px]"
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
            <span className="absolute font-black text-black tracking-wider text-center bg-white rounded px-2 py-1 w-full block animate-flash text-[20.4px] min-[414px]:text-[27px] sm:text-[23px] lg:text-[28px]" style={{ top: '15%' }}>SET PRICE</span>
            <span className="absolute font-black text-black tracking-wider text-center bg-white rounded px-2 py-1 w-full block animate-flash text-[20.4px] min-[414px]:text-[27px] sm:text-[23px] lg:text-[28px]" style={{ top: '35%' }}>ADD FILE</span>
            <span className="absolute font-black text-black tracking-wider text-center bg-white rounded px-2 py-1 w-full block animate-flash text-[20.4px] min-[414px]:text-[27px] sm:text-[23px] lg:text-[28px]" style={{ top: '55%' }}>SHARE</span>
          </div>
        </div>
      </div>
    </>
  );
}
