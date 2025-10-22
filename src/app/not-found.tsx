import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-3xl flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="text-4xl font-bold text-slate-900 dark:text-white">ページが見つかりません</h1>
      <p className="text-sm text-slate-600 dark:text-slate-300">
        指定されたコンテンツは存在しないか、公開されていません。
      </p>
      <Link
        href="/"
        className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
      >
        トップページに戻る
      </Link>
    </div>
  );
}
