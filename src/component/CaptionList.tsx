"use client";

import { useEffect, useRef } from "react";
import CaptionItem from "@/component/CaptionItem";
import { VttCue } from "@/lib/parseVttToJson";
import { compareTimes } from "@/lib/util";

interface CaptionListProps {
  captions: VttCue[];
  currentTime: number;
}

export default function CaptionList({ captions, currentTime }: CaptionListProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const activeIndex = captions.findIndex((cue) => compareTimes(cue.start, cue.end, currentTime));

    if (activeIndex !== -1 && listRef.current && itemRefs.current[activeIndex]) {
      itemRefs.current[activeIndex]?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [currentTime, captions]);

  return (
    <div ref={listRef} className="flex flex-col gap-4 px-8 py-4 w-full h-full bg-gray-400/20">
      {captions.map((cue, index) => (
        <CaptionItem
          key={index}
          cue={cue}
          index={index}
          currentTime={currentTime}
          refElement={(element) => (itemRefs.current[index] = element)}
        />
      ))}
    </div>
  );
}
