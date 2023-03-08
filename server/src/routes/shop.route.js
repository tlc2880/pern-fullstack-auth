const router = require("express").Router();

const {
    getShopItems,
    getShopItem,
    createItem
} = require("../controllers/shop.controller");

router.get("/shop", getShopItems);
router.get('/shop/:id_shop', getShopItem);
router.post('/shop', createItem);
 
module.exports = router;