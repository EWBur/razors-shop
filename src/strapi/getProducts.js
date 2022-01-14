import {prodUrl} from "./URL"

export default async () => {
    const response = await fetch(`${prodUrl}products?populate=*`).catch(err => console.error(err));
    const products = await response.json();
    if (products.error){
        return null;
    }
    return products;
}