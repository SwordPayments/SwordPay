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
          style={{ animation: 'arrow-flash 4.5s cubic-bezier(0.4, 0, 0.6, 1) infinite', animationDelay: '3.6s' }}
        >
          {t('widget.cta')}
        </Button>
        {/* Rebuilt card as HTML so individual elements can animate */}
        <div className="relative w-full rounded-xl shadow-2xl border border-white/10 bg-white overflow-hidden">
          {/* Header */}
          <div className="pt-2 pb-1 text-center">
            <div className="font-black text-[#1e3a8a] tracking-wide leading-none" style={{fontSize:'0.75em'}}>SWORD</div>
            <div className="font-bold text-black leading-none" style={{fontSize:'0.55em'}}>FileShare</div>
          </div>
          {/* Divider */}
          <div className="mx-auto w-px bg-gray-200" style={{height:'6px'}}/>
          {/* Price */}
          <div className="text-center py-1">
            <div className="text-gray-400 font-bold leading-none" style={{fontSize:'1.1em'}}>$0</div>
            <div className="font-bold text-black leading-none" style={{fontSize:'0.45em'}}>Set price</div>
          </div>
          {/* Divider */}
          <div className="mx-auto w-px bg-gray-200" style={{height:'6px'}}/>
          {/* Views + Timer — flash in sync with "Add File" step */}
          <div className="flex justify-center gap-4 py-2"
            style={{ animation: 'arrow-flash 4.5s cubic-bezier(0.4,0,0.6,1) infinite', animationDelay: '0s' }}>
            <div className="flex flex-col items-center gap-0.5">
              <div className="bg-blue-600 rounded-full flex items-center justify-center text-white font-bold" style={{width:'2em',height:'2em',fontSize:'0.55em'}}>∞</div>
              <span className="text-black font-semibold" style={{fontSize:'0.38em'}}>Views</span>
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <div className="bg-blue-600 rounded-full flex items-center justify-center text-white" style={{width:'2em',height:'2em',fontSize:'0.55em'}}>⏱</div>
              <span className="text-black font-semibold" style={{fontSize:'0.38em'}}>Timer</span>
            </div>
          </div>
          {/* Divider */}
          <div className="mx-auto w-px bg-gray-200" style={{height:'6px'}}/>
          {/* Add File — flash in sync with "Add File" step */}
          <div className="flex flex-col items-center py-2"
            style={{ animation: 'arrow-flash 4.5s cubic-bezier(0.4,0,0.6,1) infinite', animationDelay: '0s' }}>
            <div className="bg-blue-600 rounded-full flex items-center justify-center text-white font-bold" style={{width:'2.2em',height:'2.2em',fontSize:'0.65em'}}>+</div>
            <span className="font-bold text-black" style={{fontSize:'0.42em'}}>Add File</span>
            <span className="text-gray-400 text-center leading-tight" style={{fontSize:'0.32em'}}>Images, Videos, Audio, Documents</span>
          </div>
          {/* Create link button */}
          <div className="px-2 pb-2">
            <div className="bg-[#1e3a8a] text-white text-center rounded-full font-bold py-1" style={{fontSize:'0.42em'}}>Create link</div>
          </div>
        </div>
      </div>
    </>
  );
}
