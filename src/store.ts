import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import type { GroceriesForPostType, GroceryForProductType } from './types';

export const loading = writable(false);
export const postGroceries = writable([] as Array<GroceriesForPostType>);

export const neededGroceriesList = writable([] as Array<GroceryForProductType>);
export const checkedGroceriesFromList = writable([] as  Array<GroceryForProductType>)


if(browser){
    const storedCheckedGroceriesFromList = localStorage.getItem('storedCheckedGroceriesFromList');
    checkedGroceriesFromList.set(storedCheckedGroceriesFromList ? JSON.parse(storedCheckedGroceriesFromList) : []);
    checkedGroceriesFromList.subscribe((value) => (localStorage.storedCheckedGroceriesFromList = JSON.stringify(value)));
}
