/**
 * VTT 파일을 JSON 형식으로 변환
 * @param {string} vttString VTT 파일의 문자열
 * @returns {Array} JSON 형식의 캡션 데이터
 */
function parseVttToJson(vttString) {
  const lines = vttString.split(/\r?\n/);
  const cues = [];

  let cue = {};
  let textLines = [];
  let collectingText = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line === '' || line === 'WEBVTT' || /^\d+$/.test(line)) {
      continue;
    }

    if (line.includes('-->')) {
      if (cue.start && cue.end && textLines.length > 0) {
        const fullText = textLines.join(' ').trim();
        const parsed = parseText(fullText);
        cues.push({
          start: stripMilliseconds(cue.start),
          end: stripMilliseconds(cue.end),
          ...parsed
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
      ...parsed
    });
  }

  return cues;
}

/**
 * 큐 데이터 텍스트 파싱
 * @param {string} text
 * @returns {{ name?: string, message: string }}
 */
function parseText(text) {
  const match = text.match(/^([^:]+):\s*(.+)$/);
  if (match) {
    return {
      name: match[1].trim(),
      message: match[2].trim()
    };
  }
  return { message: text };
}

/**
 * 타임스탬프에서 밀리초 제거
 * @param {string} timestamp
 * @returns {string}
 */
function stripMilliseconds(timestamp) {
  return timestamp.split('.')[0];
}

/**
 * 시간 문자열을 초 단위 숫자로 변환
 * @param {string} time
 * @returns {number}
 */
function timeStringToSeconds(time) {
  const [hours, minutes, seconds] = time.split(":").map(Number);
  return hours * 3600 + minutes * 60 + seconds;
}

/**
 * 시간 비교
 * @param {string} time1
 * @param {string} time2
 * @param {number} currentTime
 * @returns {boolean}
 */
function compareTimes(time1, time2, currentTime) {
  const seconds1 = timeStringToSeconds(time1);
  const seconds2 = timeStringToSeconds(time2);
  return seconds1 <= currentTime && seconds2 >= currentTime;
}

// CommonJS or browser export
if (typeof module !== 'undefined') {
  module.exports = {
    parseVttToJson,
    stripMilliseconds,
    timeStringToSeconds,
    compareTimes
  };
}
