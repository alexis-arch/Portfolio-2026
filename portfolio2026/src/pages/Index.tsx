import { ArrowUpRight, Mail, MapPin, Menu, X, Train, Landmark, Globe, Stethoscope, GraduationCap, Code2, Terminal, Sparkles } from "lucide-react";
import portrait from "@/assets/photo-alexis.jpg";
import { useLang } from "@/i18n/LanguageProvider";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import {
  FaJava, FaAngular, FaReact, FaVuejs, FaNodeJs, FaJs, FaHtml5, FaCss3Alt,
  FaPhp, FaSymfony, FaDrupal, FaWordpress, FaJenkins, FaGithub, FaGitlab,
  FaGitAlt, FaAws,
} from "react-icons/fa";
import {
  SiSpringboot, SiHibernate, SiTypescript, SiExpress, SiPostgresql,
  SiElasticsearch, SiTerraform, SiKubernetes, SiGrafana, SiPostman,
  SiSwagger, SiGnubash,
} from "react-icons/si";

import { VscAzure } from "react-icons/vsc";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from "react";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";


type Tool = { name: string; Icon: React.ComponentType<{ className?: string}>; color: string};

const categories: { id: string, label: string, tools: Tool[] }[] = [
    {
        id: "backend",
        label: "Backend",
        tools: [
            {name: "Java", Icon: FaJava, color: "text-[#f89820]"},
            { name: "Spring Boot", Icon: SiSpringboot, color: "text-[#6db33f]" },
            { name: "Spring Batch", Icon: SiSpringboot, color: "text-[#6db33f]" },
            { name: "Hibernate", Icon: SiHibernate, color: "text-[#bcae79]" },
            { name: "Express.js", Icon: SiExpress, color: "text-foreground" },
            { name: "PHP", Icon: FaPhp, color: "text-[#777bb4]" },
            { name: "Symfony", Icon: FaSymfony, color: "text-foreground" },
            { name: "Drupal", Icon: FaDrupal, color: "text-[#0678be]" },
            { name: "WordPress", Icon: FaWordpress, color: "text-[#21759b]" },
        ]
    },
    {
        id: "frontend",
        label: "Frontend",
        tools: [
        { name: "Angular", Icon: FaAngular, color: "text-[#dd0031]" },
        { name: "React", Icon: FaReact, color: "text-[#61dafb]" },
        { name: "Vue.js", Icon: FaVuejs, color: "text-[#42b883]" },
        { name: "TypeScript", Icon: SiTypescript, color: "text-[#3178c6]" },
        { name: "JavaScript", Icon: FaJs, color: "text-[#f7df1e]" },
        { name: "HTML", Icon: FaHtml5, color: "text-[#e34f26]" },
        { name: "CSS", Icon: FaCss3Alt, color: "text-[#1572b6]" },
        ],
    },
    {
        id: "data",
        label: "Data",
        tools: [
        { name: "PostgreSQL", Icon: SiPostgresql, color: "text-[#336791]" },
        { name: "Elasticsearch", Icon: SiElasticsearch, color: "text-[#005571]" },
        ],
    },
    {
        id: "devops",
        label: "DevOps & Cloud",
        tools: [
        { name: "Jenkins", Icon: FaJenkins, color: "text-[#d33833]" },
        { name: "GitHub Actions", Icon: FaGithub, color: "text-foreground" },
        { name: "Terraform", Icon: SiTerraform, color: "text-[#7b42bc]" },
        { name: "Kubernetes", Icon: SiKubernetes, color: "text-[#326ce5]" },
        { name: "Azure", Icon: VscAzure, color: "text-[#0078d4]" },
        { name: "Grafana", Icon: SiGrafana, color: "text-[#f46800]" },
        ],
    },
    {
        id: "tools",
        label: "Outils",
        tools: [
        { name: "Git", Icon: FaGitAlt, color: "text-[#f05032]" },
        { name: "GitLab", Icon: FaGitlab, color: "text-[#fc6d26]" },
        { name: "Postman", Icon: SiPostman, color: "text-[#ff6c37]" },
        { name: "Swagger", Icon: SiSwagger, color: "text-[#85ea2d]" },
        { name: "Shell", Icon: SiGnubash, color: "text-foreground" },
        ],
    },
]

