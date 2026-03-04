import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown, Upload, DollarSign, Share2, Copy, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

type Step = "price" | "file" | "share";

function FileshareModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<Step>("price");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [shareLink] = useState("https://swordpay.com/s/abc123xyz");
  const [copied, setCopied] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const steps: Step[] = ["price", "file", "share"];
  const stepIndex = steps.indexOf(step);

  const handleCopy = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-blue-600 px-5 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-white font-black text-lg">SWORD FileShare</h2>
            <p className="text-blue-100 text-xs">{t('widget.sell')}</p>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Step indicators */}
        <div className="flex items-center px-5 py-3 bg-gray-50 border-b">
          {[
            { key: "price", label: "Set Price", icon: DollarSign },
            { key: "file", label: "Add File", icon: Upload },
            { key: "share", label: "Share", icon: Share2 },
          ].map((s, i) => (
            <div key={s.key} className="flex items-center flex-1">
              <div className={`flex items-center gap-1.5 ${stepIndex >= i ? "text-blue-600" : "text-gray-300"}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black border-2 ${stepIndex >= i ? "bg-blue-600 border-blue-600 text-white" : "border-gray-300 text-gray-300"}`}>
                  {i + 1}
                </div>
                <span className={`text-xs font-bold hidden sm:block ${stepIndex >= i ? "text-blue-600" : "text-gray-400"}`}>{s.label}</span>
              </div>
              {i < 2 && <div className={`flex-1 h-0.5 mx-2 ${stepIndex > i ? "bg-blue-600" : "bg-gray-200"}`} />}
            </div>
          ))}
        </div>

        {/* Step content */}
        <div className="px-5 py-6">

          {/* Step 1: Set Price */}
          {step === "price" && (
            <div className="space-y-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-3">
                  <DollarSign className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-black text-xl text-gray-900">Set Your Price</h3>
                <p className="text-gray-500 text-sm mt-1">How much do you want to charge?</p>
              </div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-lg">$</span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                  className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl text-xl font-black text-gray-900 focus:outline-none focus:border-blue-500 text-center"
                />
              </div>
              <p className="text-xs text-gray-400 text-center">10% + $0.50 platform fee applies. Set to $0 for free.</p>
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl font-black text-base py-3"
                onClick={() => setStep("file")}
              >
                Continue →
              </Button>
            </div>
          )}

          {/* Step 2: Add File */}
          {step === "file" && (
            <div className="space-y-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Upload className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-black text-xl text-gray-900">Add Your File</h3>
                <p className="text-gray-500 text-sm mt-1">Upload the content you want to sell</p>
              </div>
              <div
                className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${file ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-400"}`}
                onClick={() => fileRef.current?.click()}
              >
                <input ref={fileRef} type="file" className="hidden" onChange={e => setFile(e.target.files?.[0] || null)} />
                {file ? (
                  <div>
                    <Check className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <p className="font-bold text-blue-600 text-sm">{file.name}</p>
                    <p className="text-gray-400 text-xs mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                ) : (
                  <div>
                    <Upload className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                    <p className="font-bold text-gray-500">Click to upload</p>
                    <p className="text-gray-400 text-xs mt-1">Any file type supported</p>
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 rounded-xl" onClick={() => setStep("price")}>← Back</Button>
                <Button
                  className="flex-1 bg-blue-600 hover:bg-blue-700 rounded-xl font-black"
                  disabled={!file}
                  onClick={() => setStep("share")}
                >
                  Continue →
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Share */}
          {step === "share" && (
            <div className="space-y-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Share2 className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-black text-xl text-gray-900">Share & Earn!</h3>
                <p className="text-gray-500 text-sm mt-1">Your file is ready. Share your link to start earning.</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 flex items-center gap-2">
                <p className="text-sm text-gray-600 flex-1 truncate font-mono">{shareLink}</p>
                <button
                  onClick={handleCopy}
                  className={`p-2 rounded-lg transition-colors ${copied ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600 hover:bg-blue-200"}`}
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
              <div className="bg-blue-50 rounded-xl p-3 flex justify-between text-sm">
                <span className="text-gray-600">Price</span>
                <span className="font-black text-gray-900">${price || "0.00"}</span>
              </div>
              <div className="bg-blue-50 rounded-xl p-3 flex justify-between text-sm">
                <span className="text-gray-600">File</span>
                <span className="font-black text-gray-900 truncate ml-4">{file?.name}</span>
              </div>
              <Button
                className="w-full bg-green-600 hover:bg-green-700 rounded-xl font-black text-base py-3"
                onClick={handleCopy}
              >
                {copied ? "✓ Copied!" : "Copy Link & Share"}
              </Button>
              <button onClick={() => { setStep("price"); setPrice(""); setFile(null); }} className="w-full text-xs text-gray-400 hover:text-gray-600">
                Start a new FileShare
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function FloatingWidget() {
  const [collapsed, setCollapsed] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const { t } = useTranslation();

  if (collapsed) {
    return (
      <>
        {showModal && <FileshareModal onClose={() => setShowModal(false)} />}
        <div
          onClick={() => setCollapsed(false)}
          className="fixed bottom-6 right-6 z-50 cursor-pointer hover:scale-105 transition-transform flex flex-col items-center gap-0"
          style={{ width: '120px' }}
          data-testid="floating-widget-collapsed"
        >
          <Button className="w-full bg-blue-600 hover:bg-blue-700 rounded-full font-semibold animate-pulse py-1 px-3" style={{fontSize:'13.2px'}}>
            Start Free Today
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
      </>
    );
  }

  return (
    <>
      {showModal && <FileshareModal onClose={() => setShowModal(false)} />}
      <div className="fixed bottom-6 right-6 z-50 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 dark:border-white/10 overflow-hidden" style={{ width: '310px', fontSize: '16px' }} data-testid="floating-widget">
        <button
          onClick={() => setCollapsed(true)}
          className="absolute top-1 right-1 text-muted-foreground hover:text-foreground z-10"
          data-testid="button-collapse-widget"
        >
          <ChevronDown className="h-3 w-3" />
        </button>
        <div className="px-3 pt-3 pb-0 text-center">
          <p className="font-black text-lg leading-tight text-center w-full whitespace-nowrap">{t('widget.sell')}</p>
          <p className="font-black text-center w-full whitespace-nowrap" style={{color:'#1d4ed8', fontSize:'18px', letterSpacing:'-0.02em'}}>SET PRICE * ADD FILE * SHARE</p>
          <a href="https://www.swordpay.me" target="_blank" rel="noopener noreferrer" className="block mt-1">
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 rounded-full font-semibold animate-pulse"
              style={{fontSize:'15.4px'}}
              data-testid="button-try-it-now"
            >
              Start Free Today
            </Button>
          </a>
        </div>
        <a href="https://www.swordpay.me" target="_blank" rel="noopener noreferrer">
          <img
            src="/images/fileshare-new.jpg"
            alt="SWORD FileShare"
            className="w-full hover:opacity-90 transition-opacity cursor-pointer"
          />
        </a>
      </div>
    </>
  );
}
