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

module.exports = {
    getShopItems
}