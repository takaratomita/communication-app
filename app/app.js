'use strict';



// DB設定
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'takara',
  password: 'takara0512',
  database: 'reports_db'
});

connection.connect();

app.use(express.urlencoded ({express:false}));
app.post('/dist', (req,res)=>{
  const title = req.body.title;
  const category = req.body.category;
  const body = req.body.body;
  const title = req.body.title;
  let date = new Date();
  date = `${date.getFullYear()}-0${date.getMonth() + 1}-0${date.getDate()} ${date.getHours()}:${date.getMonth()}:${date.getSeconds()}`;
  console.log(title);
  console.log(category);
  console.log(body);
  console.log(date);
  // connection.query('insert into report set ?',{title:title,body:body,category:category,posted:date},function(err,results,fields){
  //     if (err) {
  //         console.error('error connecting: ' + err.stack);
  //         return;
  //         }
  // });
});


connection.query('SELECT * from report;', (err, rows, fields) => {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
        }

  console.log(rows);
});

connection.end();