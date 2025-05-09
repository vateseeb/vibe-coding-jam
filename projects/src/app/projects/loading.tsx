/**
 * Loading state for projects page
 */
export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center justify-center mb-12 text-center">
        <div className="h-12 w-2/3 bg-foreground/10 rounded-lg animate-pulse mb-4"></div>
        <div className="h-6 w-1/2 bg-foreground/10 rounded-lg animate-pulse"></div>
      </div>
      
      <div className="mb-8">
        <div className="h-10 max-w-md mx-auto bg-foreground/10 rounded-lg animate-pulse mb-4"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="h-64 bg-foreground/5 rounded-lg border border-foreground/10 p-6 flex flex-col">
              <div className="h-6 bg-foreground/10 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-foreground/10 rounded w-full mb-2"></div>
              <div className="h-4 bg-foreground/10 rounded w-full mb-2"></div>
              <div className="h-4 bg-foreground/10 rounded w-2/3 mb-4"></div>
              <div className="flex flex-wrap gap-2 mt-auto">
                <div className="h-6 w-16 bg-foreground/10 rounded-full"></div>
                <div className="h-6 w-20 bg-foreground/10 rounded-full"></div>
                <div className="h-6 w-14 bg-foreground/10 rounded-full"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
