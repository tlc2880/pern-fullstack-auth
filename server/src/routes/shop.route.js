const router = require("express").Router();

const {
    getShopItems
} = require("../controllers/shop.controller");

router.get("/shop", getShopItems);
 
module.exports = router;