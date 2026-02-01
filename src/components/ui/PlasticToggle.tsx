"use client";

import * as Switch from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

interface PlasticToggleProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  variant?: "pink" | "cyan";
}

export const PlasticToggle = ({
  checked,
  onCheckedChange,
  variant = "pink",
}: PlasticToggleProps) => {
  return (
    <Switch.Root
      checked={checked}
      onCheckedChange={onCheckedChange}
      className={cn(
        "w-16 h-8 bg-black/50 rounded-full border-2 border-white/30 relative shadow-inner data-[state=checked]:bg-white/20 transition-colors",
        "focus:outline-none focus:shadow-[0_0_10px_white]"
      )}
    >
      <Switch.Thumb
        className={cn(
          "block w-8 h-8 bg-gradient-to-b rounded-full shadow-md border-2 border-white transition-transform duration-100 translate-x-[-2px] will-change-transform data-[state=checked]:translate-x-[30px]",
          variant === "pink"
            ? "from-plastic-pink to-plastic-pinkDark shadow-[0_4px_0_#99007A]"
            : "from-plastic-cyan to-plastic-cyanDark shadow-[0_4px_0_#009999]"
        )}
      />
    </Switch.Root>
  );
};
