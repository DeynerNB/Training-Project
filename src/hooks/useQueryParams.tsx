import { useEffect, useState } from "react";

type IQueryParams = {
	[key: string]: string;
};

const useQueryParams = () => {
	const [currentParams, setParams] = useState<IQueryParams>({});

	useEffect(() => {
		const currentURL = new URL(window.location.href.toString());
		const queryParams = currentURL.searchParams;

		let result: IQueryParams = {};

		for (const [key, value] of queryParams.entries()) {
			result = {
				...result,
				[key]: value,
			};
		}

		setParams(result);
	}, []);

	const createQueryParamsURL = (queryParams: IQueryParams) => {
		/**
		 * {
		 * 	key:value,
		 * 	key:value,
		 * 	...
		 * }
		 */

		const currentURL = new URL(window.location.href.toString());
		const newURL = new URL(currentURL.origin);

		for (const [key, value] of Object.entries(queryParams)) {
			newURL.searchParams.set(key, value);
		}

		return newURL;
	};

	return { currentParams, createQueryParamsURL };
};

export default useQueryParams;
