import { useState } from "react";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";

const TERMS_CONTENT = `Terms of Service
SwordPay | swordpay.com | Effective: 28 May 2026

BY USING SWORDPAY YOU AGREE TO THESE TERMS – PLEASE READ THEM CAREFULLY

1. Introduction

These Terms form your binding agreement with SwordPay. The Terms govern:
• Your access to and use of swordpay.com and all related features
• Each Creator Interaction you participate in
• Your dealings with us about your account, content, payments, and disputes

We may change these Terms at any time. Where the change is material we will give Notice. Continued use after the change becomes effective is acceptance.

Your rights may vary depending on where you live. Nothing in these Terms removes any mandatory consumer right that applies to you under local law.

2. Definitions

• "SwordPay" — the platform operated at swordpay.com
• "We", "Us", "Our" — SwordPay, operator of swordpay.com
• "Creator" — a User whose account is set up to upload and monetise Content
• "Fan" — a User whose account is set up to purchase access to Creator Content
• "User" — any person with a SwordPay account, whether Creator, Fan, or both
• "Content" — any image, video, audio, text, metadata, message, livestream material, or other material uploaded to SwordPay by any User
• "Creator Interaction" — any transaction granting a Fan access to a Creator's Content
• "Fan Payment" — any payment made by a Fan in connection with a Creator Interaction
• "Platform Fee" — 10% of the Fan Payment plus US$0.50 per transaction, plus any currency-conversion and bank-transfer fees we incur on your behalf
• "Creator Earnings" — the Fan Payment minus the Platform Fee and any applicable taxes
• "Consumer" — a User acting outside the course of a trade, business, craft, or profession
• "Business User" — a User who uses SwordPay for commercial reasons
• "Co-Authored Content" — Content that features a person other than the uploading Creator

3. Who We Are

General enquiries: support@swordpay.io

4. Eligibility

To use SwordPay you must:
• Be at least 18 years old
• Be legally able to enter a binding contract with us
• Not have been convicted of a serious crime
• Provide accurate, current registration information
• Be lawfully permitted to view and post the Content you intend to view or post

We may reject any account application at our discretion.

5. Account Setup

Fan accounts: A Fan must provide a valid email address, a username, a password, and a valid payment method.

Creator accounts must additionally:
• Upload a valid government-issued photo ID
• Provide a biometric selfie matched to that ID
• Complete identity verification via our verification provider (currently Didit)
• Add a bank account or other approved payout method
• Provide tax identification information where required by law
• Set the price(s) at which their Content will be sold

We may re-verify identity at any time. Failure to complete re-verification may result in suspension of payouts or the account.

6. Content

Ownership: You retain ownership of Content you upload. By uploading, you grant SwordPay a perpetual, worldwide, royalty-free, non-exclusive, sublicensable, transferable licence to host, display, distribute, reproduce, create derivative works of, and otherwise use your Content as necessary to operate and improve SwordPay.

Responsibility: You are solely responsible for Content uploaded under your account. You warrant for each item of Content that:
• You own it, or have all rights needed to upload and monetise it
• It does not infringe any third-party right
• It complies with our Acceptable Use Policy and all applicable laws
• For Co-Authored Content, you have obtained written consent from every person featured and confirmed they are at least 18

Moderation: We may pre-screen, monitor, scan, or reuse Content to enforce our Terms. We may remove Content that breaches our Terms without notice.

7. Fan Payments and Purchases

• Creator Interactions are governed by the Contract between Fan and Creator
• Creators set their own prices. All prices are charged in US dollars
• Fan Payments exclude indirect sales taxes, which are added at checkout
• You agree not to request a refund or initiate a chargeback unless in good faith

8. Creator Payouts

• The Platform Fee (10% plus US$0.50 per transaction, plus currency-conversion and transfer fees) is deducted from each Fan Payment
• Creator Earnings appear in your SwordPay balance once cleared
• If a Fan succeeds in obtaining a refund or chargeback, we may deduct the corresponding Creator Earnings from your balance

9. Tax Compliance

You are solely responsible for your tax affairs. SwordPay does not provide tax advice. You warrant that you report all SwordPay-derived earnings to the relevant tax authorities.

10. Our Rights

• We may suspend, remove, or restrict Content that may breach our Terms
• We use automated tools, AI classifiers, and hash-matching technology to identify violations
• We may disclose information about your use of SwordPay to third parties in line with our Privacy Policy
• We own all rights in SwordPay and its features, except Content owned by Creators

11. What We Are Not Responsible For

• Content posted by Users
• Whether a Creator will generate earnings
• Bank, e-wallet, currency, or payment-provider charges
• Lost, stolen, or compromised accounts
• Technical problems with your device, network, or software

12. Account Suspension, Closure, and Earnings Forfeiture

We may suspend or close your account:
• With 30 days' Notice, at any time, for any reason
• At any time without Notice where we reasonably believe you have breached the Terms

If you do not dispute a forfeiture or closure decision within six months of Notification, you waive the right to dispute it.

13. Account Deletion by the User

You may delete your account from the account-settings area of SwordPay. Fan accounts are deleted within a reasonable time. Creator accounts remain open until all active Fan access expires, then we pay outstanding Creator Earnings and delete the account.

14. Intellectual Property

• You confirm that your Content does not infringe any third-party intellectual property right
• The licence you grant us is perpetual, worldwide, non-exclusive, royalty-free, sublicensable, and transferable
• We will never sell your Content to another platform

15. Co-Authored Content

For Content featuring anyone other than the uploading Creator, the additional person must either be a tagged verified Creator on SwordPay or have provided a signed release form confirming they are at least 18 and consent to appear.

16. AI-Generated Content and Sponsored Content

AI-Generated Content must not depict any real person without consent and must be labelled with #AI or #AIGenerated.

Sponsored Content must be labelled with #ad, #sponsored, or #paidpromotion and identify the brand paying for it.

17. Sharing and Linking

Do not link to SwordPay in a way that implies endorsement where none exists. Do not promote a SwordPay account through Google Ads, Bing Ads, or any paid search advertising platform.

18. Domain Names

You may only register a domain containing the SwordPay trademark if you are a verified Creator, the domain redirects to your SwordPay account, and we have given written permission.

19. Indemnification

You will indemnify and hold harmless SwordPay from any loss arising from your Content, your breach of these Terms, or your tax obligations.

20. Limitation of Liability

Consumers (US): our total liability for any claim is limited to US$250 per claim.
Business Users: our total liability is limited to the greater of 100% of Platform Fees paid in the 12 months before the claim, or US$5,000.

21. Limitation Period

Any claim must be commenced within one year after the cause of action arose.

22. Disputes and Mediation

Before commencing any legal proceeding you must contact support@swordpay.io and attempt good-faith resolution.

Choice of law: These Terms are governed by the laws of England and Wales.

23. General

If any provision is unenforceable, the remainder continues in effect. These Terms are the entire agreement between you and us regarding SwordPay.

24. Changes

We may update these Terms at any time. Material changes will be notified by email or in-platform Notice.

Last updated: 28 May 2026`;

