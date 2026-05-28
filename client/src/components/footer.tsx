import { useState } from "react";
import { useTranslation } from "react-i18next";

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

export function Footer() {
  const { t } = useTranslation();
  const [showContact, setShowContact] = useState(false);
  
  return (
    <>
    {showContact && <ContactModal onClose={() => setShowContact(false)} />}
    <footer className="bg-white border-t border-gray-100 pb-24 md:pb-12" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* SWORD Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-[#1e3a8a] tracking-wide">SWORDPAY</h2>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* About & Contact */}
          <div>
            <a href="https://www.swordpay.com/how-it-works" className="font-semibold text-[#1e3a8a] text-sm mb-1 hover:underline">{t('footer.about')}</a>
            <div className="mt-4">
              <button onClick={() => setShowContact(true)} className="font-semibold text-[#1e3a8a] text-sm mb-1 hover:underline text-left">
                {t('footer.contact')}
              </button>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-[#1e3a8a] text-sm mb-1">{t('footer.company')}</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="/legal/01-Terms-of-Service.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 text-sm hover:text-[#1e3a8a] transition-colors"
                >
                  {t('footer.terms')}
                </a>
              </li>
              <li>
                <a 
                  href="/legal/02-Privacy-Policy.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 text-sm hover:text-[#1e3a8a] transition-colors"
                >
                  {t('footer.privacy')}
                </a>
              </li>
              <li>
                <a 
                  href="/legal/03-Cookie-Notice.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 text-sm hover:text-[#1e3a8a] transition-colors"
                >
                  {t('footer.cookies')}
                </a>
              </li>
              <li>
                <a 
                  href="/legal/04-Acceptable-Use-Policy.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 text-sm hover:text-[#1e3a8a] transition-colors"
                >
                  Acceptable Use & Content Policy
                </a>
              </li>
              <li>
                <a 
                  href="/legal/10-Safety-Transparency-Center.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 text-sm hover:text-[#1e3a8a] transition-colors"
                >
                  Safety & Transparency Center
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
    </>
  );
}
