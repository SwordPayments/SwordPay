import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

export function FloatingWidget({ className }: { className?: string }) {
  const { t } = useTranslation();

  const handleOpen = () => {
    window.open("https://www.swordpay.me", "_blank");
  };

  return (
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
  );
}
