export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 w-full border-t border-slate-200 bg-white/70 px-6 py-8 backdrop-blur dark:border-slate-700 dark:bg-slate-900/70">
      <div className="mx-auto max-w-6xl text-center text-sm text-slate-500 dark:text-slate-400">
        &copy; {year} Mochiki Studio. All rights reserved.
      </div>
    </footer>
  );
}
