import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RpgPanelProps {
  children: ReactNode;
  className?: string;
  title?: string;
  footer?: ReactNode;
  glowing?: boolean;
}

export const RpgPanel = ({ children, className, title, footer, glowing }: RpgPanelProps) => {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[2rem] border-[3px] border-white/30 bg-[#1A0526]/80 backdrop-blur-xl",
        "shadow-plastic-card transition-all duration-300",
        glowing && "border-plastic-cyan/60 shadow-neon-glow",
        className
      )}
    >
      <div className="absolute top-3 left-3 h-2 w-2 rounded-full bg-white/30" />
      <div className="absolute top-3 right-3 h-2 w-2 rounded-full bg-white/30" />
      <div className="absolute bottom-3 left-3 h-2 w-2 rounded-full bg-white/30" />
      <div className="absolute bottom-3 right-3 h-2 w-2 rounded-full bg-white/30" />

      {title && (
        <div className="relative z-10 border-b-2 border-white/10 bg-black/20 px-6 py-3 flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-plastic-lime animate-pulse" />
          <h3 className="font-data text-xl text-plastic-cyan uppercase tracking-widest text-glow">
            {title}
          </h3>
        </div>
      )}

      <div className="relative z-10 p-5">{children}</div>

      {footer && (
        <div className="relative z-10 border-t-2 border-white/10 bg-black/20 px-6 py-3">
          {footer}
        </div>
      )}

      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.18)_50%),linear-gradient(90deg,rgba(255,0,0,0.04),rgba(0,255,0,0.02),rgba(0,0,255,0.04))] bg-[length:100%_4px,3px_100%] opacity-20" />
    </div>
  );
};

export default RpgPanel;
