import type { Dispatch, ReactNode, SetStateAction } from "react";
import type { E_type } from "../../utils/FiltersOptions.util";

export interface IFilterOptions {
	searchValue: string;
	type: E_type | null;
	ammenities: string[];
	showFavorites: boolean;
}

export interface IFilterProvider {
	children: ReactNode;
}

export interface IFilterContext {
	selectedFilters: IFilterOptions;
	setSelectedFilters: Dispatch<SetStateAction<IFilterOptions>>;
	searchActive: boolean;
	setSearchActive: Dispatch<SetStateAction<boolean>>;
}