const Index = () => {

  const [menuOpen, setMenuOpen] = useState(false);

  const { t } = useLang();

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return;

    const captchaToken = recaptchaRef.current?.getValue();

    if (!captchaToken) {
        alert("Veuillez valider le captcha.");
        return;
    }
    setStatus("loading");
    const { error } = await supabase.from("Contact").insert([form]);
    if (error) {
        setStatus("error");
    } else {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
        recaptchaRef.current?.reset();
    }
  };

  const NAV = [
    { id: "about", label: t.nav.about },
    { id: "work", label: t.nav.work },
    { id: "projects", label: t.nav.projects },
    { id: "contact-form", label: t.nav.contact },
  ];


  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-accent-foreground">
      {/* NAV */}
      {/* NAV */}
<header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/60">
  <nav className="max-w-6xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between gap-4">
    <a href="#top" className="font-serif text-lg tracking-tight">
      Alexis<span className="text-accent">.</span>Feau
    </a>

    <ul className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
      {NAV.map((n) => (
        <li key={n.id}>
          <a href={`#${n.id}`} className="hover:text-foreground transition-colors">
            {n.label}
          </a>
        </li>
      ))}
    </ul>

    <div className="flex items-center gap-4 md:gap-6">
      <LanguageSwitcher />
      
      <a
        href="mailto:alexisfeau.pro@gmail.com"
        className="hidden md:inline-flex items-center gap-1.5 text-sm border border-foreground rounded-full px-4 py-1.5 hover:bg-foreground hover:text-background transition-colors"
      >
        {t.nav.cta} <ArrowUpRight className="h-3.5 w-3.5" />
      </a>
      <button
        className="md:hidden flex items-center justify-center p-2 rounded-md text-foreground hover:bg-secondary transition-colors"
        onClick={() => setMenuOpen((o) => !o)}
        aria-label="Toggle menu"
      >
        {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>
    </div>
  </nav>

  {menuOpen && (
    <div className="md:hidden border-t border-border/60 bg-background/95 backdrop-blur-md px-6 pb-6 pt-4">
      <ul className="flex flex-col gap-4 text-sm text-muted-foreground">
        {NAV.map((n) => (
          <li key={n.id}>
            
            <a href={`#${n.id}`}
              className="block hover:text-foreground transition-colors py-1"
              onClick={() => setMenuOpen(false)}
            >
              {n.label}
            </a>
          </li>
        ))}
      </ul>
      
       <a href="mailto:alexisfeau.pro@gmail.com"
        className="mt-6 inline-flex items-center gap-1.5 text-sm border border-foreground rounded-full px-4 py-1.5 hover:bg-foreground hover:text-background transition-colors"
        onClick={() => setMenuOpen(false)}
      >
        {t.nav.cta} <ArrowUpRight className="h-3.5 w-3.5" />
      </a>
    </div>
  )}
</header>

      {/* HERO */}
      <section id="top" className="pt-32 pb-20 md:pt-44 md:pb-32 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <p className="reveal text-xs uppercase tracking-[0.25em] text-muted-foreground mb-8">
            {t.hero.eyebrow}
          </p>
          <div className="grid md:grid-cols-12 gap-10 md:gap-12 items-end">
            <div className="md:col-span-8">
              <h1 className="reveal reveal-delay-1 font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.02] text-balance">
                {t.hero.title_1}
                <em className="italic text-accent">{t.hero.title_em}</em>
                {t.hero.title_2}
              </h1>
            </div>
            <div className="reveal reveal-delay-2 md:col-span-4 flex justify-center md:justify-end">
              <div className="group relative w-full max-w-[300px] aspect-square">
                {/* Rotating dotted ring */}
                <svg
                  viewBox="0 0 200 200"
                  className="absolute inset-0 w-full h-full text-muted-foreground/40 animate-[spin_40s_linear_infinite]"
                  aria-hidden
                >
                  <defs>
                    <path
                      id="portraitCircle"
                      d="M 100,100 m -94,0 a 94,94 0 1,1 188,0 a 94,94 0 1,1 -188,0"
                    />
                  </defs>
                  <circle
                    cx="100"
                    cy="100"
                    r="94"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    strokeDasharray="1 4"
                  />
                  <text className="fill-current font-mono" style={{ fontSize: "7px", letterSpacing: "0.35em" }}>
                    <textPath href="#portraitCircle" startOffset="0">
                      ALEXIS FEAU · FULL-STACK DEVELOPER · JAVA · SPRING BOOT · ANGULAR · REACT ·
                    </textPath>
                  </text>
                </svg>

                {/* Accent arc */}
                <svg
                  viewBox="0 0 200 200"
                  className="absolute inset-0 w-full h-full text-accent transition-transform duration-700 ease-out group-hover:rotate-12"
                  aria-hidden
                >
                  <circle
                    cx="100"
                    cy="100"
                    r="86"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeDasharray="135 540"
                    strokeLinecap="round"
                    transform="rotate(-60 100 100)"
                  />
                </svg>

                {/* Circular portrait */}
                <div
                  className="absolute inset-[10%] rounded-full overflow-hidden bg-secondary"
                  style={{ boxShadow: "var(--shadow-soft)" }}
                >
                  <img
                    src={portrait}
                    alt="Portrait of Alexis Feau"
                    width={480}
                    height={480}
                    loading="eager"
                    className="w-full h-full object-cover scale-[1.05] transition-transform duration-[900ms] ease-out group-hover:scale-100"
                  />
                  {/* Subtle warm wash */}
                  <div
                    className="pointer-events-none absolute inset-0 mix-blend-soft-light opacity-40 transition-opacity duration-700 group-hover:opacity-0"
                    style={{
                      background:
                        "linear-gradient(160deg, hsl(var(--accent) / 0.35) 0%, transparent 60%, hsl(var(--primary) / 0.3) 100%)",
                    }}
                    aria-hidden
                  />
                </div>

                {/* Accent dot */}
                <span
                  className="absolute top-[8%] right-[8%] h-3 w-3 rounded-full bg-accent ring-4 ring-background"
                  aria-hidden
                />

                {/* Signature plate */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-background border border-border px-4 py-1.5 rounded-full shadow-sm flex items-baseline gap-3 whitespace-nowrap">
                  <span className="font-serif italic text-sm leading-none">Alexis Feau</span>
                  <span className="h-1 w-1 rounded-full bg-accent" aria-hidden />
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    Dev
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="reveal reveal-delay-3 mt-12 flex flex-col md:flex-row md:items-end md:justify-between gap-8 max-w-5xl">
            <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
              {t.hero.intro}
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {t.hero.location}
            </div>
          </div>
        </div>
      </section>

      <div className="hairline max-w-6xl mx-auto" />

        {/* ABOUT */}
      <section id="about" className="py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-3">
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{t.about.label}</p>

            {/* Illustrative visual stack */}
            <div className="mt-8 hidden md:block">
              <div className="relative aspect-square w-full max-w-[260px]">
                <div
                  className="absolute inset-0 rounded-2xl border border-border opacity-60"
                  style={{
                    backgroundImage:
                      "linear-gradient(hsl(var(--hairline)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--hairline)) 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                  }}
                  aria-hidden
                />

                <div className="absolute top-4 left-4 right-10 bg-background border border-border rounded-lg shadow-[var(--shadow-soft)] overflow-hidden">
                  <div className="flex items-center gap-1.5 px-3 py-2 border-b border-border bg-secondary/60">
                    <span className="h-2 w-2 rounded-full bg-destructive/60" />
                    <span className="h-2 w-2 rounded-full bg-accent/70" />
                    <span className="h-2 w-2 rounded-full bg-foreground/20" />
                    <span className="ml-2 font-mono text-[10px] text-muted-foreground">Application.java</span>
                  </div>
                  <pre className="font-mono text-[10px] leading-relaxed p-3 text-foreground/80">
{`@SpringBootApplication
public class App {
  public static void main(
    String[] args) {
    SpringApplication
      .run(App.class, args);
  }
}`}
                  </pre>
                </div>

                <div className="absolute bottom-3 right-3 left-12 bg-foreground text-background rounded-lg shadow-[var(--shadow-soft)] overflow-hidden">
                  <div className="flex items-center gap-2 px-3 py-1.5 border-b border-background/10">
                    <Terminal className="h-3 w-3" strokeWidth={1.5} />
                    <span className="font-mono text-[10px] opacity-60">~ deploy</span>
                  </div>
                  <pre className="font-mono text-[10px] leading-relaxed p-3">
{`$ mvn clean install
$ kubectl apply -f .
✓ build succeeded
✓ deployed`}
                  </pre>
                </div>

                <div className="absolute -top-3 -right-3 h-12 w-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center shadow-[var(--shadow-soft)] rotate-6">
                  <Sparkles className="h-5 w-5" strokeWidth={1.5} />
                </div>
              </div>

              <dl className="mt-8 grid grid-cols-2 gap-4">
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Years</dt>
                  <dd className="font-serif text-3xl mt-1">3<span className="text-accent">+</span></dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Sectors</dt>
                  <dd className="font-serif text-3xl mt-1">4</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="md:col-span-9 space-y-8">
            <div className="space-y-6 text-xl md:text-2xl font-serif leading-relaxed text-balance">
              <p>{t.about.p1}</p>
              <p className="text-muted-foreground">{t.about.p2}</p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 pt-6">
              {[
                { icon: Code2, title: "Backend", text: "Java · Spring Boot · Spring Batch" },
                { icon: Globe, title: "Frontend", text: "Angular · React · TypeScript" },
                { icon: Terminal, title: "DevOps", text: "Jenkins · Terraform · Grafana" },
              ].map((p) => (
                <div
                  key={p.title}
                  className="group rounded-xl border border-border bg-secondary/30 p-5 transition-all duration-300 hover:border-accent/60 hover:bg-secondary/60 hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-background border border-border text-foreground/80 transition-colors group-hover:border-accent group-hover:text-accent">
                      <p.icon className="h-4 w-4" strokeWidth={1.5} />
                    </span>
                    <h3 className="font-serif text-lg">{p.title}</h3>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="hairline max-w-6xl mx-auto" />

      {/* EXPERIENCE */}
      <section id="work" className="py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-12">
          <div className="md:col-span-3">
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground sticky top-24">
              {t.experience.label}
            </p>
          </div>
          <div className="md:col-span-9">
            <ol className="relative border-l border-border/70 ml-5 md:ml-6">
              {t.experience.items.map((e, i) => {
                const IconCmp = e.icon === "train" ? Train : e.icon === "bank" ? Landmark : e.icon === "medical" ? Stethoscope : Globe;
                return (
                  <li key={i} className="relative pl-8 md:pl-12 pb-14 last:pb-0 group">
                    {/* Timeline node */}
                    <span
                      className="absolute -left-[21px] md:-left-[25px] top-1 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-background border border-border text-foreground/80 shadow-sm transition-all duration-500 group-hover:border-accent group-hover:text-accent group-hover:scale-105"
                      aria-hidden
                    >
                      <IconCmp className="h-4 w-4 md:h-5 md:w-5" strokeWidth={1.5} />
                    </span>

                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
                      <span>{e.period}</span>
                      <span className="text-border" aria-hidden>·</span>
                      <span>{e.location}</span>
                    </div>

                    <h3 className="mt-3 font-serif text-2xl md:text-3xl leading-tight text-balance">
                      {e.role}
                    </h3>
                    <p className="mt-1 text-accent text-sm md:text-base">{e.company}</p>

                    <ul className="mt-5 space-y-2.5 max-w-2xl">
                      {e.bullets.map((b, j) => (
                        <li key={j} className="flex gap-3 text-[15px] text-muted-foreground leading-relaxed">
                          <span className="mt-[10px] h-px w-3 bg-border shrink-0" aria-hidden />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      <div className="hairline max-w-6xl mx-auto" />

      {/* EDUCATION */}
      <section id="education" className="py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-12">
          <div className="md:col-span-3">
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground sticky top-24">
              {t.experience.educationLabel}
            </p>
          </div>
          <div className="md:col-span-9">
            <ol className="divide-y divide-border">
              {t.experience.education.map((ed, i) => (
                <li
                  key={i}
                  className="group grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-8 first:pt-0 last:pb-0"
                >
                  <div className="md:col-span-3 flex md:flex-col items-baseline md:items-start gap-3 md:gap-2">
                    <GraduationCap className="h-4 w-4 text-accent" strokeWidth={1.5} aria-hidden />
                    <span className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
                      {ed.period}
                    </span>
                  </div>
                  <div className="md:col-span-9">
                    <h3 className="font-serif text-2xl md:text-3xl leading-tight text-balance transition-colors group-hover:text-accent">
                      {ed.degree}
                    </h3>
                    <p className="mt-1 text-accent text-sm">{ed.school}</p>
                    <p className="mt-3 text-muted-foreground leading-relaxed max-w-2xl">
                      {ed.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <div className="hairline max-w-6xl mx-auto" />

      {/* PROJECTS */}
      <section id="projects" className="py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-12 gap-12 mb-16">
            <div className="md:col-span-3">
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{t.projects.label}</p>
            </div>
            <h2 className="md:col-span-9 font-serif text-4xl md:text-6xl text-balance">
              {t.projects.heading}
            </h2>
          </div>

          <ul className="border-t border-border">
            {t.projects.items.map((p, i) => (
              <li key={i} className="group">
                <a href="#contact" className="grid grid-cols-12 gap-6 items-center py-8 md:py-10 border-b border-border transition-colors hover:bg-secondary/40 px-2 -mx-2 rounded-sm">
                  <span className="col-span-1 text-sm font-mono text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="col-span-11 md:col-span-6">
                    <h3 className="font-serif text-2xl md:text-3xl group-hover:text-accent transition-colors">
                      {p.title}
                    </h3>
                  </div>
                  <p className="hidden md:block md:col-span-4 text-sm text-muted-foreground">
                    {p.tag}
                  </p>
                  <ArrowUpRight className="hidden md:block md:col-span-1 h-5 w-5 ml-auto text-muted-foreground group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                  <p className="col-span-12 md:col-start-2 md:col-span-10 text-muted-foreground -mt-2 md:hidden">
                    {p.description}
                  </p>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="hairline max-w-6xl mx-auto" />

      {/* SKILLS */}
      <main className="min-h-screen bg-background py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 flex items-baseline gap-6">
          <span className="text-xs tracking-[0.3em] text-muted-foreground uppercase">
            Stack
          </span>
          <h1 className="text-3xl md:text-4xl font-serif text-foreground">
            Outils & Technologies
          </h1>
        </header>

        <Tabs defaultValue={categories[0].id} className="w-full">
          <TabsList className="mb-10 inline-flex h-auto flex-wrap justify-start gap-1 rounded-full border border-border/60 bg-card/40 p-1.5 backdrop-blur-md shadow-[0_4px_24px_-8px_hsl(var(--foreground)/0.1)]">
            {categories.map((cat) => (
              <TabsTrigger
                key={cat.id}
                value={cat.id}
                className="group relative rounded-full px-6 py-2.5 text-sm font-medium text-muted-foreground transition-all duration-500 ease-out hover:text-foreground hover:bg-muted/60 data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:shadow-[0_8px_20px_-6px_hsl(var(--foreground)/0.35)] data-[state=active]:hover:bg-foreground"
              >
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((cat) => (
            <TabsContent
              key={cat.id}
              value={cat.id}
              className="focus-visible:outline-none data-[state=active]:animate-fade-in"
            >
              <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {cat.tools.map(({ name, Icon, color }, idx) => (
                  <div
                    key={name}
                    style={{ animationDelay: `${idx * 60}ms`, animationFillMode: "backwards" }}
                    className="group relative flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6 aspect-square overflow-hidden animate-fade-in transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-foreground/20"
                  >
                    <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-foreground/[0.04] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <Icon className={`relative h-12 w-12 ${color} transition-transform duration-300 group-hover:scale-110`} />
                    <span className="relative text-sm font-medium text-card-foreground text-center">
                      {name}
                    </span>
                  </div>
                ))}
              </section>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </main>

      {/* CONTACT FORM */}
        <section id="contact-form" className="py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-12">
            <div className="md:col-span-3">
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground sticky top-24">
                {t.contact.label}
            </p>
            </div>
            <div className="md:col-span-9 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                    Nom
                </label>
                <input
                    type="text"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className="w-full bg-transparent border-b border-border py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground transition-colors"
                    placeholder="Votre nom"
                />
                </div>
                <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                    Email
                </label>
                <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    className="w-full bg-transparent border-b border-border py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground transition-colors"
                    placeholder="votre@email.com"
                />
                </div>
            </div>
            <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                Message
                </label>
                <textarea
                rows={5}
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                className="w-full bg-transparent border-b border-border py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground transition-colors resize-none"
                placeholder="Votre message..."
                />
            </div>

            {/* CAPTCHA */}
            <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                theme="light"
            />

            <div className="flex items-center gap-6 pt-2">
                <button
                onClick={handleSubmit}
                disabled={status === "loading"}
                className="inline-flex items-center gap-1.5 text-sm border border-foreground rounded-full px-6 py-2.5 hover:bg-foreground hover:text-background transition-colors disabled:opacity-50"
                >
                {status === "loading" ? "Envoi..." : "Envoyer"} <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
                {status === "success" && (
                <p className="text-sm text-accent">Message envoyé !</p>
                )}
                {status === "error" && (
                <p className="text-sm text-destructive">Une erreur est survenue.</p>
                )}
            </div>
            </div>
        </div>
        </section>

        <div className="hairline max-w-6xl mx-auto" />

      {/* CONTACT */}
      <section id="contact" className="px-6 md:px-10 pt-24 pb-16 md:pt-40 md:pb-20 bg-foreground text-background">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <p className="text-xs uppercase tracking-[0.25em] text-background/60">{t.contact.label}</p>
            <LanguageSwitcher tone="dark" />
          </div>
          <h2 className="font-serif text-5xl md:text-8xl leading-[1.02] text-balance max-w-5xl">
            {t.contact.heading_1}
            <em className="italic text-accent">{t.contact.heading_em}</em>
            {t.contact.heading_2}
          </h2>

          <div className="mt-16 grid md:grid-cols-3 gap-10 border-t border-background/15 pt-12">
            <a href="mailto:alexisfeau.pro@gmail.com" className="group">
              <p className="text-xs uppercase tracking-[0.25em] text-background/60 mb-2">{t.contact.email}</p>
              <p className="font-serif text-2xl group-hover:text-accent transition-colors flex items-center gap-2">
                <Mail className="h-5 w-5" /> alexisfeau.pro@gmail.com
              </p>
            </a>
            <a href="https://es.linkedin.com/in/alexis-feau-5492051aa/en" target="_blank" rel="noreferrer" className="group">
              <p className="text-xs uppercase tracking-[0.25em] text-background/60 mb-2">{t.contact.linkedin}</p>
              <p className="font-serif text-2xl group-hover:text-accent transition-colors flex items-center gap-2">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
                </svg> /in/alexis-feau
              </p>
            </a>
            <a href="https://github.com/alexis-arch" className="group" target="_blank" rel="noreferrer">
              <p className="text-xs uppercase tracking-[0.25em] text-background/60 mb-2">{t.contact.github}</p>
              <p className="font-serif text-2xl group-hover:text-accent transition-colors flex items-center gap-2">
                 <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                </svg> @alexis-arch
              </p>
            </a>
          </div>

          <div className="mt-20 flex flex-col md:flex-row justify-between gap-4 text-sm text-background/50">
            <p>{t.contact.footer_left}</p>
            <p>{t.contact.footer_right}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
