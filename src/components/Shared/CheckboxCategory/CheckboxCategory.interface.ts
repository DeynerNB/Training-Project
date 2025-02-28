import type { Dispatch, SetStateAction } from "react";
import type { E_Categories } from "../../../utils/FiltersOptions.util";
import type { IAmenitiesObject } from "../../../utils/FiltersOptions.util";

export interface ICheckboxCategoryProps {
	labelValue: string;
	filterTitle: E_Categories;
	filterOptions: IAmenitiesObject;
	selectedAmenities: string[];
	setSelectedAmenities: Dispatch<SetStateAction<string[]>>;
}
