import type { Dispatch, SetStateAction } from "react";
import type {
	E_Categories,
	E_amenities,
} from "../../../utils/FiltersOptions.util";

export interface ICheckboxCategoryProps {
	labelValue: string;
	filterTitle: E_Categories;
	filterOptions: typeof E_amenities;
	selectedAmenities: string[];
	setSelectedAmenities: Dispatch<SetStateAction<string[]>>;
}
