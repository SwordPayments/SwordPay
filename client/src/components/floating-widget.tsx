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
        className="relative bg-white rounded-2xl shadow-2xl flex flex-col w-[90%] sm:w-[420px] overflow-hidden"
        style={{ height: '490px', maxHeight: '90dvh' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 bg-white/80 hover:bg-white rounded-full p-1.5 shadow text-gray-500 hover:text-gray-800 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Clipping wrapper — hides iframe header at top and trust badges at bottom */}
        <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
          <iframe
            src="https://www.swordpay.me/upload-file"
            className="w-full border-0"
            scrolling="no"
            style={{ position: 'absolute', top: '-115px', left: 0, width: '100%', height: 'calc(100% + 115px)' } as React.CSSProperties}
            title="SWORD FileShare"
            allow="camera; microphone; payment; clipboard-write"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
          />
        </div>
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
            className="w-full rounded-xl shadow-2xl border-2 border-blue-500"
          />
        </div>
      </div>
    </>
  );
}
