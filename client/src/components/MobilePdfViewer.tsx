import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  src: string;
  title: string;
}

export function MobilePdfViewer({ src, title }: Props) {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = "";
    setLoading(true);
    setError(false);

    (async () => {
      try {
        const pdfjs = await import("pdfjs-dist");
        const workerSrc = (await import("pdfjs-dist/build/pdf.worker.mjs?url"))
          .default;
        pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

        const pdf = await pdfjs.getDocument(src).promise;
        if (cancelled) return;

        const dpr = window.devicePixelRatio || 1;
        const containerWidth = container.clientWidth;

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          if (cancelled) return;
          const page = await pdf.getPage(pageNum);
          const unscaled = page.getViewport({ scale: 1 });
          const scale = (containerWidth / unscaled.width) * dpr;
          const viewport = page.getViewport({ scale });

          const canvas = document.createElement("canvas");
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          canvas.style.width = "100%";
          canvas.style.height = "auto";
          canvas.style.display = "block";
          canvas.style.marginBottom = "8px";
          canvas.setAttribute(
            "aria-label",
            `${title} — page ${pageNum} of ${pdf.numPages}`,
          );

          const ctx = canvas.getContext("2d");
          if (!ctx) continue;
          await page.render({ canvas, canvasContext: ctx, viewport }).promise;
          if (cancelled) return;
          container.appendChild(canvas);
          if (pageNum === 1) setLoading(false);
        }
        setLoading(false);
      } catch (e) {
        console.error("PDF render failed", e);
        if (!cancelled) {
          setError(true);
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [src, title]);

  return (
    <div className="relative h-full w-full overflow-y-auto bg-gray-100">
      {loading && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 z-10">
          <div className="text-sm text-gray-600">…</div>
        </div>
      )}
      {error && (
        <div className="flex flex-col items-center justify-center h-full p-8 text-center">
          <p className="text-gray-700 mb-4">{t("footer.loadError")}</p>
          <a
            href={src}
            download
            className="bg-[#1e3a8a] text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
          >
            {t("footer.download")} — {title}
          </a>
        </div>
      )}
      <div ref={containerRef} className="px-2 py-2" />
    </div>
  );
}
