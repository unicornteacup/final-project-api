const { updateEntry } = require('../services/updateEntries');

const processWinners = (db, entries, resultEntries) => new Promise((resolve, reject) => {
  // console.log('winner', entries, resultEntries)
  //lottery is true if we have more users then resultUsers
  let updateEntries = [];
  if (entries.length < resultEntries) {
    entries.map((entry) => {
      updateEntries.push(updateEntry(db, 'Success', entry.id))
    })
  } else {
      let count = 0;
      //defining oldArray, because of splice, it will mutate initial state
      let oldArray = entries;
      let newArray = [];
      while (count < resultEntries) {
        //lottery itself :)
        const randomIndex = Math.floor(Math.random() * Math.floor(resultEntries));
        // because of mutation we can get undefined
        if (oldArray[randomIndex] !== undefined) {
    
          updateEntries.push(updateEntry(db, 'Success', oldArray[randomIndex].id))
    
          newArray.push(oldArray[randomIndex]);
    
    
          oldArray.splice(randomIndex, 1)
          count++;
        }
      }
      oldArray.map((entry) => {
        updateEntries.push(updateEntry(db, 'Declined', entry.id))
      })
  }
  
  Promise.all(updateEntries)
  .then(() => {
    resolve()
  })
  .catch(() => {
    reject()
  })
})

module.exports = { processWinners };