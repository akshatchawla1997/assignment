
const cron = require('node-cron')
const fs = require('fs');
const { sendNotificationToTeacher } = require('../teacher/profile/controller');
const { mailer } = require('../../../config/config');
const { autoAttedance } = require('../attendance/controller');



const alertCron= cron.schedule("* * * * *", async function () {
  console.log("mail sent");
  let data = `mail sent from ${mailer.user}\n`;
  console.log(data);
  fs.appendFile('cron.txt', data, function (err) {
    if (err) throw err;
  });
  await sendNotificationToTeacher()
});

const updateStudentAttendance=cron.schedule("*/10 23 * * *", async function () {
console.log(">>>>>cron")
  await autoAttedance()
});
module.exports={alertCron,updateStudentAttendance}






