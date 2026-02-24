import { cache } from "react";

// mathjax-full is server-safe
import { mathjax } from "mathjax-full/js/mathjax.js";
import { TeX } from "mathjax-full/js/input/tex.js";
import { SVG } from "mathjax-full/js/output/svg.js";
import { liteAdaptor } from "mathjax-full/js/adaptors/liteAdaptor.js";
import { RegisterHTMLHandler } from "mathjax-full/js/handlers/html.js";
import { AllPackages } from "mathjax-full/js/input/tex/AllPackages.js";

const adaptor = liteAdaptor();
RegisterHTMLHandler(adaptor);

const tex = new TeX({
  packages: AllPackages,
  inlineMath: [["\\(", "\\)"]],
  displayMath: [
    ["\\[", "\\]"],
    ["$$", "$$"],
  ],
});

const svg = new SVG({ fontCache: "local" });
const doc = mathjax.document("", { InputJax: tex, OutputJax: svg });

function texToSvg(texString: string, display: boolean) {
  const node = doc.convert(texString, { display });
  return adaptor.innerHTML(node);
}

// Cache per unique HTML string (huge win)
export const renderMathInHtml = cache(function renderMathInHtml(html: string) {
  if (!html) return html;

  // Replace display math first: $$...$$ and \[...\]
  html = html.replace(/\$\$([\s\S]+?)\$\$/g, (_, m) => texToSvg(m, true));
  html = html.replace(/\\\[([\s\S]+?)\\\]/g, (_, m) => texToSvg(m, true));

  // Replace inline math: \(...\)
  html = html.replace(/\\\(([\s\S]+?)\\\)/g, (_, m) => texToSvg(m, false));

  return html;
});
