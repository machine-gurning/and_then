async function getTimeBlocks() {
  // Get timeblocks
  const URL = "api/v1/timeblocks";
  const data = await fetch(URL);
  const allData = await data.json();
  console.log(allData);

  return allData;
}

export default getTimeBlocks;
