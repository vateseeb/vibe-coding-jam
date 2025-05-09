import Link from "next/link";
import { AnimatedBackground } from "../components/AnimatedBackground";

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] overflow-hidden">
      {/* Background animation */}
      <AnimatedBackground />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 py-16 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
          Vibe Coding Jam 2025
        </h1>
        
        <p className="mb-8 text-lg md:text-xl max-w-2xl text-foreground/70">
          Explore amazing projects, learn new technologies, and vote for your favorites at this year&apos;s biggest coding event.
        </p>
        
        <Link 
          href="/projects" 
          className="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium text-white bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg group transition-all duration-300 ease-out hover:scale-105 hover:shadow-xl"
        >
          <span className="relative">View All Projects</span>
        </Link>
      </div>
      
      {/* Feature highlights */}
      <div className="relative z-10 container mx-auto px-4 py-16 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            title="Discover" 
            description="Explore innovative projects created during the Vibe Coding Jam" 
          />
          <FeatureCard 
            title="Learn" 
            description="Gain insights into cutting-edge technologies and development techniques" 
          />
          <FeatureCard 
            title="Vote" 
            description="Support your favorite projects and help recognize amazing work" 
          />
        </div>
      </div>
    </div>
  );
}

type FeatureCardProps = {
  title: string;
  description: string;
};

function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <div className="bg-foreground/5 backdrop-blur-sm rounded-xl p-6 border border-foreground/10">
      <h3 className="text-xl font-bold mb-2 text-primary">{title}</h3>
      <p className="text-foreground/70">{description}</p>
    </div>
  );
}
