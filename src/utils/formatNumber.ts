export const formatNumber = (num: number): string => {
  if (num < 1000) {
    return Math.floor(num).toString();
  } else if (num < 1000000) {
    const k = num / 1000;
    return k % 1 === 0 ? `${k}K` : `${k.toFixed(1)}K`;
  } else if (num < 1000000000) {
    const m = num / 1000000;
    return m % 1 === 0 ? `${m}M` : `${m.toFixed(1)}M`;
  } else {
    const b = num / 1000000000;
    return b % 1 === 0 ? `${b}B` : `${b.toFixed(1)}B`;
  }
};