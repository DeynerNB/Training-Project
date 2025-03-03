import { Select, Text } from "@radix-ui/themes";
import { Controller } from "react-hook-form";

import type { ISelectCategoryProps } from "./SelectCategory.interface";

import style from "../DialogForm/DialogForm.module.scss";

function SelectCategory({
	labelValue,
	filter_title,
	filter_options,
	control,
}: ISelectCategoryProps) {
	// Transform the enum to a list
	const filterValues = Object.values(filter_options);

	return (
		<Controller
			name={filter_title}
			control={control}
			rules={{ required: true }}
			render={({ field }) => (
				<>
					<Text as="label" className={style["label--required"]}>
						{labelValue}
					</Text>

					<Select.Root
						{...field}
						onValueChange={field.onChange}
						defaultValue={filterValues[0]}
					>
						<Select.Trigger />
						<Select.Content>
							{filterValues.map((value) => (
								<Select.Item key={value} value={value}>
									{value}
								</Select.Item>
							))}
						</Select.Content>
					</Select.Root>
				</>
			)}
		/>
	);
}

export default SelectCategory;
