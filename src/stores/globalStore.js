import {writable} from 'svelte/store';

const globalStore = writable({
    sidebar: false,
    cart: false,
    alert: false
});


const store = {
    subscribe: globalStore.subscribe,
    toggleItem: (item, newVal) => {
        globalStore.update((current) => {
            return {...current, [item]: newVal}
        });
    }
}


export default store;