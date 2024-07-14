export const adjustDaysForUTC = (localDateTime, selectedDays) => {
    const localDate = new Date(localDateTime);
    const utcDate = new Date(localDate.toISOString());
    
    const localOffset = localDate.getDay();
    const utcOffset = utcDate.getUTCDay();
    const offsetDiff = utcOffset - localOffset;
    
    const adjustedDays = selectedDays.map(day => (day + offsetDiff + 7) % 7);
    
    return adjustedDays;
  };