export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center">
      <div className="w-16 h-16 border-4 border-muted border-t-foreground rounded-full animate-spin" />
      <p className="mt-4 text-muted-foreground">読み込み中...</p>
    </div>
  );
}
