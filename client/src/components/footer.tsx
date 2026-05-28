import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { localePath, resolveLocale } from "../lib/localePath";

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

function PdfModal({ title, src, slug, locale, onClose }:
    { title: string; src: string; slug: string; locale: string; onClose: () => void }) {
  const { t } = useTranslation();
  const modalRef = useRef<HTMLDivElement>(null);
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const prevFocused = document.activeElement as HTMLElement | null;
    modalRef.current?.focus();

    const ctrl = new AbortController();
    fetch(src, { method: 'HEAD', signal: ctrl.signal })
      .then(r => { if (!r.ok) setLoadFailed(true); })
      .catch((e: unknown) => { if ((e as { name?: string })?.name !== 'AbortError') setLoadFailed(true); });

    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      ctrl.abort();
      prevFocused?.focus?.();
    };
  }, [onClose, src]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== 'Tab') return;
    const focusable = modalRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (!focusable || focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault(); }
    else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); }
  };

  const showDisclaimer = locale !== 'en';
  const englishHref = `/legal/${slug}.pdf`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onKeyDown={onKeyDown}
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className="w-[90vw] max-w-4xl h-[90vh] shadow-2xl rounded-lg overflow-hidden bg-white flex flex-col outline-none"
        onClick={e => e.stopPropagation()}
      >
        {showDisclaimer && (
          <div
            className="px-4 py-2 bg-gray-50 border-b border-gray-200 text-xs text-gray-600 flex items-center justify-between gap-3"
            role="note"
          >
            <span className="leading-snug">{t('footer.translationNotice')}</span>
            <a
              href={englishHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1e3a8a] hover:underline whitespace-nowrap font-medium"
            >
              {t('footer.viewEnglish')} →
            </a>
          </div>
        )}
        <div className="flex-1 overflow-hidden relative">
          {loadFailed ? (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <p className="text-gray-700 mb-4">{t('footer.loadError')}</p>
              <a
                href={src}
                download
                className="bg-[#1e3a8a] text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
              >
                {t('footer.download')} — {title}
              </a>
            </div>
          ) : (
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
          )}
        </div>
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
  const [pdf, setPdf] = useState<{ title: string; src: string; slug: string; locale: string } | null>(null);

  const openPolicy = (titleKey: string, slug: string) => {
    const locale = resolveLocale(i18n.language);
    setPdf({ title: t(titleKey), src: localePath(locale, slug), slug, locale });
  };

  return (
    <>
    {showContact && <ContactModal onClose={() => setShowContact(false)} />}
    {pdf && <PdfModal title={pdf.title} src={pdf.src} slug={pdf.slug} locale={pdf.locale} onClose={() => setPdf(null)} />}
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
