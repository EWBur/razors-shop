import {derived, writable} from 'svelte/store'
import testCart from "../localCart"

// cart
const cart = writable(getStorageCart())

// cart total
export const cartTotal = derived(cart, ($cart) => {
    let total = $cart.reduce((acc, cur) => {
        return (acc += cur.price * cur.amount);
    }, 0);
    return total.toFixed(2);
})

// local functions
const remove = (id,items) => {
    return items.filter(item => item.id !== id)
}

const toggleAmount = (id,items, action) => {
    let addition = action === 'inc' ? 1 : action === 'dec' ? -1 : 0;
    return items.map( item => {
        return item.id === id ? {...item, amount: (item.amount + addition)} : {...item}
    })
}
// global functions
export const removeItem = (id) => {
    cart.update(storeValues => {
        return remove(id,storeValues)
    });
};

export const increaseAmount = (id) => {
    cart.update(storeValues => {
        return toggleAmount(id,storeValues,'inc')
    })
}

export const decreaseAmount = (id) => {
    cart.update(storeValues => {
        let item = storeValues.find(item => item.id === id);
        let newCart;
        if (item.amount <= 1){
            newCart = remove(id, storeValues);
        }
        else {
            newCart = toggleAmount(id,storeValues,'dec') 
        }
        return [...newCart]

    })
}

export const addToCart = (product) => {
    cart.update( (storeValues) => {
        const {id,image,title,price} = product;
        let item = storeValues.find(item => item.id === product.id);
        let newCart;
        if (item) {
            newCart = toggleAmount(product.id,storeValues,'inc');
        }
        else {
            newCart = [...storeValues, {id,image,title,price,amount:1}]
        }
        return newCart;
    })    
}
// localStorage
function getStorageCart(){
    return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []

}
export function setStorageCart(cartValues){
    localStorage.setItem('cart', JSON.stringify(cartValues))
}
export default cart