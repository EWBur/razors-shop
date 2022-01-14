import { writable, derived } from "svelte/store";
import {prodUrl, imgUrl} from '../strapi/URL'
import getProducts from '../strapi/getProducts'

const store = writable([], () => {
    setProducts();
    return () => {};
});


async function setProducts(){
    let products = await getProducts();
    if (products){
        // console.log(products)
        products = flattenProducts(products.data);
        store.set(products);
    }
}
// subscribe
// set
// update

function flattenProducts(data) {
    return data.map(product => {
        let image = `${imgUrl}${product.attributes.image.data.attributes.url.substring(1)}`;
        let attributes = {...product.attributes};
        let id = product.id;
        return {id,...attributes, image};
    })
}

// featured store
export const featuredStore = derived(
    store,
    ($dataStore) =>{
    return $dataStore.filter(item => item.featured === true);
})
export default store
