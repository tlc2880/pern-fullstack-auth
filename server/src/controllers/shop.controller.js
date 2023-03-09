const pool = require("../db");
const stripe = require('stripe')('sk_test_LTQPhkCZjMU3La6mWPYzmJ6L00qXdcCpaO');

const checkout = async (req, res) => {
    console.log(req.body);
    const items = req.body.items;
    let lineItems = [];
    items.forEach((item)=> {
        lineItems.push(
            {
                price: item.id,
                quantity: item.quantity
            }
        )
    });

    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel"
    });

    res.send(JSON.stringify({
        url: session.url
    }));
};

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

// create an item
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

  // update one item
  const updateItem = async (req, res) => {
    try {
        const { id_shop } = req.params;
        const {
            title, price, id
        } = req.body;
        const editItem = await pool.query("UPDATE shop SET title=$1, price=$2, id=$3 WHERE id_shop = $4", 
            [title, price, id, id_shop])
            res.json("Item was updated")
    } catch (error) {
        console.error(error.message)
    }
};

  // delete an item
  const deleteItem = async (req, res) => {
    try {
        const { id_shop } = req.params;
        const deleteItem = await pool.query("DELETE FROM shop WHERE id_shop = $1", [id_shop])
        res.json("Item was deleted!")
    } catch (error) {
        console.error(error.message)
    }
};

module.exports = {
    checkout,
    getShopItems,
    getShopItem,
    createItem,
    updateItem,
    deleteItem
}