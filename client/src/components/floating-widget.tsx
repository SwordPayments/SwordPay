import { useState } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

function FileshareModal({ onClose, show }: { onClose: () => void; show: boolean }) {
  return (
    <div
      className="fixed z-[100]"
      style={{ display: show ? 'block' : 'none', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' }}
      onClick={onClose}
    >
      <div
        className="relative bg-white flex flex-col overflow-hidden"
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 bg-white/80 hover:bg-white rounded-full p-1.5 shadow text-gray-500 hover:text-gray-800 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        <iframe
          src="https://www.swordpay.me/upload-file"
          className="w-full border-0 flex-1"
          scrolling="no"
          style={{ height: '100%' } as React.CSSProperties}
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
  const [hasOpened, setHasOpened] = useState(false);
  const { t } = useTranslation();

  const handleOpen = () => { setHasOpened(true); setShowModal(true); };

  return (
    <>
      {/* Portal renders modal at document.body — escapes any CSS transform parents */}
      {hasOpened && createPortal(
        <FileshareModal show={showModal} onClose={() => setShowModal(false)} />,
        document.body
      )}
      {/* Full card widget on all screen sizes */}
      <div
        className={className ?? "fixed bottom-6 right-4 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8 z-50 cursor-pointer hover:scale-105 transition-transform flex flex-col items-center gap-0 w-[154px] min-[414px]:w-[193px] sm:w-[165px] lg:w-[198px]"}
        onClick={handleOpen}
        data-testid="floating-widget"
      >
        <Button
          className="w-full bg-blue-600 hover:bg-blue-700 rounded-full font-semibold py-1 px-3 text-[18.4px] min-[414px]:text-[23px] sm:text-[19.8px] lg:text-[24px]"
          style={{ animation: 'button-flash 6s linear infinite', animationDelay: '3.0s' }}
        >
          <span style={{ animation: 'button-text-flash 6s linear infinite', animationDelay: '3.0s', display: 'inline-block' }}>
            {t('widget.cta')}
          </span>
        </Button>

      </div>
    </>
  );
}