const PRIVACY_CONTENT = `Privacy Policy
SwordPay | swordpay.com | Effective: 28 May 2026

By using SwordPay you confirm that you have read this Policy.

1. Introduction

SwordPay ("we", "us", "our") respects your privacy and is committed to protecting the personal data we process about you. We are the data controller for the personal data we process in connection with SwordPay.

2. What Counts as Personal Data

"Personal data" means information that identifies you, or that can reasonably be linked to you. It does not include deidentified, aggregated, or anonymised data.

3. Age Restriction (18+)

SwordPay is intended only for individuals aged 18 or older. We do not knowingly collect data from anyone younger.

4. Applicability and Updates

This Policy supplements but does not form part of our Terms of Service. We may update this Policy at any time. Material changes will be communicated by notification or email.

5. Third-Party Links

SwordPay may contain links to third-party sites. We are not responsible for the privacy practices of those third parties.

6. Categories of Personal Data

Fans: Email address, phone number, username and password, avatar, subscriptions, direct messages, comments, support enquiries.

Creators (all of the above, plus): Full legal name, residential address, date of birth, country of residence, government-issued photo ID, selfie image, bank account and payout details, tax identification number.

Financial data: Tokenised payment-card details (we do not receive the full card number), billing address, wallet funds, transaction history.

Technical data: IP address, user agent, log data.

Face Recognition Data: Used only by our third-party verification provider. We do not collect, receive, possess, or have access to Face Recognition Data.

7. Onboarding Process

Creators: We collect User Data and Financial Data, confirm country of residence, conduct third-party age and identity verification (currently Didit), and confirm you have not been banned.

Fans: We collect User Data and Financial Data, confirm country of residence, and where required by law, require additional age assurance.

8. How We Use Personal Data

• Creating and operating your account (Contract performance)
• Identity and age verification (Consent)
• Processing payments and payouts (Contract performance)
• Moderating Content (Contract performance)
• Reporting illegal activity to law enforcement (Legal obligation)
• Detecting fraud and money laundering (Legal obligation / Legitimate interests)

We do not make solely automated decisions with legal or significant effects on you.

9. Who We Share Data With

• Payment processors
• Identity-verification provider (Didit)
• Content-moderation providers
• Law enforcement and regulators
• Tax authorities
• Professional advisers

We do not sell personal data. We do not share personal data for cross-context behavioural advertising.

10. International Data Transfers

Some recipients are outside the UK, EEA, and Switzerland. We transfer data to countries with adequate protection or under appropriate safeguards.

11. Data Retention

• Active-account data: Lifetime of account
• Closed-account data: 1 year after closure
• Identity-verification records: 5 years after closure
• Transaction records: 7 years
• Banned-user records: Retained indefinitely

12. Your Rights

You have the right to: withdraw consent, access your data, correct inaccurate data, delete your data, restrict processing, port your data, and object to processing.

Contact: compliance@swordpay.io

13. Lodging a Complaint

UK: Information Commissioner's Office (ICO) — ico.org.uk — 0303 123 1113
EEA: Your country's data-protection regulator

14. United States Disclosures

We do not sell personal data. California residents have rights under CCPA. Nevada residents may submit opt-out requests via compliance@swordpay.io.

15. Contact

General privacy enquiries: compliance@swordpay.io

Last updated: 28 May 2026`;

