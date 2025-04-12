
import { useEffect, useState } from 'react';
export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, []);
  return <div className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90 z-10" />
      
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center" style={{
      backgroundImage: 'url(/lovable-uploads/c4b4cadc-02a7-4cb7-9499-3f96904cd512.png)',
      opacity: loaded ? 1 : 0,
      transition: 'opacity 1s ease-in-out'
    }} />
      
      {/* Hero Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center z-20">
        <div className={`transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4">Kanoa Lindiwe</h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-primary font-light">Juggler and Geographer</p>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-col items-center">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center p-1">
            <div className="w-1.5 h-3 bg-white/80 rounded-full animate-bounce" />
          </div>
          <span className="text-white/70 text-sm mt-2">Scroll</span>
        </div>
      </div>
    </div>;
}
