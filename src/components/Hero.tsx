
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
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-primary transition-colors duration-300 mb-4">Juggler and Geographer</h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-primary transition-colors duration-300 font-light">Kanoa Lindiwe</p>
        </div>
      </div>
    </div>;
}