const COOKIE_CONTENT = `Cookie Notice
SwordPay | swordpay.com | Effective: 28 May 2026

1. What Cookies Are

Cookies are small pieces of data stored on your device that allow us to remember information about your browser or device.

Session cookies are removed when you close the browser. Persistent cookies stay for a set period (typically 30 days to 2 years).

2. The Cookies We Use

Essential cookies (you cannot disable these without breaking core functionality):
• sp_sess — Maintains your logged-in session
• sp_auth — Authenticates your user ID per request
• sp_auth_2fa_{userid} — Remembers trusted device for 2FA (30 days)
• sp_csrf — Prevents cross-site request forgery
• sp_fp — Browser fingerprint for fraud prevention (90 days)
• sp_lang — Stores language preference (1 year)
• sp_cookie_choice — Records your cookie-banner choice (1 year)
• cf_* — Cloudflare bot-protection cookies
• cdn_policy, cdn_sig, cdn_kpid — CDN signed-URL access
• sp_stream — Enables livestream playback
• sp_profile_promo — Enables promotions

Analytics cookies (consent-based): Set only after you choose "Accept all". They tell us which pages are visited in aggregate.

Third-party cookies: Set by our payment processor, identity-verification provider, and fraud-prevention provider.

3. The Cookie Banner

On your first visit you will see a banner asking whether to accept all cookies or only essential cookies. You can change your choice in account settings.

4. Managing Cookies in Your Browser

You can block or delete cookies through browser settings:
• Chrome: Settings → Privacy and security → Cookies
• Safari: Preferences → Privacy
• Firefox: Settings → Privacy & Security
• Edge: Settings → Cookies and site permissions

Blocking essential cookies will prevent SwordPay from working correctly.

5. Do Not Track

We do not respond to "Do Not Track" browser signals. We do not use cross-site tracking and we do not sell personal data for targeted advertising.

6. Contact

Questions: compliance@swordpay.io

Last updated: 28 May 2026`;

