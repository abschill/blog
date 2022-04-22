const express = require('express');

const router = express.Router();

router.get( '/', (req, res) => {
    res.send(req.app.loader.template('home'));
});


module.exports = router;