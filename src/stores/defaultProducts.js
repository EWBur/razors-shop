import { writable } from "svelte/store";
import localProducts from "../localProducts";

const store = writable(flattenProducts([...localProducts]))

// subscribe
// set
// update

function flattenProducts(data) {
    return data.map(product => {
        let image = product.image.url;
        return {...product, image};
    })
}

export default store