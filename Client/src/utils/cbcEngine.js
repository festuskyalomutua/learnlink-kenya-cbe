// cbcEngine.js

export const classifyCBCLevel = (score) => {
  if (score >= 80) return "Exceeding Expectations";
  if (score >= 50) return "Meeting Expectations";
  return "Below Expectations";
};

export const autoGrade = (studentAnswer, keywordsCsv) => {
  const keywords = keywordsCsv.toLowerCase().split(",").map(k => k.trim());
  const answer = studentAnswer.toLowerCase();

  let hits = 0;
  keywords.forEach((k) => {
    if (answer.includes(k)) hits++;
  });

  return Math.round((hits / keywords.length) * 100);
};
