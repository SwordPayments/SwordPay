import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

const isIOS =
  typeof navigator !== "undefined" &&
  /iP(hone|od|ad)/.test(navigator.userAgent);

export function FloatingWidget({ className, y = 0 }: { className?: string; y?: number }) {
  const { t } = useTranslation();

  const handleOpen = () => {
    window.open("https://www.swordpay.me", "_blank");
  };

  const baseClass =
    "fixed bottom-6 right-4 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8 z-50 cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out flex flex-col items-center gap-0 w-[154px] min-[414px]:w-[193px] sm:w-[165px] lg:w-[198px]";

  return (
    <div
      className={isIOS ? baseClass : className ?? baseClass}
      onClick={handleOpen}
      data-testid="floating-widget"
      style={{ transform: `translateY(${y}px)` }}
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
  );
}
