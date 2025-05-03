"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
  const [error, setError] = useState<string | null>(null);

  // 자막 파일 가져오기
  const fetchCaptions = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const { data } = await axios.get(captionUrl);
      setCaptions(parseVttToJson(data));
    } catch (error) {
      console.error("자막 파일을 불러오는 데 실패했습니다.", error);
      setError("자막 파일을 불러오는 데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  }, [captionUrl]);

  // 자막 파일 가져오기
  useEffect(() => {
    if(captionUrl) {
      fetchCaptions();
    }
  }, [captionUrl, fetchCaptions]);

  // 오디오 파일 시간 업데이트 이벤트 처리
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [captions]);
  
  // 오디오 또는 자막 파일이 없을 경우 오류 메시지 반환
  if (!audioUrl || !captionUrl) {
    return <ErrorMessage message="오디오 또는 자막 파일을 찾을 수 없습니다. 환경 변수를 다시 확인해 주세요." />
  }

  // 오류 메시지 반환
  if (error) {
    return <ErrorMessage message={error} />;
  }

  // 로딩 중일 경우 로딩 이미지 반환
  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center gap-4 w-full h-full">
        <Image
          src="/loader.svg"
          alt="loading"
          width={100}
          height={100}
          className="bg-white animate-spin"
        />
      </div>
    );
  }

  // 자막 목록 반환
  return (
    <div className="flex flex-col w-full h-full bg-gray-400/10 shadow-xl">
      <div className="flex flex-col w-full h-full bg-gray-400/20 overflow-y-auto scrollbar-apple">
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

function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="flex flex-col justify-center items-center gap-4 w-full h-full">
      <h1 className="text-2xl font-bold text-center text-red-600">
        {message}
      </h1>
    </div>
  );
}