import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

function openSwordPayPopup() {
  const width = 480;
  const height = 720;
  const left = window.screenX + (window.outerWidth - width) / 2;
  const top = window.screenY + (window.outerHeight - height) / 2;
  window.open(
    'https://www.swordpay.me',
    'SWORDFileShare',
    `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes,status=no,toolbar=no,menubar=no,location=no`
  );
}

export function FloatingWidget() {
  const { t } = useTranslation();

  return (
    <div
      className="fixed bottom-6 right-6 z-50 cursor-pointer hover:scale-105 transition-transform flex flex-col items-center gap-0"
      style={{ width: '120px' }}
      onClick={openSwordPayPopup}
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
  );
}
