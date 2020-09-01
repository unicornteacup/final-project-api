const fs = require('fs');

userSeedsGenerator = (times) => {
  let array = [];
  let num = 1;
  while (num < times) {
    let entry = `
      INSERT INTO pass_entries (date, status, visitor_id) 
      VALUES ('29-Aug-2020', 'Success', '${num}');
      INSERT INTO pass_entries (date, status, visitor_id) 
      VALUES ('04-Sep-2020', 'Declined', '${num}');
      INSERT INTO pass_entries (date, status, visitor_id) 
      VALUES ('13-Sep-2020', 'Success', '${num}');
      INSERT INTO pass_entries (date, status, visitor_id) 
      VALUES ('18-Sep-2020', 'Success', '${num}');
      INSERT INTO pass_entries (date, status, visitor_id) 
      VALUES ('25-Sep-2020', 'Success', '${num}');`
    array += entry;
    num++;
  }
  return array;
}

fs.writeFile('./db/seeds/pass_entries_1.sql', userSeedsGenerator(250), (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
});