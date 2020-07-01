const express = require('express');
const router = express.Router();
const path = require('path');
const money = require('../../components/money/money.ctrl');

router.get('/request-money', money.createRequest);
router.post('/request-money', money.createRequest);
router.get('/send-money/:slug', money.sendMoney);
router.post('/send-money/:slug', money.sendMoney);


//app.use(express.static(path.resolve(

router.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/../../public/home.html'));
});


module.exports = router;
