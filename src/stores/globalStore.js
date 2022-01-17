import {writable} from 'svelte/store';

const globalStore = writable({
    sidebar: false,
    cart: false,
    alert: false,
    alertText: "default alert",
    alertDanger: false 
});


const store = {
    subscribe: globalStore.subscribe,
    toggleItem: (item, newVal, alertText="default", alertDanger=false) => {
        if(item === 'alert') {
            globalStore.update((current) => {  
                return {...current, [item]: newVal, alertText,alertDanger}
            });
        }
        else {
            globalStore.update((current) => {  
                return {...current, [item]: newVal}
            });
        }
    }
}


export default store;