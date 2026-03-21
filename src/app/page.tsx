import { getProjects, getAbout, getHeroImages } from "@/lib/microcms";
import ProjectCard from "@/components/ProjectCard";
import HeroSlideshow from "@/components/HeroSlideshow";
import Image from "next/image";
import Link from "next/link";

export default async function HomePage() {
  const [projects, about, heroImages] = await Promise.all([
    getProjects(),
    getAbout(),
    getHeroImages(),
  ]);

  const summaryText = about.description
    ? about.description
        .replace(/<br\s*\/?>/gi, " ")
        .replace(/<[^>]+>/g, "")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 200)
    : "";

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden border-b border-border">
        {heroImages.length > 0 && <HeroSlideshow images={heroImages} />}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background z-10 pointer-events-none" />

        <div className="relative z-20 text-center max-w-5xl mx-auto px-6 space-y-8">
          <div className="space-y-4">
            <p className="text-muted-foreground text-sm md:text-base font-bold tracking-[0.4em] uppercase">
              Creative Studio
            </p>
            <h1 className="font-bold text-foreground tracking-tight leading-none flex flex-col items-center">
              <span className="text-5xl md:text-8xl">{about.name}</span>
            </h1>
          </div>

          {about.overview && (
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed">
              {about.overview}
            </p>
          )}

          <div className="pt-8">
            <Link
              href="#projects"
              className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background rounded-full font-bold hover:bg-muted-foreground transition-colors shadow-lg shadow-foreground/20"
            >
              View Projects
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* About Teaser */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="glass-panel p-8 md:p-12 rounded-3xl flex flex-col md:flex-row gap-10 items-center">
            {about.icon && (
              <div className="relative shrink-0 w-32 h-32 md:w-40 md:h-40">
                <div className="absolute -inset-2 bg-gradient-to-tr from-gray-400 to-gray-600 rounded-full blur-xl opacity-40 animate-pulse" />
                <Image
                  src={about.icon.url}
                  alt={about.name ?? "Mochiki Studio"}
                  fill
                  className="rounded-full object-cover border-2 border-foreground/10 relative z-10"
                />
              </div>
            )}
            <div className="text-center md:text-left space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">{about.name}</h2>
              {summaryText && (
                <p className="text-muted-foreground leading-relaxed">
                  {summaryText}
                  {summaryText.length >= 200 && "..."}
                </p>
              )}
              <Link
                href="/about"
                className="inline-block text-foreground hover:text-muted-foreground font-medium border-b border-foreground/30 hover:border-foreground pb-0.5 transition-colors"
              >
                Read full profile →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section id="projects" className="max-w-7xl mx-auto px-6">
        <div className="mb-12 flex items-end justify-between border-b border-border pb-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Selected Works</h2>
            <p className="text-muted-foreground text-sm">Recent projects & collaborations</p>
          </div>
        </div>

        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-card rounded-3xl border border-border">
            <p className="text-muted-foreground">プロジェクトがありません</p>
          </div>
        )}
      </section>
    </div>
  );
}
