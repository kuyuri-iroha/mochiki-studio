import Image from "next/image";
import Link from "next/link";
import { Project } from "@/lib/microcms";
import { stripHtml } from "@/lib/text";

type Props = {
  project: Project;
};

export default function ProjectCard({ project }: Props) {
  const image = project.mainVisual;
  const description = project.description ? stripHtml(project.description) : "";
  const aspectRatio =
    image?.width && image?.height
      ? `${image.width} / ${image.height}`
      : "4 / 3";
  const dateLabel = project.date
    ? new Date(project.date).toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "short",
      })
    : null;

  return (
    <Link
      href={`/projects/${project.id}`}
      className="group block border border-slate-300 bg-white/40 shadow-sm transition hover:-translate-y-[2px] hover:border-slate-500 hover:shadow-md dark:border-slate-600 dark:bg-slate-900/40"
    >
      <article>
        <div
          className="relative w-full overflow-hidden bg-slate-100 dark:bg-slate-800"
          style={{ aspectRatio }}
        >
          {image ? (
            <Image
              src={image.url}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain"
              priority
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-slate-400">
              No image
            </div>
          )}

          <div className="pointer-events-none absolute inset-0 z-10 opacity-100 transition-opacity duration-300 group-hover:opacity-100 sm:opacity-0">
            <span className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/0 to-slate-950/80" />
            <div className="relative flex h-full flex-col justify-between p-6">
              <div className="space-y-2 text-slate-100">
                {dateLabel && (
                  <span className="inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-medium">
                    {dateLabel}
                  </span>
                )}
                <h3 className="text-lg font-semibold leading-tight">{project.title}</h3>
                {description && (
                  <p className="text-sm leading-relaxed text-slate-200">
                    {description.length > 120 ? `${description.slice(0, 117)}...` : description}
                  </p>
                )}
              </div>

              <div className="space-y-2 text-xs text-slate-200">
                <div className="flex flex-wrap gap-2">
                  {project.genre?.map((tag) => (
                    <span
                      key={`genre-${tag}`}
                      className="rounded-full border border-white/30 px-3 py-1 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.skill?.map((tag) => (
                    <span
                      key={`skill-${tag}`}
                      className="rounded-full border border-white/20 px-3 py-1 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="text-right text-sm font-semibold tracking-wide text-slate-100">
                  詳細を見る →
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
