import { getProjects } from "@/lib/microcms";
import ProjectCard from "@/components/ProjectCard";

export default async function HomePage() {
  const projects = await getProjects();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-16 pt-8 sm:px-6">
      {projects.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white/60 px-6 py-16 text-center text-sm text-slate-400 dark:border-slate-600 dark:bg-slate-900/50 dark:text-slate-500">
          現在表示できる作品がありません。microCMSでプロジェクトを追加してください。
        </div>
      ) : (
        <div className="masonry sm:columns-2 xl:columns-3 gap-3 [column-fill:_balance]">
          {projects.map((project) => (
            <div key={project.id} className="mb-3 break-inside-avoid">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
