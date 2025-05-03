"use client";

import clsx from "clsx";
import { VttCue } from "@/lib/parseVttToJson";
import { compareTimes } from "@/lib/util";

/**
 * @description 자막 아이템 컴포넌트
 * @param cue - 자막 아이템
 * @param currentTime - 현재 시간
 * @param refElement - 자막 아이템 요소
 * @param showName - 이름 표시 여부
 */
interface CaptionItemProps {
  cue: VttCue;
  currentTime: number;
  refElement: (element: HTMLDivElement | null) => void;
  showName: boolean;
}

const name = process.env.NEXT_PUBLIC_NAME;

export default function CaptionItem({
  cue,
  currentTime,
  refElement,
  showName,
}: CaptionItemProps) {
  // 현재 자막 활성화 여부 확인
  const isActive = compareTimes(cue.start, cue.end, currentTime);

  // 이름 표시 여부 확인
  const isUser = cue.name === name;

  return (
    <div className="flex flex-col gap-2">
      {showName && (
        <span
          className={clsx("text-sm font-semibold", {
            "text-left": !isUser,
            "text-right": isUser,
          })}
        >
          {cue.name}
        </span>
      )}

      <div
        ref={refElement}
        className={clsx("flex justify-start gap-2", {
          "flex-row": !isUser,
          "flex-row-reverse": isUser,
        })}
      >
        <div
          className={clsx(
            "flex flex-col p-4 rounded-xl shadow-xl max-w-2/3 transition-colors duration-300 ease-in-out", {
              "bg-white text-black": !isUser && !isActive,
              "bg-black text-white": isUser && !isActive,
              "bg-sky-500 text-white animate-pulse": isActive,
              "rounded-tl-none": !isUser,
              "rounded-tr-none": isUser,
            }
          )}
        >
          <span className="text-md">{cue.message}</span>
        </div>

        <span className="self-end text-sm text-gray-500">{cue.start}</span>
      </div>
    </div>
  );
}
