import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export const loading = writable(false);
export const postGroceries = writable([] as Array<{}>);

export const neededGroceriesList = writable([] as Array<{}>);
export const checkedGroceriesFromList = writable([] as  Array<{}>)


if(browser){
    const storedCheckedGroceriesFromList = localStorage.getItem('storedCheckedGroceriesFromList');
    checkedGroceriesFromList.set(storedCheckedGroceriesFromList ? JSON.parse(storedCheckedGroceriesFromList) : []);
    checkedGroceriesFromList.subscribe((value) => (localStorage.storedCheckedGroceriesFromList = JSON.stringify(value)));
}
