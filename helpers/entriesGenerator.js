// const fs = require('fs');

// userSeedsGenerator = (times) => {
//   let array = [];
//   let num = 50;

//   while (num < times) {
//     let entry = `
//       INSERT INTO pass_entries (date, status, trail_id, visitor_id) 
//       VALUES ('Sep 10 2020', 'Pending', '1','${num}');
//       INSERT INTO pass_entries (date, status, trail_id, visitor_id) 
//       VALUES ('Sep 12 2020', 'Pending', '1,'${num}');
//       INSERT INTO pass_entries (date, status, trail_id, visitor_id) 
//       VALUES ('Sep 14 2020', 'Pending', '1','${num}');
//       INSERT INTO pass_entries (date, status, trail_id, visitor_id) 
//       VALUES ('Sep 10 2020', 'Pending', '4','${num}');
//       INSERT INTO pass_entries (date, status, trail_id, visitor_id) 
//       VALUES ('Sep 12 2020', 'Pending', '4','${num}');
//       INSERT INTO pass_entries (date, status, trail_id, visitor_id) 
//       VALUES ('Sep 14 2020', 'Pending', '4','${num}');
//       INSERT INTO pass_entries (date, status, trail_id, visitor_id) 
//       VALUES ('Sep 10 2020', 'Pending', '7','${num}');
//       INSERT INTO pass_entries (date, status, trail_id, visitor_id) 
//       VALUES ('Sep 12 2020', 'Pending', '7','${num}');
//       INSERT INTO pass_entries (date, status, trail_id, visitor_id) 
//       VALUES ('Sep 14 2020', 'Pending', '7','${num}');
//       INSERT INTO pass_entries (date, status, trail_id, visitor_id) 
//       VALUES ('Sep 10 2020', 'Pending', '10','${num}');
//       INSERT INTO pass_entries (date, status, trail_id, visitor_id) 
//       VALUES ('Sep 12 2020', 'Pending', '10','${num}');
//       INSERT INTO pass_entries (date, status, trail_id, visitor_id) 
//       VALUES ('Sep 14 2020', 'Pending', '10','${num}');`
//     array += entry;
//     num++;
//   }
//   return array;
// }

// fs.writeFile('../db/seeds/entries/pass_entries_6.sql', userSeedsGenerator(120), (err) => {
//   if (err) throw err;
//   console.log('The file has been saved!');
// });

let date = new Date;
  date.setHours(0, 0, 0, 0)
  date = date.setDate(date.getDate() + 1);
  date = new Date(date)
  date = date.toDateString().slice(4)
  console.log(date)