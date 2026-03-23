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
    return [...new Set(allGenres)].sort();
  }, [projects]);

  const [selectedGenre, setSelectedGenre] = useState<string | null>(
    genreParam && genres.includes(genreParam) ? genreParam : null,
  );
  const [visible, setVisible] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (genreParam && genres.includes(genreParam)) {
      setSelectedGenre(genreParam);
    } else if (!genreParam) {
      setSelectedGenre(null);
    }
  }, [genreParam, genres]);

  const filteredProjects = useMemo(
    () =>
      selectedGenre
        ? projects.filter((p) => p.genre?.includes(selectedGenre))
        : projects,
    [projects, selectedGenre],
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
    [selectedGenre],
  );

  return (
    <section id="projects" className="max-w-7xl mx-auto px-6">
      <div className="mb-12 flex items-end justify-between border-b border-border pb-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Selected Works
          </h2>
          <p className="text-muted-foreground text-sm">
            Recent projects &amp; collaborations
          </p>
        </div>
      </div>

      {/* Genre Filter Pills */}
      {genres.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => handleGenreClick(null)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
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
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
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
            <p className="text-muted-foreground">
              該当するプロジェクトがありません
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