const ACCEPTABLE_USE_CONTENT = `Acceptable Use Policy
SwordPay | swordpay.com | Effective: 28 May 2026

BY USING SWORDPAY YOU AGREE TO THIS POLICY – PLEASE READ IT CAREFULLY

This Policy forms part of your agreement with us. Breaching it may result in removal of Content, suspension, or termination of your account.

Do not use SwordPay for, or to facilitate, any of the following:

MINORS
• Anyone under 18
• Any explicit Content featuring a person 18+ who has not completed Creator onboarding or supplied a release form

ILLEGAL ACTIVITY
• Exploitation, abuse, or harm of minors
• Incest, bestiality, necrophilia
• Rape or sexual assault — whether actual, claimed, or role-played
• Content promoting terrorism or violent extremism
• Human trafficking, forced labour, or modern slavery
• Escort services, sex trafficking, or prostitution

PROHIBITED ITEMS
• Weapons or controlled substances depicted in a way that threatens or causes harm

HATEFUL CONDUCT
Content attacking any individual or group based on: race, ethnicity, national origin, caste, sexual orientation, gender identity, religious affiliation, age, disability, serious disease, immigration status, veteran status, or any other protected characteristic.

ABUSE AND HARASSMENT
• Stalking
• Doxxing (publishing private information without consent)
• Defamation
• Sharing non-consensual, fake, or manipulated intimate images, including AI-generated images
• Any explicit image of another person without consent

VIOLENCE AND HARM
• Prohibited role-play, extreme impact, extreme bondage
• Use of objects likely to cause physical or mental harm
• Lack of express consent
• Content promoting or glorifying suicide or self-harm

PROHIBITED BODILY FLUIDS
• Urine, excrement, or other bodily-fluid content prohibited by major payment networks (Mastercard/Visa requirement)

INACCURATE INFORMATION
• Misleading descriptions of Content
• Misleading account information

PUBLIC NUDITY
• Explicit conduct where the general public is present or reasonably likely to see, including in avatars or headers

PROHIBITED CYBER ACTIVITY
• Spamming
• Sharing personal data of another person without consent
• Linking to external media-storage sites
• Interfering with SwordPay's software, hardware, or network

COPYING OR SCRAPING
• Scraping, downloading, sharing, or gathering data from SwordPay or any Creator

OFF-PLATFORM TRANSACTIONS
• Arranging transactions other than Creator Interactions through SwordPay
• Facilitating in-person meetings

PROHIBITED COMMERCIAL ACTIVITY
• Selling controlled or regulated items
• Claiming SwordPay endorsement when none given
• Infringing third-party intellectual property
• Promoting illegal gambling

AI-GENERATED CONTENT
• Must not depict any real person without consent
• Must be labelled with #AI or #AIGenerated
• Fully AI-generated Creator accounts require the operator to complete onboarding

SPONSORED CONTENT
• Must be labelled with #ad, #sponsored, or #paidpromotion
• Must not advertise tobacco, e-cigarettes, illegal drugs, prescription medicines, or weapons
• Must not promote illegal gambling
• Must not target alcohol advertising at minors

ENFORCEMENT
We may: remove Content, issue warnings, suspend the account, terminate and forfeit Creator Earnings, or report to law enforcement.

Last updated: 28 May 2026`;

