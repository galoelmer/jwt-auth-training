var express = require('express');
var router = express.Router();
var axios = require('axios');
const NodeCache = require('node-cache');
const myCache = new NodeCache();
const { locals } = require('../app');

/* GET home page. */
router.get('/', function (req, res, next) {
  if (myCache.get('data') == undefined) {
    axios
      .get('https://picsum.photos/v2/list?page=4&limit=9')
      .then((response) => {
        console.log('Getting data...');
        myCache.set('data', { data: response.data });
        res.render('cards', { images: response.data });
      })
      .catch((err) => console.log(err));
  } else {
    console.log('Getting data from cache...');
    res.render('cards', { images: myCache.get('data').data });
  }
});

module.exports = router;
