var express = require('express');
var router = express.Router();
var axios = require('axios');


/* GET home page. */
router.get('/', function (req, res, next) {
  axios
    .get('https://picsum.photos/v2/list?page=4&limit=9')
    .then((response) => {
    //   console.log(response.data);
      res.render('cards', {images: response.data});
    })
    .catch((err) => console.log(err));
});

module.exports = router;
