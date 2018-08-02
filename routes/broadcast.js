var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {  
  res.render('broadcast', { title: 'Chat' });
});

router.post('/', (req, res, next) => {
  const io = req.app.get('io');

  io.emit('broadcast-message', { name: 'Broadcast!!', message: req.body.message });

  return res.redirect('/broadcast');
})

module.exports = router;
