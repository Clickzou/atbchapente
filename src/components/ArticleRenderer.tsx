import Link from "next/link";
import Image from "next/image";
import type { ContentBlock } from "@/lib/articles/types";

// Rendu d'un tableau de blocs typés en JSX. Le **gras** dans les paragraphes/items
// est interprété (champ sémantique SEO mis en avant comme chez Clickzou).
function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-semibold text-anthracite">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

const calloutStyles = {
  info: "border-sky-300 bg-sky-50 text-sky-900",
  warning: "border-amber-300 bg-amber-50 text-amber-900",
  tip: "border-emerald-300 bg-emerald-50 text-emerald-900",
} as const;

export default function ArticleRenderer({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-5 text-[1.05rem] leading-relaxed text-foreground/90">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "paragraph":
            return <p key={i}>{renderInline(block.text)}</p>;

          case "heading":
            return block.level === 2 ? (
              <h2 key={i} className="pt-6 text-2xl font-bold text-anthracite">
                {block.text}
              </h2>
            ) : (
              <h3 key={i} className="pt-4 text-xl font-semibold text-anthracite">
                {block.text}
              </h3>
            );

          case "list":
            return block.ordered ? (
              <ol key={i} className="list-decimal space-y-2 pl-6">
                {block.items.map((it, j) => (
                  <li key={j}>{renderInline(it)}</li>
                ))}
              </ol>
            ) : (
              <ul key={i} className="list-disc space-y-2 pl-6">
                {block.items.map((it, j) => (
                  <li key={j}>{renderInline(it)}</li>
                ))}
              </ul>
            );

          case "callout":
            return (
              <div
                key={i}
                className={`rounded-lg border-l-4 p-4 ${calloutStyles[block.variant ?? "info"]}`}
              >
                {renderInline(block.text)}
              </div>
            );

          case "quote":
            return (
              <blockquote
                key={i}
                className="border-l-4 border-orange pl-4 italic text-foreground/70"
              >
                {block.text}
                {block.author && (
                  <footer className="mt-1 text-sm not-italic">— {block.author}</footer>
                )}
              </blockquote>
            );

          case "image":
            return (
              <figure key={i} className="my-6">
                <div className="relative aspect-video overflow-hidden rounded-xl bg-muted">
                  <Image src={block.src} alt={block.alt} fill className="object-cover" />
                </div>
                {block.caption && (
                  <figcaption className="mt-2 text-center text-sm text-foreground/60">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );

          case "cta":
            return (
              <div key={i} className="my-6 rounded-xl bg-muted p-6 text-center">
                <p className="mb-4 font-semibold text-anthracite">{block.text}</p>
                <Link
                  href={block.href}
                  className="inline-block rounded-full bg-orange px-6 py-3 font-semibold text-white transition-colors hover:bg-orange-dark"
                >
                  {block.label}
                </Link>
              </div>
            );

          case "faq":
            return (
              <div key={i} className="my-6 space-y-3">
                {block.items.map((item, j) => (
                  <details
                    key={j}
                    className="rounded-lg border border-black/5 bg-white p-4"
                  >
                    <summary className="cursor-pointer font-semibold text-anthracite">
                      {item.question}
                    </summary>
                    <p className="mt-2 text-foreground/80">{renderInline(item.answer)}</p>
                  </details>
                ))}
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
