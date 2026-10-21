import { useEffect, useState } from "react";
import { isMuted, setMuted } from "../lib/sfx";

export function useSfxMuted() {
  const [muted, setMutedState] = useState(() => isMuted());

  useEffect(() => {
    setMuted(muted);
  }, [muted]);

  return [muted, setMutedState];
}
