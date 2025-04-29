"use client";

import clsx from "clsx";
import { VttCue } from "@/lib/parseVttToJson";
import { compareTimes } from "@/lib/util";

interface CaptionItemProps {
  cue: VttCue;
  index: number;
  currentTime: number;
  refElement: (element: HTMLDivElement | null) => void;
}

export default function CaptionItem({ cue, index, currentTime, refElement }: CaptionItemProps) {
  const isActive = compareTimes(cue.start, cue.end, currentTime);
  const isMe = index % 2 === 1;

  return (
    <div
      ref={refElement}
      className={clsx("flex justify-start gap-2", {
        "flex-row": !isMe,
        "flex-row-reverse": isMe,
      })}
    >
      <div
        className={clsx("flex flex-col p-4 rounded-lg shadow-xl max-w-2/3", {
          "bg-white text-black": !isMe && !isActive,
          "bg-black text-white": isMe && !isActive,
          "bg-sky-500 text-white": isActive,
          "rounded-tl-none": !isMe,
          "rounded-tr-none": isMe,
        })}
      >
        <span className="text-md">{cue.message}</span>
      </div>
      <div className="flex flex-col justify-end text-gray-500">
        <span className="text-sm">{cue.start} ~ {cue.end}</span>
      </div>
    </div>
  );
}