const SAFETY_CONTENT = `Safety and Transparency Center
SwordPay | swordpay.com | Effective: 28 May 2026

SwordPay exists to give Creators control of their work and Fans confidence in what they pay for. We are committed to a safe platform that goes beyond the legal minimum.

AGE AND IDENTITY VERIFICATION

We require every Creator to verify identity before earning, through automated checks and human review with our verification partner (Didit). We collect: full legal name, verified email and phone, postal address, date of birth, government-issued photo ID, standalone selfie and selfie holding ID, bank account and payout details, and tax identification where required.

We re-check identity on a rolling 30-day selfie cycle with additional checks for high-risk jurisdictions. Fans must be at least 18; where required by law we apply email-address and/or facial age estimation.

CONTENT MODERATION

We moderate Content using: hash-list scanning against NCMEC, IWF, CyberTip Canada, PhotoDNA, Thorn, StopNCII.org; automated classifiers; stop-word filters; and human review within 24 hours.

We do not use end-to-end encryption. Every piece of Content — including direct messages — is visible to trained moderators. No hidden posts, secret areas, or disappearing messages.

COMBATTING CSAM

Zero tolerance for CSAM. All Content is scanned against known CSAM hash databases before appearing on feeds. When we identify suspected CSAM we: remove it, place the account in 90-day secure-hold, file a CyberTipline report with NCMEC, contribute new hashes, and cooperate with law enforcement. We participate in NCMEC's TakeItDown programme.

ENSURING CONSENT FOR INTIMATE IMAGES

Sharing non-consensual intimate images (NCII) is prohibited. Creators must obtain informed consent from everyone in explicit Content. We participate in StopNCII.org. To withdraw consent: support@swordpay.io

TACKLING HATE SPEECH AND HARASSMENT

Hate speech, discrimination, and targeted harassment are prohibited. Because no user is anonymous and we don't use E2EE, we can identify, remove, and report offenders.

SAFEGUARDING AGAINST MONEY LAUNDERING AND FRAUD

What is money laundering? Taking money from criminal activity and passing it through legitimate transactions to appear lawful.

What is fraud? Obtaining money by deceiving or tricking someone.

Our zero-tolerance approach: We monitor for red flags including multiple card attempts with different names, rapid purchase bursts, flagged IP addresses, matching IPs for Fan and Creator, suspicious email domains, and off-platform settlement suggestions.

We comply with OFAC, OFSI, EU, and UN sanctions lists, screening at onboarding and on a recurring basis. Suspicious activity results in account suspension, transaction freeze, and law enforcement reporting.

Training: Our compliance team is trained continually on industry best practices.

ASSISTING LAW ENFORCEMENT

We respond to lawful requests within 24-48 hours (14 days maximum). We may disclose: legal name, username, profile URL, email, IP address, phone number, billing address, transaction information, tokenised card data, and content/message logs.

HELPING CREATORS PROTECT COPYRIGHT

Creators own their Content. We provide: free watermarking, outbound DMCA takedowns, and counter-notification handling.

PRIVACY

See our Privacy Policy. Users may exercise rights of access, correction, deletion, restriction, portability, objection, and consent withdrawal.

APPEALS AND COMPLAINTS

Appeal moderation decisions under our Appeals Policy within six months. File complaints under our Complaints Policy — handled within 24-48 hours.

MODERN SLAVERY

Not permitted. See our Anti-Slavery and Anti-Trafficking Statement.

TAX COMPLIANCE

See our Tax Policy.

OUR PARTNERS IN SAFETY
• Didit — identity verification
• Sightengine — content classification
• Internet Watch Foundation — CSAM hash lists
• NCMEC — CyberTipline reporting
• StopNCII.org — NCII hash-and-block
• NCMEC TakeItDown — self-generated CSAM hash-and-block

TRANSPARENCY REPORTS

We will publish quarterly Transparency Reports covering: account applications, user reports, Content moderation, CSAM detections, law-enforcement requests, and DMCA notices.

Contact: compliance@swordpay.io | support@swordpay.io

Last updated: 28 May 2026`;

