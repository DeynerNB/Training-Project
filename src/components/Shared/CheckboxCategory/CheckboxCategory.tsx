import { CheckboxGroup, Text } from "@radix-ui/themes";

import type { ICheckboxCategoryProps } from "./CheckboxCategory.interface";

function CheckboxCategory({
	labelValue,
	filterTitle,
	filterOptions,
	selectedAmenities,
	setSelectedAmenities,
}: ICheckboxCategoryProps) {
	// Transform enum values to a list of values
	const filterValues = Object.values(filterOptions);

	// Update the selected options
	const handleChange = (values: string[]) => {
		setSelectedAmenities(values);
	};

	return (
		<>
			<Text as="label">{labelValue}</Text>

			<CheckboxGroup.Root
				name={filterTitle}
				value={selectedAmenities}
				onValueChange={handleChange}
			>
				{filterValues.map((value) => (
					<CheckboxGroup.Item key={value} value={value}>
						{value}
					</CheckboxGroup.Item>
				))}
			</CheckboxGroup.Root>
		</>
	);
}

export default CheckboxCategory;
