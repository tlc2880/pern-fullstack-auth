const router = require("express").Router();

const {
    checkout
} = require("../controllers/eCom.controller");

router.post('/checkout', checkout);

module.exports = router;