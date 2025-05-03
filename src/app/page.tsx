import AudioCaptionPlayer from "@/component/AudioCaptionPlayer";
import Header from "@/component/Header";

const {
  NEXT_PUBLIC_AUDIO_URL: audioUrl = "",
  NEXT_PUBLIC_CAPTION_URL: captionUrl = "",
} = process.env;

export default function Home() { 
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <main className="relative flex flex-col mx-auto w-full md:w-160 h-full">
        <Header />
        <div className="flex flex-col justify-center items-center gap-4 pt-16 w-full h-full">
          <AudioCaptionPlayer audioUrl={audioUrl} captionUrl={captionUrl} />
        </div>
      </main>
    </div>
  );
}
