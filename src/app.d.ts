
// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace svelte.JSX {
	interface DOMAttributes<T> {
	  onclick_outside?: CompositionEventHandler<T>;
	}
  }
declare namespace App {
	interface Locals {
		userData: {
			id:number,
			username: string;
			email:string
		} | null;
	}
	interface PageData {
		user?: string;
		groceries?:[];
	}
	// interface Platform {}
}
