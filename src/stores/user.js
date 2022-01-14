import {writable } from 'svelte/store'

const user = writable({usernam: null, jwt: 1});

export default user