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
  const year = project.date ? new Date(project.date).getFullYear() : null;

  return (
    <Link href={`/projects/${project.id}`} className="group block h-full">
      <div className="glass-panel rounded-2xl overflow-hidden h-full hover:bg-foreground/5 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/5 flex flex-col border border-border">
        <div className="relative h-56 w-full overflow-hidden">
          {image ? (
            <Image
              src={image.url}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400 font-mono">NO VISUAL</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-80" />

          <div className="absolute bottom-4 left-4 right-4">
            {project.genre && project.genre.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-2">
                {project.genre.slice(0, 2).map((g: string) => (
                  <span
                    key={g}
                    className="px-2 py-0.5 text-[10px] uppercase tracking-wider bg-black/30 backdrop-blur-md text-white/90 rounded border border-white/10"
                  >
                    {g}
                  </span>
                ))}
              </div>
            )}
            <h3 className="text-xl font-bold text-white leading-tight group-hover:text-gray-200 transition-colors">
              {project.title}
            </h3>
          </div>
        </div>

        <div className="p-5 flex flex-col flex-grow">
          <div className="flex items-center gap-2 text-xs text-muted font-mono mb-4">
            <span>{year ?? "---"}</span>
          </div>

          {description && (
            <p className="text-sm text-muted-foreground line-clamp-3 mb-4 leading-relaxed flex-grow">
              {description}
            </p>
          )}

          <div className="pt-4 border-t border-border mt-auto">
            <div className="flex flex-wrap gap-2">
              {project.skill && project.skill.length > 0 && (
                <span className="text-xs text-muted-foreground/80">
                  {project.skill.slice(0, 3).join(", ")}
                  {project.skill.length > 3 && "..."}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
