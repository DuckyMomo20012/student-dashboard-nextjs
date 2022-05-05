export function consecutiveInsert(dup, base, delimiter, startIdx = 1) {
  if (dup.length === 0) return base;
  const result = base + delimiter;
  const dupIdx = dup.flatMap((item) => {
    const idx = parseInt(item.split(delimiter)[1], 10);
    if (!idx) return [];
    return [idx];
  });
  if (dupIdx.length === 0 && dup.find((item) => item === base))
    return result + 1;
  const max = Math.max(...dupIdx);
  if (+startIdx > max) return result + +startIdx;
  for (let i = +startIdx; i < max; i += 1) {
    if (!dupIdx.includes(i)) {
      return result + i;
    }
  }
  return result + (max + 1);
}
