import { useSEO } from "@/hooks/use-seo";
import { Link } from "wouter";

export default function OnlyFansAlternative() {
  useSEO({
    title: "Best OnlyFans Alternative for Creators | SwordPay",
    description: "Looking for an OnlyFans alternative? SwordPay lets you sell any content — videos, photos, courses & more — with lower fees, no restrictions, and global payments. Start free today.",
  });

  return (
    <div className="min-h-screen bg-white text-[#1a2340]">

      {/* Hero */}
      <section className="bg-[#0a0f1e] text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-blue-400 font-semibold text-sm uppercase tracking-widest mb-4">OnlyFans Alternative</p>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            The Best <span className="text-blue-500">OnlyFans Alternative</span> for Creators
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Sell your content on your terms. No 20% cut. No restrictions on what you post or where you share. Post anywhere — Instagram, WhatsApp, TikTok, X — and get paid globally.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://swordpay.me" target="_blank" rel="noopener noreferrer"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-colors">
              Start Selling Free
            </a>
            <Link href="/how-it-works"
              className="border border-white/30 hover:border-white text-white font-bold py-4 px-8 rounded-full text-lg transition-colors">
              See How It Works
            </Link>
          </div>
          <p className="text-gray-500 text-sm mt-4">No subscription required. Keep 90% of every sale.</p>
        </div>
      </section>

      {/* Why creators are switching */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4">
            Why Creators Are Leaving OnlyFans
          </h2>
          <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
            OnlyFans built the creator economy. But for many creators, the restrictions, fees, and payment issues make it the wrong platform.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "💸", title: "OnlyFans takes 20%", desc: "Every sale you make, OnlyFans keeps 20 cents of every dollar. On $10,000/month that's $2,000 gone before you see a penny." },
              { icon: "🚫", title: "Content restrictions", desc: "OnlyFans has banned and re-banned content categories. Creators never know when the rules will change or their account will be flagged." },
              { icon: "🌍", title: "Limited reach", desc: "OnlyFans lives on OnlyFans.com. You can't easily share content across Instagram, WhatsApp, TikTok, or anywhere else your fans already are." },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4">
            SwordPay vs OnlyFans
          </h2>
          <p className="text-center text-gray-500 mb-12">See why creators choose SwordPay as their OnlyFans alternative</p>
          <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#0a0f1e] text-white">
                  <th className="text-left py-4 px-6 font-semibold">Feature</th>
                  <th className="text-center py-4 px-6 font-semibold text-blue-400">SwordPay</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-400">OnlyFans</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Platform fee", "10% + $0.50", "20%"],
                  ["Content types", "Any file — video, photo, PDF, audio, courses", "Limited categories"],
                  ["Share anywhere", "✅ Post to any platform", "❌ Only on OnlyFans.com"],
                  ["Global payments", "✅ 180+ countries", "⚠️ Limited regions"],
                  ["Instant payments", "✅ Yes", "⚠️ Up to 30 day delays"],
                  ["No monthly subscription needed", "✅ Free to start", "✅ Free to start"],
                  ["Sell single files", "✅ Yes", "❌ Subscription model only"],
                  ["WhatsApp / DM selling", "✅ Share link anywhere", "❌ Not supported"],
                  ["Content restrictions", "✅ Your content, your rules", "⚠️ Frequent policy changes"],
                ].map(([feature, sword, only], i) => (
                  <tr key={feature} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="py-4 px-6 font-medium text-gray-700">{feature}</td>
                    <td className="py-4 px-6 text-center text-blue-600 font-semibold">{sword}</td>
                    <td className="py-4 px-6 text-center text-gray-400">{only}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* What you can sell */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4">
            Sell Any Type of Content
          </h2>
          <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
            Unlike OnlyFans which is built around subscriptions, SwordPay lets you sell individual files — one-off or recurring, your choice.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { emoji: "🎬", label: "Videos" },
              { emoji: "📸", label: "Photo sets" },
              { emoji: "🎓", label: "Courses" },
              { emoji: "🎵", label: "Music & audio" },
              { emoji: "📄", label: "PDFs & ebooks" },
              { emoji: "🎨", label: "Digital art" },
              { emoji: "👗", label: "Fashion lookbooks" },
              { emoji: "🎙️", label: "Coaching sessions" },
            ].map((item) => (
              <div key={item.label} className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
                <div className="text-3xl mb-2">{item.emoji}</div>
                <p className="font-semibold text-sm">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12">
            Easier Than Setting Up an OnlyFans Account
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { step: "1", title: "Add your file", desc: "Upload any file — video, photo set, PDF, course. Set your price. Takes 60 seconds." },
              { step: "2", title: "Share your link", desc: "Post your SwordPay link anywhere — Instagram bio, WhatsApp, TikTok, X, or direct message." },
              { step: "3", title: "Get paid", desc: "Fans pay, you earn. 90% of every sale goes straight to you. Withdraw to your bank or card instantly." },
            ].map((item) => (
              <div key={item.step} className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-blue-500 text-white text-xl font-extrabold flex items-center justify-center mb-4">{item.step}</div>
                <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "Is SwordPay the best OnlyFans alternative?",
                a: "SwordPay is one of the top OnlyFans alternatives for creators who want to sell content directly without platform restrictions. With a 10% fee (vs OnlyFans' 20%), support for any file type, and the ability to share your link anywhere, it's built for the modern creator economy."
              },
              {
                q: "Can I use SwordPay instead of OnlyFans?",
                a: "Yes. SwordPay works as a direct alternative to OnlyFans. You can sell photos, videos, courses, audio files and more. Unlike OnlyFans, your link works on any platform — Instagram, WhatsApp, TikTok, X — so you keep selling wherever your audience is."
              },
              {
                q: "What platforms are like OnlyFans but better?",
                a: "SwordPay, Patreon, Gumroad and Fansly are popular OnlyFans alternatives. SwordPay stands out because it has the lowest fees, supports any file type, and lets you sell via a single link shared anywhere on social media."
              },
              {
                q: "How much does SwordPay take compared to OnlyFans?",
                a: "OnlyFans takes 20% of every transaction. SwordPay charges 10% + $0.50 per sale. On a $20 sale, OnlyFans takes $4.00 — SwordPay takes $2.50. Over time, that difference adds up to thousands of dollars back in your pocket."
              },
              {
                q: "Can I make money on SwordPay like OnlyFans?",
                a: "Absolutely. Creators use SwordPay to sell exclusive content, behind-the-scenes videos, photo packs, tutorials and more — just like OnlyFans, but with fewer restrictions and more ways to reach your audience."
              },
              {
                q: "Is SwordPay free to use?",
                a: "Yes. Creating a SwordPay account is free. You only pay a small fee (10% + $0.50) when you make a sale. There are no monthly subscriptions or upfront costs."
              },
            ].map((item) => (
              <div key={item.q} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-lg mb-2">{item.q}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#0a0f1e] text-white py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            Ready to Switch from OnlyFans?
          </h2>
          <p className="text-gray-300 mb-8 text-lg">
            Join thousands of creators already earning more on SwordPay. Free to start. Keep 90% of every sale.
          </p>
          <a href="https://swordpay.me" target="_blank" rel="noopener noreferrer"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-10 rounded-full text-lg transition-colors inline-block">
            Start for Free
          </a>
          <p className="text-gray-600 text-sm mt-4">No credit card required</p>
        </div>
      </section>

    </div>
  );
}
