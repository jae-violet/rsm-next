// From https://yewtu.be/watch?v=64VrioBwHG4

import { writable } from "svelte/store";

export const MIN_LOAD_TIME_MS = 2000;

const newLoading = () => {
	const { subscribe, update, set } = writable({
		status: "INIT", // INIT, IDLE, LOADING, NAVIGATING
		animating: true
	});

	function startNavigation() {
		update(() => ({
			status: "NAVIGATING",
			animating: true
		}));
	}

	function stopAnimation() {
		update((state) => {
			return { status: "IDLE", animating: false };
		});
	}

	function stopNavigation() {
		update((state) => {
			if (!state.animating) {
				return { status: "IDLE", animating: false };
			}
			return state;
		});
	}

	return { subscribe, update, set, startNavigation, stopNavigation, stopAnimation };
};

console.log("starting initial load");
export const loading = newLoading();

setTimeout(() => {
	console.log("initial load complete");
	loading.set({ status: "IDLE", animating: false });
}, MIN_LOAD_TIME_MS);
