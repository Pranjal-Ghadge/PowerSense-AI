export const calculateDeviation = (actual, predicted) => {
  if (!predicted) return 0;
  return (((actual - predicted) / predicted) * 100).toFixed(2);
};

export const classifyAnomaly = (deviation) => {
  const abs = Math.abs(deviation);
  if (abs >= 20) return "HIGH";
  if (abs >= 10) return "MEDIUM";
  return "LOW";
};
