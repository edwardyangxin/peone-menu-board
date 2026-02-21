import React from 'react';

interface LogoProps {
  title: string;
  subtitle?: string;
}

const Logo: React.FC<LogoProps> = ({ title, subtitle }) => {
  // Helper to determine title font size based on character count
  // Significantly increased sizes to fill the 20vh container
  const getTitleSizeClass = (text: string) => {
    const len = text.length;
    if (len <= 10) return "text-[7vh] leading-[0.95]";
    if (len <= 20) return "text-[5.2vh] leading-[0.95]";
    if (len <= 35) return "text-[4.2vh] leading-[1.0]";
    return "text-[3.3vh] leading-[1.05]";
  };

  // Helper to determine subtitle font size
  const getSubtitleSizeClass = (text: string) => {
    const len = text.length;
    if (len <= 25) return "text-[2.5vh]";
    if (len <= 50) return "text-[2vh]";
    return "text-[1.8vh]";
  };

  return (
    <div className="h-full w-full bg-gradient-to-br from-[#b50f1a] via-[#980d17] to-[#6f0a12] rounded-3xl border border-[#f3c453]/70 flex flex-col items-center justify-center shadow-2xl px-[1vh] py-[1vh] relative overflow-hidden group text-center">
      <div className="absolute top-0 left-0 w-full h-[0.9vh] bg-gradient-to-r from-[#ffde7a] via-[#f9c62b] to-[#ffde7a]"></div>
      {/* Background decorative glow */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-200/18 to-transparent opacity-60"></div>
      
      {/* Dynamic Title Display */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full w-full min-h-0">
        <h1 
          key={title} // Key change triggers animation on new title
          className={`font-serif font-bold text-white tracking-wide animate-fadeIn break-words w-full max-h-[65%] overflow-hidden ${getTitleSizeClass(title)}`}
        >
          {title}
        </h1>
        
        {/* Separator Line - Reduced margins to save vertical space */}
        <div className="h-[0.45vh] w-[8vh] bg-[#f9c62b] my-[1vh] rounded-full shrink-0"></div>
        
        {/* Subtitle Display */}
        {subtitle && (
           <p 
             key={`sub-${title}`} // Re-trigger animation when text changes
             className={`text-[#ffe8c7]/90 font-medium leading-[1.15] max-w-[98%] max-h-[24%] overflow-hidden animate-fadeIn ${getSubtitleSizeClass(subtitle)}`}
           >
             {subtitle}
           </p>
        )}
      </div>
    </div>
  );
};

export default Logo;
