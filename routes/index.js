var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',
      { title: '社区基础数据管理系统' }
  );
});

router.get('/new', function(req, res, next) {
    res.render('new-community',
        {title:"新建小区"});
})

module.exports = router;
