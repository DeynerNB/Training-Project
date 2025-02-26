export default class StorageHelper {
	storageKey: string;

	constructor() {
		this.storageKey = "LOCAL_STORAGE_COUNTER_KEY";
	}

	writeToStorage(value: string) {
		if (!value) {
			console.warn("[Warn in Storage Helper]: Value must be defined");
			return;
		}
		localStorage.setItem(this.storageKey, value);
	}

	getInStorage() {
		return localStorage.getItem(this.storageKey) || 0;
	}
}
