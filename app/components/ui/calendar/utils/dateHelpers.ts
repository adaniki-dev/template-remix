export const getWeekDays = (date: Date): Date[] => {
  const day = date.getDay();
  const diff = date.getDate() - day;
  const weekStart = new Date(date.setDate(diff));

  return Array(7)
    .fill(null)
    .map((_, i) => {
      const nextDay = new Date(weekStart);
      nextDay.setDate(weekStart.getDate() + i);
      return nextDay;
    });
};

export const getHours = () => {
  return Array(24)
    .fill(null)
    .map((_, i) => {
      return `${String(i).padStart(2, '0')}:00`;
    });
};
