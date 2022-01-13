import { writable, derived } from "svelte/store";
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

// featured store
export const featuredStore = derived(
    store,
    ($dataStore) =>{
    return $dataStore.filter(item => item.featured === true);
})
export default store