import { CheckboxGroup, Text } from "@radix-ui/themes";

import type { ICheckboxCategoryProps } from "./CheckboxCategory.interface";

function CheckboxCategory({
	labelValue,
	filterTitle,
	filterOptions,
	selectedAmenities,
	setSelectedAmenities,
}: ICheckboxCategoryProps) {
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
				{Object.entries(filterOptions).map(([key, value]) => (
					<CheckboxGroup.Item key={key} value={key}>
						{value.label}
					</CheckboxGroup.Item>
				))}
			</CheckboxGroup.Root>
		</>
	);
}

export default CheckboxCategory;
