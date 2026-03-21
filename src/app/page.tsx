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
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {heroImages.length > 0 && <HeroSlideshow images={heroImages} />}

        <div className="relative z-20 text-center w-[80vw]">
          <h1
            className="text-white font-light tracking-[0.3em] uppercase leading-[1.3]"
            style={{ fontFamily: "var(--font-light)" }}
          >
            <span className="block text-[7vw] md:text-[5vw]">
              {about.orgNameEn ?? "MOCHIKI STUDIO"}
            </span>
            <span className="block text-[5vw] md:text-[3.5vw]">
              {about.nameEn ?? "CHIKAKO MOCHIKI"}
            </span>
          </h1>
          <div className="mx-auto mt-4 md:mt-8 w-[50%] h-[2px] md:h-[3px] bg-white/60" />
        </div>
      </section>

      {/* About Teaser */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="p-8 md:p-12 rounded-3xl flex flex-col md:flex-row gap-10 items-center">
            {about.icon && (
              <div className="relative shrink-0">
                <Image
                  src={about.icon.url}
                  alt={about.name ?? "Mochiki Studio"}
                  width={about.icon.width ?? 160}
                  height={about.icon.height ?? 160}
                  className="w-32 h-auto md:w-40 object-contain"
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
