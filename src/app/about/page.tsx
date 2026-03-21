import Image from "next/image";
import parse from "html-react-parser";
import { getAbout } from "@/lib/microcms";

export default async function AboutPage() {
  const about = await getAbout();

  const workContentItems = about.workContent
    ? about.workContent
        .split(/[・,、]/)
        .map((item: string) => item.trim())
        .filter(Boolean)
    : [];

  return (
    <div className="max-w-5xl mx-auto px-6 py-20 space-y-20">
      {/* Hero Section */}
      <section className="glass-panel rounded-3xl p-10 md:p-12">
        <div className="flex flex-col md:flex-row gap-10 items-start">
          {about.icon && (
            <div className="relative shrink-0">
              <div className="absolute -inset-1 bg-gradient-to-r from-gray-400 to-gray-600 dark:from-gray-600 dark:to-gray-400 rounded-3xl blur opacity-30" />
              <Image
                src={about.icon.url}
                alt={about.name ?? "Mochiki Studio"}
                width={about.icon.width ?? 180}
                height={about.icon.height ?? 180}
                className="relative h-48 w-48 rounded-3xl object-cover border border-border"
                priority
              />
            </div>
          )}

          <div className="space-y-6 flex-grow">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-muted-foreground mb-2">
                Profile
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
                {about.name}
              </h1>
              {about.overview && <p className="text-muted-foreground mt-2">{about.overview}</p>}
            </div>

            {about.description && (
              <div className="space-y-3 text-muted-foreground leading-relaxed text-lg [&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-2">
                {parse(about.description)}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Work & Services */}
      {(workContentItems.length > 0 || about.workDescription) && (
        <section>
          <div className="mb-8 pl-2 border-l-4 border-foreground/20">
            <h2 className="text-3xl font-bold text-foreground">Work & Services</h2>
            <p className="text-muted-foreground mt-1">業務内容</p>
          </div>

          <div className="glass-panel rounded-2xl p-8">
            {workContentItems.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {workContentItems.map((item: string) => (
                  <span
                    key={item}
                    className="px-3 py-1 bg-foreground/5 text-foreground/80 text-sm rounded-full border border-border font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>
            )}

            {about.workDescription && (
              <div className="space-y-3 text-muted-foreground leading-relaxed [&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-2">
                {parse(about.workDescription)}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Studio Info */}
      {(about.overview || about.overviewDesc) && (
        <section>
          <div className="mb-8 pl-2 border-l-4 border-foreground/20">
            <h2 className="text-3xl font-bold text-foreground">Studio Info</h2>
            <p className="text-muted-foreground mt-1">スタジオ概要</p>
          </div>

          <div className="glass-panel rounded-3xl p-8">
            {about.overview && <p className="text-foreground font-medium mb-4">{about.overview}</p>}
            {about.overviewDesc && (
              <div className="space-y-3 text-muted-foreground leading-relaxed [&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-2">
                {parse(about.overviewDesc)}
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
