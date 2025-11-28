import React from 'react';

interface LogoProps {
  title: string;
  subtitle?: string;
}

const Logo: React.FC<LogoProps> = ({ title, subtitle }) => {
  return (
    <div className="h-full w-full bg-zinc-900 rounded-3xl border border-zinc-800 flex flex-col items-center justify-center shadow-2xl p-6 relative overflow-hidden group text-center">
      {/* Background decorative glow */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-500/10 to-transparent opacity-50"></div>
      
      {/* Dynamic Title Display */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
        <h1 
          key={title} // Key change triggers animation on new title
          className="font-serif text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold text-white tracking-wide leading-tight animate-fadeIn"
        >
          {title}
        </h1>
        
        {/* Separator Line */}
        <div className="h-1 w-20 bg-amber-500 my-4 rounded-full opacity-80"></div>
        
        {/* Subtitle Display */}
        {subtitle && (
           <p 
             key={`sub-${title}`} // Re-trigger animation when text changes
             className="text-zinc-400 text-base md:text-lg font-light leading-snug max-w-[90%] animate-fadeIn"
           >
             {subtitle}
           </p>
        )}
      </div>
    </div>
  );
};

export default Logo;