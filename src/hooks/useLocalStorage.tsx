import { useState } from "react";

const useLocalStorage = (storageKey: string) => {
	const [key] = useState<string>(storageKey);

	const getStorageValue = () => {
		return localStorage.getItem(key);
	};

	const writeStorageValue = (value: string) => {
		localStorage.setItem(key, value);
	};

	return { getStorageValue, writeStorageValue };
};

export default useLocalStorage;
