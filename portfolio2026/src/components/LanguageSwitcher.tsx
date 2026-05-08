import { useLang, Lang } from "@/i18n/LanguageProvider";

const LANGS: { code: Lang; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "fr", label: "FR" },
  { code: "es", label: "ES" },
];

export const LanguageSwitcher = ({ tone = "light" }: { tone?: "light" | "dark" }) => {
  const { lang, setLang } = useLang();
  const base = tone === "dark" ? "text-background/60" : "text-muted-foreground";
  const active = tone === "dark" ? "text-background" : "text-foreground";
  const sep = tone === "dark" ? "text-background/30" : "text-border";
  return (
    <div className="flex items-center gap-2 text-xs font-mono tracking-wider">
      {LANGS.map((l, i) => (
        <span key={l.code} className="flex items-center gap-2">
          <button
            onClick={() => setLang(l.code)}
            className={`transition-colors hover:opacity-80 ${lang === l.code ? active : base}`}
            aria-label={`Switch language to ${l.label}`}
          >
            {l.label}
          </button>
          {i < LANGS.length - 1 && <span className={sep}>/</span>}
        </span>
      ))}
    </div>
  );
};
