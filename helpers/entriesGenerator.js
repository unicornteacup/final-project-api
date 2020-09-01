const fs = require('fs');

userSeedsGenerator = (times) => {
  let array = [];
  let num = 1;
  let random1 = Math.floor(Math.random() * Math.floor(11));
  let random2 = Math.floor(Math.random() * Math.floor(11));
  let random3 = Math.floor(Math.random() * Math.floor(11));
  let random4 = Math.floor(Math.random() * Math.floor(11));
  let random5 = Math.floor(Math.random() * Math.floor(11));

  while (num < times) {
    let entry = `
      INSERT INTO pass_entries (date, status, trail_id, visitor_id) 
      VALUES ('29-Aug-2020', 'Success', '${random1+1}','${num}');
      INSERT INTO pass_entries (date, status, trail_id, visitor_id) 
      VALUES ('04-Sep-2020', 'Declined', '${random2+1}','${num}');
      INSERT INTO pass_entries (date, status, trail_id, visitor_id) 
      VALUES ('13-Sep-2020', 'Declined', '${random3+1}','${num}');
      INSERT INTO pass_entries (date, status, trail_id, visitor_id) 
      VALUES ('18-Sep-2020', 'Success', '${random4+1}','${num}');
      INSERT INTO pass_entries (date, status, trail_id, visitor_id) 
      VALUES ('25-Sep-2020', 'Success', '${random5+1}','${num}');`
    array += entry;
    num++;
  }
  return array;
}

fs.writeFile('./db/seeds/pass_entries_2.sql', userSeedsGenerator(250), (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
});