function TermsModal({ onClose }: { onClose: () => void }) {
  const { t } = useTranslation();
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full mx-4 max-h-[85vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-xl font-black text-[#1e3a8a]">{t('footer.terms')}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-2xl font-bold leading-none">&times;</button>
        </div>
        <div className="overflow-y-auto px-6 py-4 text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
          {TERMS_CONTENT}
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

function PrivacyModal({ onClose }: { onClose: () => void }) {
  const { t } = useTranslation();
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full mx-4 max-h-[85vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-xl font-black text-[#1e3a8a]">{t('footer.privacy')}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-2xl font-bold leading-none">&times;</button>
        </div>
        <div className="overflow-y-auto px-6 py-4 text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
          {PRIVACY_CONTENT}
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

function CookieModal({ onClose }: { onClose: () => void }) {
  const { t } = useTranslation();
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full mx-4 max-h-[85vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-xl font-black text-[#1e3a8a]">{t('footer.cookies')}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-2xl font-bold leading-none">&times;</button>
        </div>
        <div className="overflow-y-auto px-6 py-4 text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
          {COOKIE_CONTENT}
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

function AcceptableUseModal({ onClose }: { onClose: () => void }) {
  const { t } = useTranslation();
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full mx-4 max-h-[85vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-xl font-black text-[#1e3a8a]">Acceptable Use & Content Policy</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-2xl font-bold leading-none">&times;</button>
        </div>
        <div className="overflow-y-auto px-6 py-4 text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
          {ACCEPTABLE_USE_CONTENT}
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

function SafetyModal({ onClose }: { onClose: () => void }) {
  const { t } = useTranslation();
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full mx-4 max-h-[85vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-xl font-black text-[#1e3a8a]">Safety & Transparency Center</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-2xl font-bold leading-none">&times;</button>
        </div>
        <div className="overflow-y-auto px-6 py-4 text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
          {SAFETY_CONTENT}
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
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showCookie, setShowCookie] = useState(false);
  const [showAcceptableUse, setShowAcceptableUse] = useState(false);
  const [showSafety, setShowSafety] = useState(false);
  const [showContact, setShowContact] = useState(false);
  return (
    <>
    {showTerms && <TermsModal onClose={() => setShowTerms(false)} />}
    {showPrivacy && <PrivacyModal onClose={() => setShowPrivacy(false)} />}
    {showCookie && <CookieModal onClose={() => setShowCookie(false)} />}
    {showAcceptableUse && <AcceptableUseModal onClose={() => setShowAcceptableUse(false)} />}
    {showSafety && <SafetyModal onClose={() => setShowSafety(false)} />}
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
                <button onClick={() => setShowTerms(true)} className="text-gray-600 text-sm hover:text-[#1e3a8a] transition-colors text-left">
                  {t('footer.terms')}
                </button>
              </li>
              <li>
                <button onClick={() => setShowPrivacy(true)} className="text-gray-600 text-sm hover:text-[#1e3a8a] transition-colors text-left">
                  {t('footer.privacy')}
                </button>
              </li>
              <li>
                <button onClick={() => setShowCookie(true)} className="text-gray-600 text-sm hover:text-[#1e3a8a] transition-colors text-left">
                  {t('footer.cookies')}
                </button>
              </li>
              <li>
                <button onClick={() => setShowAcceptableUse(true)} className="text-gray-600 text-sm hover:text-[#1e3a8a] transition-colors text-left">
                  Acceptable Use & Content Policy
                </button>
              </li>
              <li>
                <button onClick={() => setShowSafety(true)} className="text-gray-600 text-sm hover:text-[#1e3a8a] transition-colors text-left">
                  Safety & Transparency Center
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
    </>
  );
}
