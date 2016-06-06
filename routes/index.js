var express = require('express')
var router = express.Router()
var db = require('mysql')

var dbConfig = {
  host: 'rileyatodd.com',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'power_rankings'
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Power Rankings' })
});

router.post('/action', (req, res, next) => {
  var connection = db.createConnection(dbConfig);
  connection.query('insert into actions (`json`) values (?)', [JSON.stringify(req.body)], (err) => {
    if (err) throw err
    res.sendStatus(200)
  })
})

router.get('/actions', (req, res, next) => {
  var connection = db.createConnection(dbConfig);
  connection.query('select * from actions order by id', (err, rows) => {
    if (err) throw err
    res.json(rows)
  })
})

module.exports = router