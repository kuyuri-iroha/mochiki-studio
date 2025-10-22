import { getAbout } from "@/lib/microcms";
import AboutOverlay from "./AboutOverlay";

export default async function Header() {
  const about = await getAbout();

  return (
    <header className="relative w-full px-6 py-6">
      <AboutOverlay about={about} />
      <div className="mx-auto flex max-w-6xl items-center justify-center">
        <span className="text-xl font-semibold tracking-wide text-slate-900 dark:text-slate-100">
          Mochiki Studio
        </span>
      </div>
    </header>
  );
}
