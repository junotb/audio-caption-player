import { stripMilliseconds } from "@/lib/util";

// vtt 파일의 큐 데이터
export type VttCue = {
  start: string;
  end: string;
  name?: string;
  message: string;
};

/**
 * VTT 파일을 JSON 형식으로 변환
 * @param vttString VTT 파일의 문자열
 * @returns JSON 형식의 캡션 데이터
 * 
 * vtt 파일의 큐 예시
 * 1
 * 00:00:47.850 --> 00:00:48.485
 * English Tutor: Hello!
 * 
 * 큐 예시를 파싱하면 다음과 같은 결과가 나옵니다.
 * start = 00:47
 * end = 00:48
 * message = "English Tutor: Hello!"
 */
export function parseVttToJson(vttString: string): VttCue[] {
  const lines = vttString.split(/\r?\n/);
  const cues: VttCue[] = [];

  let cue: Partial<VttCue> = {};
  let textLines: string[] = [];
  let collectingText = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // 빈 라인과 헤더는 무시
    if (line === '' || line === 'WEBVTT' || /^\d+$/.test(line)) {
      continue;
    }

    // 타임 큐 라인
    if (line.includes('-->')) {
      // 이전 큐가 존재하고 텍스트 라인이 있으면 큐를 추가
      if (cue.start && cue.end && textLines.length > 0) {
        const fullText = textLines.join(' ').trim();
        const parsed = parseText(fullText);
        cues.push({
          start: stripMilliseconds(cue.start),
          end: stripMilliseconds(cue.end),
          ...parsed,
        });
        cue = {};
        textLines = [];
      }

      const [start, end] = line.split('-->').map(s => s.trim());
      cue.start = start;
      cue.end = end;
      collectingText = true;
    } else if (collectingText) {
      textLines.push(line);
    }
  }

  // 마지막 큐 저장
  if (cue.start && cue.end && textLines.length > 0) {
    const fullText = textLines.join(' ').trim();
    const parsed = parseText(fullText);
    cues.push({
      start: stripMilliseconds(cue.start),
      end: stripMilliseconds(cue.end),
      ...parsed,
    });
  }

  return cues;
}

/**
 * 큐 데이터의 텍스트를 파싱
 * @param text 큐 데이터의 텍스트
 * @returns 큐 데이터의 텍스트
 */
function parseText(text: string): { name?: string; message: string } {
  const match = text.match(/^([^:]+):\s*(.+)$/);
  if (match) {
    return {
      name: match[1].trim(),
      message: match[2].trim(),
    };
  }
  return { message: text };
}