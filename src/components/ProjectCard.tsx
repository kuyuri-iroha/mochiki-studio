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
      className="group block border border-white/80 bg-white/95 shadow-sm transition hover:-translate-y-[2px] hover:shadow-lg"
    >
      <article>
        <div
          className="relative w-full overflow-hidden bg-white"
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

          <div className="pointer-events-none absolute inset-0 z-10 opacity-90 transition-opacity duration-300 group-hover:opacity-100 sm:opacity-0">
            <span className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/10 to-white/85" />
            <div className="relative flex h-full flex-col justify-between p-6">
              <div className="space-y-2 text-slate-800">
                {dateLabel && (
                  <span className="inline-flex rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-slate-600">
                    {dateLabel}
                  </span>
                )}
                <h3 className="text-lg font-semibold leading-tight">{project.title}</h3>
                {description && (
                  <p className="text-sm leading-relaxed text-slate-600">
                    {description.length > 120 ? `${description.slice(0, 117)}...` : description}
                  </p>
                )}
              </div>

              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex flex-wrap gap-2">
                  {project.genre?.map((tag: string) => (
                    <span
                      key={`genre-${tag}`}
                      className="rounded-full border border-slate-300 px-3 py-1 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.skill?.map((tag: string) => (
                    <span
                      key={`skill-${tag}`}
                      className="rounded-full border border-slate-200 px-3 py-1 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="text-right text-sm font-semibold tracking-wide text-slate-700">
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
