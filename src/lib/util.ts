/**
 * 타임 큐 데이터에서 밀리초를 제거
 * @param timestamp 타임 큐 데이터
 * @returns 타임 큐 데이터
 */
export function stripMilliseconds(timestamp: string): string {
  return timestamp.split('.')[0];
}

/**
 * 타임 큐 데이터를 초로 변환
 * @param time 타임 큐 데이터
 * @returns 초
 */
export function timeStringToSeconds(time: string): number {
  const [hours, minutes, seconds] = time.split(":").map(Number);
  return hours * 3600 + minutes * 60 + seconds;
}

/**
 * 타임 큐 데이터를 비교
 * @param time1 타임 큐 데이터
 * @param time2 타임 큐 데이터
 * @param currentTime 현재 시간
 * @returns 비교 결과
 */
export function compareTimes(time1: string, time2: string, currentTime: number): boolean {
  const seconds1 = timeStringToSeconds(time1);
  const seconds2 = timeStringToSeconds(time2);
  return seconds1 <= currentTime && seconds2 >= currentTime;
}