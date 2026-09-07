export default function ProductsLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="h-8 w-48 bg-border/30 animate-pulse mb-4" />
      <div className="h-4 w-64 bg-border/30 animate-pulse mb-10" />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="border border-border bg-card">
            <div className="aspect-square bg-border/20 animate-pulse" />
            <div className="p-4 space-y-2">
              <div className="h-3 w-16 bg-border/30 animate-pulse" />
              <div className="h-5 w-full bg-border/30 animate-pulse" />
              <div className="h-4 w-20 bg-border/30 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
