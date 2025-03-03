import type { Control } from "react-hook-form";
import type { Inputs } from "../DialogForm/DialogForm.interface";

import type {
	E_Budget,
	E_Categories,
	E_type,
} from "../../../utils/FiltersOptions.util";

export interface ISelectCategoryProps {
	labelValue: string;
	filter_title: E_Categories;
	filter_options: typeof E_type | typeof E_Budget;
	control: Control<Inputs>;
}
