"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import parse from "html-react-parser";
import { About } from "@/lib/microcms";

type Props = {
  about: About;
};

const getInitials = (name: string) => {
  const trimmed = name.trim();
  if (!trimmed) return "MS";
  const parts = trimmed.split(/\s+/).filter(Boolean);
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export default function AboutOverlay({ about }: Props) {
  const [open, setOpen] = useState(false);

  const initials = useMemo(() => getInitials(about.name ?? "Mochiki Studio"), [about.name]);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      body.style.overflow = previousOverflow;
    };
  }, [open, close]);

  const descriptionContent = useMemo(
    () => (about.description ? parse(about.description) : null),
    [about.description]
  );

  const workDescriptionContent = useMemo(
    () => (about.workDescription ? parse(about.workDescription) : null),
    [about.workDescription]
  );

  const overviewDescContent = useMemo(
    () => (about.overviewDesc ? parse(about.overviewDesc) : null),
    [about.overviewDesc]
  );

  const workContentItems = useMemo(() => {
    if (!about.workContent) return [];
    return about.workContent
      .split(/[・,、]/)
      .map((item: string) => item.trim())
      .filter(Boolean);
  }, [about.workContent]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="プロフィールを表示"
        className="group fixed left-6 top-6 z-50 flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-white/60 bg-white/90 shadow-lg transition-all hover:scale-105 hover:shadow-xl sm:h-16 sm:w-16"
      >
        {about.icon ? (
          <Image
            src={about.icon.url}
            alt={about.name ?? "プロフィール"}
            width={about.icon.width ?? 128}
            height={about.icon.height ?? 128}
            className="h-full w-full object-cover"
            priority
          />
        ) : (
          <span className="text-lg font-semibold text-slate-600 transition-colors group-hover:text-slate-900">
            {initials}
          </span>
        )}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8 sm:px-6">
          <div className="absolute inset-0 bg-white/80 backdrop-blur" onClick={close} aria-hidden />
          <article className="relative z-10 max-h-[90vh] w-full max-w-4xl overflow-y-auto border border-white/80 bg-white/95 p-6 shadow-2xl sm:p-10">
            <button
              type="button"
              onClick={close}
              aria-label="プロフィールを閉じる"
              className="absolute right-4 top-4 rounded-full border border-slate-200 bg-white p-2 text-slate-500 transition hover:bg-slate-100"
            >
              <span className="sr-only">Close</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M6.47 6.47a.75.75 0 0 1 1.06 0L12 10.94l4.47-4.47a.75.75 0 1 1 1.06 1.06L13.06 12l4.47 4.47a.75.75 0 0 1-1.06 1.06L12 13.06l-4.47 4.47a.75.75 0 0 1-1.06-1.06L10.94 12 6.47 7.53a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <div className="flex flex-col gap-8">
              <header className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-start sm:text-left">
                {about.icon && (
                  <div className="flex-shrink-0">
                    <Image
                      src={about.icon.url}
                      alt={about.name ?? "プロフィール"}
                      width={about.icon.width ?? 180}
                      height={about.icon.height ?? 180}
                      className="h-32 w-32 rounded-3xl object-cover sm:h-40 sm:w-40"
                    />
                  </div>
                )}
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">
                    About
                  </p>
                  <h2 className="text-3xl font-bold text-slate-900">{about.name}</h2>
                  {about.overview && <p className="text-sm text-slate-500">{about.overview}</p>}
                </div>
              </header>

              {descriptionContent && (
                <section className="border border-white/70 bg-white/95 p-6">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
                    Introduction
                  </h3>
                  <div className="mt-4 space-y-3 text-sm leading-relaxed text-slate-600 [&_a]:text-blue-600 [&_a]:underline [&_a]:underline-offset-2">
                    {descriptionContent}
                  </div>
                </section>
              )}

              {(workContentItems.length > 0 || workDescriptionContent) && (
                <section className="border border-white/70 bg-white/95 p-6 shadow-sm">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
                    Work & Services
                  </h3>
                  {workContentItems.length > 0 && (
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {workContentItems.map((item: string) => (
                        <li
                          key={item}
                          className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                  {workDescriptionContent && (
                    <div className="mt-5 space-y-3 text-sm leading-relaxed text-slate-600 [&_a]:text-blue-600 [&_a]:underline [&_a]:underline-offset-2">
                      {workDescriptionContent}
                    </div>
                  )}
                </section>
              )}

              {(about.overview || overviewDescContent) && (
                <section className="border border-white/70 bg-white/95 p-6 shadow-sm">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
                    Studio Info
                  </h3>
                  {about.overview && (
                    <p className="mt-3 text-sm font-medium text-slate-600">{about.overview}</p>
                  )}
                  {overviewDescContent && (
                    <div className="mt-4 space-y-3 text-sm leading-relaxed text-slate-600 [&_a]:text-blue-600 [&_a]:underline [&_a]:underline-offset-2">
                      {overviewDescContent}
                    </div>
                  )}
                </section>
              )}
            </div>
          </article>
        </div>
      )}
    </>
  );
}
