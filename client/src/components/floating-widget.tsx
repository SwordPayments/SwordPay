import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

const isIOS =
  typeof navigator !== "undefined" &&
  /iphone|ipad|ipod/i.test(navigator.userAgent);

export function FloatingWidget({ className }: { className?: string }) {
  const { t } = useTranslation();

  const handleOpen = () => {
    window.open("https://www.swordpay.me", "_blank");
  };

  // baseClass always used on iOS — stable bottom-docked, never overridden by glide logic
  const baseClass =
    "fixed bottom-6 right-4 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8 z-50 cursor-pointer hover:scale-105 transition-transform flex flex-col items-center gap-0 w-[169px] min-[414px]:w-[212px] sm:w-[182px] lg:w-[218px]";

  return (
    <div
      className={isIOS ? baseClass : className ?? baseClass}
      onClick={handleOpen}
      data-testid="floating-widget"
    >
      <Button
        className="w-full bg-blue-600 hover:bg-blue-700 rounded-full font-semibold py-1 px-3 text-[20px] min-[414px]:text-[25px] sm:text-[22px] lg:text-[26px]"
        style={{ animation: 'button-flash 3s linear infinite', animationDelay: '1.0s' }}
      >
        <span style={{ animation: 'button-text-flash 3s linear infinite', animationDelay: '1.0s', display: 'inline-block' }}>
          {t('widget.cta')}
        </span>
      </Button>
    </div>
  );
}
