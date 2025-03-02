const useLocalStorage = () => {
	const getStorageValue = (key: string) => {
		return localStorage.getItem(key);
	};

	const writeStorageValue = (key: string, value: string) => {
		localStorage.setItem(key, value);
	};

	return { getStorageValue, writeStorageValue };
};

export default useLocalStorage;
