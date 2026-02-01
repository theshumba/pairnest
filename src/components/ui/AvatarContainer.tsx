import { ReactNode } from "react";

export default function AvatarContainer({ children }: { children: ReactNode }) {
  return (
    <div className="room">
      <div className="room-floor" />
      <div className="avatar-wrap">{children}</div>
    </div>
  );
}
