import { createContext, useState } from "react";

import type {
	IFilterContext,
	IFilterOptions,
	IFilterProvider,
} from "./FilterContext.interface";

const defaultValue: IFilterContext = {
	selectedFilters: { searchValue: "", type: null, ammenities: [] },
	setSelectedFilters: () => {},
	searchActive: false,
	setSearchActive: () => {},
};

// Create the context
export const FilterContext = createContext(defaultValue);

// Create provider
export const FilterProvider = ({ children }: IFilterProvider) => {
	const [selectedFilters, setSelectedFilters] = useState<IFilterOptions>({
		searchValue: "",
		type: null,
		ammenities: [],
	});

	const [searchActive, setSearchActive] = useState<boolean>(false);

	return (
		<FilterContext.Provider
			value={{
				selectedFilters,
				setSelectedFilters,
				searchActive,
				setSearchActive,
			}}
		>
			{children}
		</FilterContext.Provider>
	);
};
