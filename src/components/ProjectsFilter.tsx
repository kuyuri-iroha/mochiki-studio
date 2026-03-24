"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import ProjectCard from "@/components/ProjectCard";
import { Project } from "@/lib/microcms";

type Props = {
  projects: Project[];
};

export default function ProjectsFilter({ projects }: Props) {
  const searchParams = useSearchParams();
  const genreParam = searchParams.get("genre");

  const genres = useMemo(() => {
    const allGenres = projects.flatMap((p) => p.genre ?? []);
    return [...new Set(allGenres)].sort().reverse();
  }, [projects]);

  const resolveGenre = useCallback(
    (param: string | null): string | null => {
      if (!param) return null;
      if (genres.includes(param)) return param;
      // 部分一致: 片方がもう片方を含む
      const partial = genres.find((g) => g.includes(param) || param.includes(g));
      if (partial) return partial;
      // 共通プレフィックス: 4文字以上一致でマッチ
      const prefixMatch = genres.find((g) => {
        const len = Math.min(g.length, param.length);
        let i = 0;
        while (i < len && g[i] === param[i]) i++;
        return i >= 4;
      });
      return prefixMatch ?? null;
    },
    [genres]
  );

  const [selectedGenre, setSelectedGenre] = useState<string | null>(() => resolveGenre(genreParam));
  const [visible, setVisible] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (genreParam) {
      setSelectedGenre(resolveGenre(genreParam));
      requestAnimationFrame(() => {
        setTimeout(() => {
          sectionRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      });
    } else {
      setSelectedGenre(null);
    }
  }, [genreParam, resolveGenre]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const filteredProjects = useMemo(
    () => (selectedGenre ? projects.filter((p) => p.genre?.includes(selectedGenre)) : projects),
    [projects, selectedGenre]
  );

  const handleGenreClick = useCallback(
    (genre: string | null) => {
      if (genre === selectedGenre) return;
      if (timerRef.current) clearTimeout(timerRef.current);
      setVisible(false);
      timerRef.current = setTimeout(() => {
        setSelectedGenre(genre);
        setVisible(true);
        timerRef.current = null;
      }, 500);
    },
    [selectedGenre]
  );

  return (
    <section ref={sectionRef} id="projects" className="max-w-7xl mx-auto px-6">
      <div className="mb-12 flex items-end justify-between border-b border-border pb-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Selected Works</h2>
          <p className="text-muted-foreground text-sm">Recent projects &amp; collaborations</p>
        </div>
      </div>

      {/* Genre Filter Pills */}
      {genres.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => handleGenreClick(null)}
            aria-pressed={selectedGenre === null}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${
              selectedGenre === null
                ? "bg-foreground text-background"
                : "border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
            }`}
          >
            All
          </button>
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => handleGenreClick(genre)}
              aria-pressed={selectedGenre === genre}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                selectedGenre === genre
                  ? "bg-foreground text-background"
                  : "border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      )}

      {/* Project Grid with Fade Transition */}
      <div
        className="transition-opacity duration-500 ease-in-out"
        style={{ opacity: visible ? 1 : 0 }}
      >
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-card rounded-3xl border border-border">
            <p className="text-muted-foreground">該当するプロジェクトがありません</p>
          </div>
        )}
      </div>
    </section>
  );
}
