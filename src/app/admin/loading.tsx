export default function AdminLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="h-8 w-48 bg-border/30 animate-pulse mb-8" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-card border border-border p-6">
            <div className="h-4 w-24 bg-border/30 animate-pulse mb-2" />
            <div className="h-8 w-16 bg-border/30 animate-pulse" />
          </div>
        ))}
      </div>
      <div className="bg-card border border-border p-6">
        <div className="h-6 w-40 bg-border/30 animate-pulse mb-4" />
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-12 w-full bg-border/30 animate-pulse mb-2" />
        ))}
      </div>
    </div>
  );
}
