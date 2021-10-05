// Function to take what Mr Server gives us and expand it so we may use it in Mr User Interface

function interpretTimeblocks(allData) {
  // TODO probably convert to preferred timezone at the start of this function

  /* 
For every timeblock, I want 
- Start and end moments --  day, hour, minute, second of each 
- Start and end moments -- fraction of day of each
- Category
  */

  // Extract information from allData

  const expandedData = allData.map((timeblock) => {
    let { category, elapsedTime, startTime, endTime, _id: id } = timeblock;
    // TODO need to account for something that begins and ends on different days

    startTime = new Date(startTime);
    endTime = new Date(endTime);

    const startYear = startTime.getFullYear();
    const startMonth = startTime.getMonth() + 1;
    const startDate = startTime.getDate();
    const startHour = startTime.getHours();
    const startMinute = startTime.getMinutes();
    const startSecond = startTime.getSeconds();
    const startDateSimple = startYear + "-" + startMonth + "-" + startDate;

    const endYear = endTime.getFullYear();
    const endMonth = endTime.getMonth() + 1;
    const endDate = endTime.getDate();
    const endHour = endTime.getHours();
    const endMinute = endTime.getMinutes();
    const endSecond = endTime.getSeconds();
    const endDateSimple = endYear + "-" + endMonth + "-" + endDate;

    const startFraction =
      startHour / 24 + startMinute / 24 / 60 + startSecond / 24 / 60 / 60;

    const endFraction =
      endHour / 24 + endMinute / 24 / 60 + endSecond / 24 / 60 / 60;

    // TODO multi-day will ruin this
    const elapsedFraction = endFraction - startFraction;

    const monthNumberWord = {
      1: "Jan",
      2: "Feb",
      3: "Mar",
      4: "Apr",
      5: "May",
      6: "Jun",
      7: "Jul",
      8: "Aug",
      9: "Sep",
      10: "Oct",
      11: "Nov",
      12: "Dec",
    };
    const startMonthWord = monthNumberWord[startMonth];
    const endMonthWord = monthNumberWord[endMonth];

    return {
      id,
      category,
      elapsedTime,
      startTime,
      endTime,
      startYear,
      startMonth,
      startMonthWord,
      startDate,
      startHour,
      startMinute,
      startSecond,
      startFraction,
      startDateSimple,
      endYear,
      endMonth,
      endMonthWord,
      endDate,
      endHour,
      endMinute,
      endSecond,
      endFraction,
      endDateSimple,
      elapsedFraction,
    };
  });
  return expandedData;
}

export default interpretTimeblocks;
