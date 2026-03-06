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

export function FloatingWidget({ className }: { className?: string }) {
  const [showModal, setShowModal] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      {showModal && <FileshareModal onClose={() => setShowModal(false)} />}
      {/* Full card widget on all screen sizes */}
      <div
        className={className ?? "fixed bottom-6 right-4 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8 z-50 cursor-pointer hover:scale-105 transition-transform flex flex-col items-center gap-0 w-[154px] min-[414px]:w-[193px] sm:w-[165px] lg:w-[198px]"}
        onClick={() => setShowModal(true)}
        data-testid="floating-widget"
      >
        <Button
          className="w-full bg-blue-600 hover:bg-blue-700 rounded-full font-semibold py-1 px-3 text-[18.4px] min-[414px]:text-[23px] sm:text-[19.8px] lg:text-[24px]"
        >
          {t('widget.cta')}
        </Button>
        <div className="relative w-full">
          <img
            src="/images/fileshare-new.jpg"
            alt="SWORD FileShare"
            className="w-full rounded-xl shadow-2xl border border-white/30"
          />
          {/* White cover fades IN over $0 + Set price in sync with Get Paid (delay 2.4s) */}
          <div
            className="absolute left-0 w-full bg-white pointer-events-none rounded-sm"
            style={{
              top: '17%',
              height: '20%',
              animation: 'cover-flash 4.5s cubic-bezier(0.4,0,0.6,1) infinite',
              animationDelay: '2.4s',
              animationFillMode: 'backwards',
            }}
          />
          {/* DEBUG: visible border to confirm cover overlay position over dollar-zero and Set price */}
          <div
            className="absolute left-0 w-full pointer-events-none"
            style={{
              top: '17%',
              height: '20%',
              border: '2px solid red',
              background: 'transparent',
            }}
          />
        </div>
      </div>
    </>
  );
}
