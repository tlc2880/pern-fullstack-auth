// Coffee: price_1MgHsyFeZ9mAE5amZIVcJdA0
// Sunglasses: price_1MgHvmFeZ9mAE5amJw1Yk1PY
// Camera: price_1MgHxAFeZ9mAE5amAUh6VP2r

const productsArray = [
    {
        id: "price_1MgHsyFeZ9mAE5amZIVcJdA0",
        title: "Coffee",
        price: 4.99
    },
    {
        id: "price_1MgHvmFeZ9mAE5amJw1Yk1PY",
        title: "Sunglasses",
        price: 9.99
    },
    {
        id: "price_1MgHxAFeZ9mAE5amAUh6VP2r",
        title: "Camera",
        price: 39.99
    }
];

function getProductData(id: string) {
    let productData = productsArray.find(product => product.id === id);

    if (productData === undefined) {
        console.log("Product data does not exist for ID: " + id);
        return undefined;
    }

    return productData;
}

export { productsArray, getProductData };