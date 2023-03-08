const pool = require("../db");

// get all shop items
const getShopItems = async (req, res) => {
    try {
        const allShopItems = await pool.query("SELECT * FROM shop")
        res.json(allShopItems.rows)
    } catch (error) {
        console.error(error.message)
    }
}

// get one item
const getShopItem = async (req, res) => {
    try {
        const { id_shop } = req.params;
        const item = await pool.query("SELECT * FROM shop WHERE id_shop = $1", [id_shop])
        res.json(item.rows[0])
    } catch (error) {
        console.error(error.message)
    }
}

// create one item
const createItem = async (req, res) => {
    try {
        const {
            title, price, id
        } = req.body
        const newItem = await pool.query("INSERT INTO shop (title, price, id) VALUES($1, $2, $3) RETURNING *", 
            [title, price, id])
        res.json(newItem.rows[0])
    } catch (error) {
        console.error(error.message)
    }
}

module.exports = {
    getShopItems,
    getShopItem,
    createItem
}