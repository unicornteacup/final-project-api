const fs = require('fs');

userSeedsGenerator = (times) => {
  let array = [];
  let num = 50;

  while (num < times) {
    let entry = `
      INSERT INTO pass_entries (date, status, trail_id, visitor_id) 
      VALUES ('Sep 10 2020', 'Pending', '1','${num}');
      INSERT INTO pass_entries (date, status, trail_id, visitor_id) 
      VALUES ('Sep 12 2020', 'Pending', '1,'${num}');
      INSERT INTO pass_entries (date, status, trail_id, visitor_id) 
      VALUES ('Sep 14 2020', 'Pending', '1','${num}');
      INSERT INTO pass_entries (date, status, trail_id, visitor_id) 
      VALUES ('Sep 10 2020', 'Pending', '4','${num}');
      INSERT INTO pass_entries (date, status, trail_id, visitor_id) 
      VALUES ('Sep 12 2020', 'Pending', '4','${num}');
      INSERT INTO pass_entries (date, status, trail_id, visitor_id) 
      VALUES ('Sep 14 2020', 'Pending', '4','${num}');
      INSERT INTO pass_entries (date, status, trail_id, visitor_id) 
      VALUES ('Sep 10 2020', 'Pending', '7','${num}');
      INSERT INTO pass_entries (date, status, trail_id, visitor_id) 
      VALUES ('Sep 12 2020', 'Pending', '7','${num}');
      INSERT INTO pass_entries (date, status, trail_id, visitor_id) 
      VALUES ('Sep 14 2020', 'Pending', '7','${num}');
      INSERT INTO pass_entries (date, status, trail_id, visitor_id) 
      VALUES ('Sep 10 2020', 'Pending', '10','${num}');
      INSERT INTO pass_entries (date, status, trail_id, visitor_id) 
      VALUES ('Sep 12 2020', 'Pending', '10','${num}');
      INSERT INTO pass_entries (date, status, trail_id, visitor_id) 
      VALUES ('Sep 14 2020', 'Pending', '10','${num}');`
    array += entry;
    num++;
  }
  return array;
}

fs.writeFile('../db/seeds/entries/pass_entries_6.sql', userSeedsGenerator(120), (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
});

const QRCode = require('qrcode')
 
QRCode.toFile('./qr.png', 'Some text', {
  color: {
    dark: '#00F',  // Blue dots
    light: '#0000' // Transparent background
  }
}, function (err) {
  if (err) throw err
  console.log('done')
})
