const router = require("express").Router();

const {
    checkout,
    getShopItems,
    getShopItem,
    createItem,
    updateItem,
    deleteItem
} = require("../controllers/shop.controller");

router.post('/shop/checkout', checkout);
router.get("/shop", getShopItems);
router.get('/shop/:id_shop', getShopItem);
router.post('/shop', createItem);
router.put('/shop/:id_shop', updateItem);
router.delete('/shop/:id_shop', deleteItem);
 
module.exports = router;