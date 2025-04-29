"use client";

import { useEffect, useRef, useState } from "react";
import { parseVttToJson, VttCue } from "@/lib/parseVttToJson";
import axios from "axios";
import Image from "next/image";
import CaptionList from "@/component/CaptionList";

/**
 * @description 자막과 오디오를 함께 재생하는 컴포넌트
 * @param audioUrl - 오디오 파일의 URL
 * @param captionUrl - 자막 파일의 URL
 */
interface AudioCaptionPlayerProps {
  audioUrl: string,
  captionUrl: string,
}

export default function AudioCaptionPlayer({ audioUrl, captionUrl }: AudioCaptionPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [captions, setCaptions] = useState<VttCue[]>([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // 자막 파일을 가져오고 파싱
  useEffect(() => {
    const fetchCaption = async () => {
      setIsLoading(true);

      // 자막 파일 가져오기
      const captionData = await axios.get(captionUrl).then(response => response.data);

      // 자막 파일 파싱
      setCaptions(parseVttToJson(captionData));

      setIsLoading(false);
    };
    
    fetchCaption();
  }, [captionUrl]);

  useEffect(() => {
    // 오디오 파일 가져오기
    const audio = audioRef.current;
    if (!audio || captions.length === 0) return;

    // 오디오 파일 시간 업데이트 이벤트 처리
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => audio.removeEventListener("timeupdate", handleTimeUpdate);
  }, [captions]);
  
  // 자막 파일이 없을 경우 오류 메시지 반환
  if (!audioUrl || !captionUrl) {
    return (
      <div className="flex flex-col justify-center items-center gap-4 w-full h-full">
        <h1 className="text-2xl font-bold text-center">
          오디오 또는 자막 파일을 찾을 수 없습니다.<br />
          환경 변수를 다시 확인해 주세요.
        </h1>
      </div>

    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center gap-4 w-full h-full">
        <Image src="/loader.svg" alt="loading" width={100} height={100} className="bg-white rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full bg-gray-400/10 rounded-2xl shadow-2xl">
      <div className="flex flex-col w-full h-full overflow-y-auto scrollbar-apple">
        <CaptionList captions={captions} currentTime={currentTime} />
      </div>
      <div className="flex flex-col justify-center items-center gap-4 px-8 w-full h-20">
        <audio ref={audioRef} controls>
          <source src={audioUrl} type="audio/mpeg" />
        </audio>
      </div>
    </div>
  );
}