import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ImageAsset } from "@/lib/microcms";
import { getProjectById, getProjects } from "@/lib/microcms";

export async function generateStaticParams() {
  const projects = await getProjects({ fields: "id" });
  return projects.map(({ id }) => ({ id }));
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  const galleryImages = [
    ...(project.mainVisual ? [project.mainVisual] : []),
    ...(project.images ?? []).filter((image: ImageAsset | undefined): image is ImageAsset =>
      Boolean(image?.url)
    ),
  ];

  return (
    <div className="pb-20">
      {/* Hero Header */}
      <div className="relative h-[50vh] w-full bg-gray-900 border-b border-border">
        {project.mainVisual ? (
          <>
            <Image
              src={project.mainVisual.url}
              alt={project.title}
              fill
              priority
              className="object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900" />
        )}

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 max-w-7xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-400 mb-6 hover:text-white transition-colors uppercase tracking-widest"
          >
            ← Back to Projects
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-xl max-w-4xl leading-tight">
            {project.title}
          </h1>
          {project.genre && (
            <div className="flex flex-wrap gap-2 mb-2">
              {project.genre.map((g: string) => (
                <span
                  key={g}
                  className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-sm text-gray-200 backdrop-blur-sm"
                >
                  {g}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-12">
        <div className="grid lg:grid-cols-[1fr_320px] gap-12">
          {/* Main Content */}
          <div className="space-y-12">
            {project.description && (
              <div className="glass-panel p-8 rounded-3xl">
                <h2 className="text-xl font-bold text-foreground mb-6 border-l-4 border-foreground pl-4">
                  Project Overview
                </h2>
                <div
                  className="prose prose-lg max-w-none text-muted-foreground dark:prose-invert [&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-2"
                  dangerouslySetInnerHTML={{ __html: project.description }}
                />
              </div>
            )}

            {/* Gallery */}
            {galleryImages.length > 0 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-foreground border-l-4 border-foreground pl-4">
                  Gallery
                </h2>
                <div className="grid gap-6">
                  {galleryImages.map((image: ImageAsset, index: number) => (
                    <div
                      key={`${image.url}-${index}`}
                      className="relative rounded-2xl overflow-hidden border border-border bg-muted group"
                    >
                      <Image
                        src={image.url}
                        alt={`${project.title} - ${index + 1}`}
                        width={image.width ?? 1920}
                        height={image.height ?? 1080}
                        className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="glass-panel p-6 rounded-2xl sticky top-24">
              <h3 className="text-lg font-bold text-foreground mb-6 pb-2 border-b border-border">
                Project Details
              </h3>

              <dl className="space-y-5">
                {project.date && (
                  <div>
                    <dt className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
                      Date
                    </dt>
                    <dd className="text-muted-foreground font-mono text-sm">
                      {new Date(project.date).toLocaleDateString("ja-JP", {
                        year: "numeric",
                        month: "long",
                      })}
                    </dd>
                  </div>
                )}

                {project.genre && project.genre.length > 0 && (
                  <div>
                    <dt className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
                      Genre
                    </dt>
                    <dd className="text-foreground font-medium">{project.genre.join(", ")}</dd>
                  </div>
                )}

                {project.skill && project.skill.length > 0 && (
                  <div>
                    <dt className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
                      Tech Stack
                    </dt>
                    <dd className="flex flex-wrap gap-2">
                      {project.skill.map((s: string) => (
                        <span
                          key={s}
                          className="px-2 py-1 bg-muted/10 text-muted-foreground text-xs rounded border border-border"
                        >
                          {s}
                        </span>
                      ))}
                    </dd>
                  </div>
                )}

                <div className="pt-6 mt-6 border-t border-border flex flex-col gap-3">
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full py-3 bg-foreground text-background hover:bg-muted-foreground text-center rounded-xl font-bold transition-colors"
                    >
                      Visit Site
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full py-3 bg-muted/10 hover:bg-muted/20 text-foreground text-center rounded-xl font-bold transition-colors border border-border"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
