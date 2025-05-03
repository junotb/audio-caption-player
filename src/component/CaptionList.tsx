"use client";

import { useEffect, useMemo, useRef } from "react";
import CaptionItem from "@/component/CaptionItem";
import { VttCue } from "@/lib/parseVttToJson";
import { compareTimes } from "@/lib/util";

/**
 * @description 자막 목록 컴포넌트
 * @param captions - 자막 목록
 * @param currentTime - 현재 시간
 */
interface CaptionListProps {
  captions: VttCue[];
  currentTime: number;
}

export default function CaptionList({ captions, currentTime }: CaptionListProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // currentTime에 해당하는 자막 인덱스 계산
  const activeIndex = useMemo(
    () => captions.findIndex((cue) => compareTimes(cue.start, cue.end, currentTime)),
    [currentTime, captions]
  );

  // 현재 자막으로 스크롤 이동
  useEffect(() => {
    if (activeIndex !== -1) {
      itemRefs.current[activeIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [activeIndex]);

  return (
    <div ref={listRef} className="flex flex-col gap-4 px-8 py-4 w-full h-full">
      {captions.map((cue, index) => {
        const showName = index === 0 || captions[index - 1].name !== cue.name;

        return (
          <CaptionItem
            key={index}
            cue={cue}
            showName={showName}
            currentTime={currentTime}
            refElement={(element) => (itemRefs.current[index] = element)}
          />
        );
      })}
    </div>
  );
}
