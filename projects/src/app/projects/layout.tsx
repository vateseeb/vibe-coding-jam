import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Vibe Coding Jam 2025",
  description: "Browse and vote for projects at Vibe Coding Jam 2025",
};

export default function ProjectsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="bg-gradient-to-r from-purple-600/10 to-blue-600/10 py-6 mb-8 border-b border-foreground/10">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">Vibe Coding Jam Projects</h1>
        </div>
      </div>
      {children}
    </>
  );
}
