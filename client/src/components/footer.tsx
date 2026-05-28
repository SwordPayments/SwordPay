import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const SUPPORTED_LOCALES = new Set(["en", "es", "fr", "de", "pt", "ja", "zh", "ar"]);

function localePath(lang: string | undefined, slug: string) {
  const base = (lang || "en").split("-")[0];
  const locale = SUPPORTED_LOCALES.has(base) ? base : "en";
  return locale === "en"
    ? `/legal/${slug}.pdf`
    : `/legal/${locale}/${slug}.pdf`;
}

function ContactModal({ onClose }: { onClose: () => void }) {
  const { t } = useTranslation();
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-sm w-full mx-4"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-xl font-black text-[#1e3a8a]">{t('contact.title')}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-2xl font-bold leading-none">&times;</button>
        </div>
        <div className="px-6 py-6 space-y-2 text-gray-700">
          <p className="font-black text-[#1e3a8a] text-lg">SWORDPAY</p>
          <p>{t('contact.address1')}</p>
          <p>{t('contact.address2')}</p>
          <p>{t('contact.phone')}</p>
          <a href="mailto:Support@swordpay.io" className="block text-blue-600 hover:underline">Support@swordpay.io</a>
        </div>
        <div className="px-6 py-4 border-t border-gray-100 text-right">
          <button onClick={onClose} className="bg-[#1e3a8a] text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-800 transition-colors">
            {t('contact.close')}
          </button>
        </div>
      </div>
    </div>
  );
}

function PdfModal({ title, src, onClose }: { title: string; src: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60" onClick={onClose}>
      <div
        className="w-[90vw] max-w-4xl h-[90vh] shadow-2xl rounded-lg overflow-hidden bg-white"
        onClick={e => e.stopPropagation()}
      >
        <iframe
          src={`${src}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
          title={title}
          className="block border-0"
          style={{
            width: 'calc(100% + 36px)',
            height: 'calc(100% + 18px)',
            marginLeft: '-18px',
            marginTop: '-9px',
          }}
        />
      </div>
    </div>
  );
}

const POLICIES = [
  { titleKey: 'footer.terms',   slug: '01-Terms-of-Service' },
  { titleKey: 'footer.privacy', slug: '02-Privacy-Policy' },
  { titleKey: 'footer.cookies', slug: '03-Cookie-Notice' },
  { titleKey: 'footer.aup',     slug: '04-Acceptable-Use-Policy' },
  { titleKey: 'footer.safety',  slug: '10-Safety-Transparency-Center' },
] as const;

export function Footer() {
  const { t, i18n } = useTranslation();
  const [showContact, setShowContact] = useState(false);
  const [pdf, setPdf] = useState<{ title: string; src: string } | null>(null);

  const openPolicy = (titleKey: string, slug: string) => {
    setPdf({ title: t(titleKey), src: localePath(i18n.language, slug) });
  };

  return (
    <>
    {showContact && <ContactModal onClose={() => setShowContact(false)} />}
    {pdf && <PdfModal title={pdf.title} src={pdf.src} onClose={() => setPdf(null)} />}
    <footer className="bg-white border-t border-gray-100 pb-24 md:pb-12" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-[#1e3a8a] tracking-wide">SWORDPAY</h2>
        </div>

        <div className="grid grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div>
            <a href="https://www.swordpay.com/how-it-works" className="font-semibold text-[#1e3a8a] text-sm mb-1 hover:underline">{t('footer.about')}</a>
            <div className="mt-4">
              <button onClick={() => setShowContact(true)} className="font-semibold text-[#1e3a8a] text-sm mb-1 hover:underline text-left">
                {t('footer.contact')}
              </button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-[#1e3a8a] text-sm mb-1">{t('footer.company')}</h3>
            <ul className="space-y-2">
              {POLICIES.map(({ titleKey, slug }) => (
                <li key={slug}>
                  <button
                    onClick={() => openPolicy(titleKey, slug)}
                    className="text-gray-600 text-sm hover:text-[#1e3a8a] transition-colors text-left"
                  >
                    {t(titleKey)}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
    </>
  );
}
