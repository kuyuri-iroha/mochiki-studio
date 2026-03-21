import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import parse from "html-react-parser";
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

  const description = project.description ? parse(project.description) : null;

  const galleryImages = (project.images ?? []).filter(
    (image: ImageAsset | undefined): image is ImageAsset => Boolean(image?.url)
  );

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pb-20 pt-8 sm:px-6 lg:flex-row">
      <aside className="order-last flex flex-1 flex-col gap-6 border border-slate-200 bg-white/90 p-6 text-slate-700 shadow-sm lg:order-first lg:max-w-xs lg:flex-none">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 underline-offset-4 hover:underline dark:text-blue-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-4 w-4"
          >
            <path
              fillRule="evenodd"
              d="M12.78 15.28a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 0 1 0-1.06l4.5-4.5a.75.75 0 1 1 1.06 1.06L8.56 10l4.22 4.22a.75.75 0 0 1 0 1.06Z"
              clipRule="evenodd"
            />
          </svg>
          プロジェクト一覧に戻る
        </Link>

        <section className="space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em] text-slate-400">
            <span>Project</span>
            {project.date && (
              <span className="rounded-full bg-slate-100 px-3 py-1 text-[0.7rem] font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-300">
                {new Date(project.date).toLocaleDateString("ja-JP", {
                  year: "numeric",
                  month: "short",
                })}
              </span>
            )}
          </div>
          <h1 className="text-3xl font-bold text-slate-900">{project.title}</h1>
          {description && (
            <div className="space-y-4 text-sm leading-relaxed text-slate-600 [&_a]:text-blue-600 [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-blue-500">
              {description}
            </div>
          )}
        </section>

        {(project.genre?.length ?? 0) > 0 && (
          <section className="space-y-3">
            <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
              ジャンル
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.genre?.map((genre: string) => (
                <span
                  key={genre}
                  className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
                >
                  {genre}
                </span>
              ))}
            </div>
          </section>
        )}

        {(project.skill?.length ?? 0) > 0 && (
          <section className="space-y-3">
            <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
              使用技術
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.skill?.map((skill: string) => (
                <span
                  key={skill}
                  className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {(project.url || project.github) && (
          <section className="flex flex-col gap-3">
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-blue-300 px-4 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
              >
                サイトを見る
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4"
                >
                  <path d="M12.75 3.5a.75.75 0 0 0-1.5 0v7.69l-2.22-2.22a.75.75 0 0 0-1.06 1.06l3.5 3.5c.3.3.77.3 1.06 0l3.5-3.5a.75.75 0 1 0-1.06-1.06l-2.22 2.22V3.5Z" />
                  <path d="M4 6.75A2.75 2.75 0 0 1 6.75 4h1.5a.75.75 0 0 0 0-1.5h-1.5A4.25 4.25 0 0 0 2.5 6.75v6.5A4.25 4.25 0 0 0 6.75 17.5h6.5a4.25 4.25 0 0 0 4.25-4.25v-1.5a.75.75 0 0 0-1.5 0v1.5a2.75 2.75 0 0 1-2.75 2.75h-6.5A2.75 2.75 0 0 1 4 13.25v-6.5Z" />
                </svg>
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-400"
              >
                GitHub
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.486 2 12.021c0 4.426 2.865 8.18 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.865-.014-1.697-2.782.605-3.369-1.344-3.369-1.344-.454-1.156-1.11-1.464-1.11-1.464-.908-.622.069-.609.069-.609 1.004.071 1.532 1.033 1.532 1.033.892 1.53 2.341 1.088 2.91.833.091-.648.35-1.088.637-1.339-2.22-.255-4.555-1.114-4.555-4.959 0-1.095.39-1.99 1.029-2.691-.103-.254-.446-1.277.098-2.662 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.58 9.58 0 0 1 2.504.337c1.908-1.296 2.747-1.026 2.747-1.026.546 1.385.202 2.408.099 2.662.64.701 1.028 1.596 1.028 2.691 0 3.855-2.339 4.701-4.566 4.949.36.311.68.921.68 1.857 0 1.34-.012 2.421-.012 2.75 0 .268.18.58.688.481C19.138 20.197 22 16.444 22 12.02 22 6.486 17.523 2 12 2Z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            )}
          </section>
        )}
      </aside>

      <article className="flex-1">
        <div className="masonry columns-1 sm:columns-2">
          {project.mainVisual && (
            <figure
              className="mb-4 break-inside-avoid border border-slate-200 bg-white/95 p-4 shadow-lg transition hover:-translate-y-[4px] hover:shadow-xl"
              style={{ columnSpan: "all" }}
            >
              <div
                className="relative mx-auto w-full overflow-hidden bg-white"
                style={{
                  aspectRatio:
                    project.mainVisual.width && project.mainVisual.height
                      ? `${project.mainVisual.width} / ${project.mainVisual.height}`
                      : "4 / 3",
                }}
              >
                <Image
                  src={project.mainVisual.url}
                  alt={project.title}
                  width={project.mainVisual.width ?? 1920}
                  height={project.mainVisual.height ?? 1080}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                  className="mx-auto h-auto w-full max-w-[min(90vw,1200px)] object-contain"
                  priority
                />
              </div>
            </figure>
          )}

          {galleryImages.map((image: ImageAsset, index: number) => (
            <figure
              key={`${image.url}-${index}`}
              className="mb-4 break-inside-avoid border border-slate-200 bg-white/90 p-3 shadow-sm transition hover:-translate-y-[2px] hover:shadow-lg"
            >
              <div
                className="relative w-full overflow-hidden bg-white"
                style={{
                  aspectRatio:
                    image.width && image.height ? `${image.width} / ${image.height}` : "4 / 3",
                }}
              >
                <Image
                  src={image.url}
                  alt={`${project.title} - 画像 ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain"
                />
              </div>
            </figure>
          ))}
        </div>
      </article>
    </div>
  );
}
