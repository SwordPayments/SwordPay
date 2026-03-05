import { useState } from "react";
import { useTranslation } from "react-i18next";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

function FileshareModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        style={{ width: '420px', height: '85vh', maxHeight: '750px' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="bg-blue-600 px-5 py-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <img src="/images/sword-logo.png" alt="SWORD" className="h-7 w-7 object-contain" />
            <h2 className="text-white font-black text-lg tracking-wide">SWORD FileShare</h2>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>
        <iframe
          src="https://www.swordpay.me"
          className="flex-1 w-full border-0"
          title="SWORD FileShare"
          allow="camera; microphone; payment"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation"
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
      <div
        className="fixed bottom-6 right-6 z-50 cursor-pointer hover:scale-105 transition-transform flex flex-col items-center gap-0"
        style={{ width: '120px' }}
        onClick={() => setShowModal(true)}
        data-testid="floating-widget"
      >
        <Button className="w-full bg-blue-600 hover:bg-blue-700 rounded-full font-semibold animate-pulse py-1 px-3" style={{fontSize:'13.2px'}}>
          {t('widget.cta')}
        </Button>
        <div className="relative w-full">
          <img
            src="/images/fileshare-new.jpg"
            alt="SWORD FileShare"
            className="w-full rounded-xl shadow-2xl border border-white/30"
          />
          <div className="absolute inset-0 rounded-xl pointer-events-none">
            <span className="absolute font-black text-black tracking-wider text-center bg-white rounded px-2 py-1 w-full block animate-pulse" style={{top:'15%', fontSize:'15.4px'}}>SET PRICE</span>
            <span className="absolute font-black text-black tracking-wider text-center bg-white rounded px-2 py-1 w-full block animate-pulse" style={{top:'35%', fontSize:'15.4px'}}>ADD FILE</span>
            <span className="absolute font-black text-black tracking-wider text-center bg-white rounded px-2 py-1 w-full block animate-pulse" style={{top:'55%', fontSize:'15.4px'}}>SHARE</span>
          </div>
        </div>
      </div>
    </>
  );
}
