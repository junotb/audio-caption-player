# Audio-Caption 플레이어

오디오 재생과 자막을 동기화하는 플레이어입니다.

## 주요 기능

- 🎵 오디오와 자막 동기화 재생
- 📝 실시간 자막 표시
- 👤 발화자 식별
- 🎯 활성 자막 하이라이트

## 기술 스택

- **프레임워크**: Next.js 15.3.1
- **언어**: TypeScript
- **UI**: Tailwind CSS
- **상태 관리**: React Hooks
- **HTTP 클라이언트**: Axios

## 프로젝트 구조

```
audio-caption-player/
├── src/
│   ├── component/
│   │   ├── AudioCaptionPlayer.tsx
│   │   ├── CaptionList.tsx
│   │   └── CaptionItem.tsx
│   ├── lib/
│   │   ├── parseVttToJson.ts
│   │   └── util.ts
│   └── app/
│       └── page.tsx
├── public/
├── package.json
└── README.md
```

## 사용 방법

애플리케이션은 두 가지 주요 입력이 필요합니다:
1. NEXT_PUBLIC_AUDIO_URL - 오디오 URL (M4A 형식)
2. NEXT_PUBLIC_CAPTION_URL - URL (VTT 형식)
3. NEXT_PUBLIC_NAME - 사용자명

플레이어는 자동으로 오디오 재생과 자막을 동기화하며, 현재 자막을 하이라이트하고 보기 좋은 위치로 스크롤합니다.

## 데모

![Audio-Caption 플레이어 데모](public/audio-caption-player-demo.gif)