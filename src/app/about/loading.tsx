export default function AboutLoading() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      <div className="glass-panel rounded-3xl p-10 md:p-12 animate-pulse">
        <div className="flex flex-col md:flex-row gap-10 items-start">
          <div className="w-48 h-48 rounded-3xl bg-muted/20 shrink-0" />
          <div className="w-full space-y-4">
            <div className="h-4 w-20 bg-muted/20 rounded" />
            <div className="h-10 w-64 bg-muted/20 rounded" />
            <div className="space-y-3 pt-4">
              <div className="h-4 bg-muted/20 rounded w-full" />
              <div className="h-4 bg-muted/20 rounded w-full" />
              <div className="h-4 bg-muted/20 rounded w-3/4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
