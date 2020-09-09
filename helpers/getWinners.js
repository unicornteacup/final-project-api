const winners = (entries, resultEntries) => {
  //lottery is true if we have more users then resultUsers
  if (entries < resultEntries) return entries;

  let count = 0;
  //defining oldArray, because of splice, it will mutate initial state
  let oldArray = entries;
  let newArray = [];
  while (count < resultEntries) {
    //lottery itself :)
    const randomIndex = Math.floor(Math.random() * Math.floor(resultEntries));
    // because of mutation we can get undefined
    if (oldArray[randomIndex] !== undefined) {
      // updateWinners(oldArray[randomIndex])

      newArray.push(oldArray[randomIndex]);


      oldArray.splice(randomIndex, 1)
      count++;
    }
  }
  // oldArray.map((entry) => {
  //   // updateLosers(entry);
  // })
  return newArray;
}

module.exports = { winners };