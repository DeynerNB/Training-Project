import {
	Button,
	Flex,
	Grid,
	Separator,
	Text,
	TextField,
} from "@radix-ui/themes";

import DropdownMenuCategory from "../Shared/SelectCategory/SelectCategory";

import { E_amenities, E_type } from "../../utils/FiltersOptions.util";

function OptionsPanel() {
	return (
		<Flex direction={"column"} gap={"3"}>
			{/* Search filter */}
			<Text as={"span"}>Filters</Text>
			<TextField.Root placeholder="Search" />

			<Separator size={"4"} />

			{/* Button: Places closer to me */}
			<Button>Around me</Button>

			<Separator size={"4"} />

			{/* Other filter */}
			<Grid columns={"2"} gap={"3"}>
				{/* <DropdownMenuCategory
					filter_title={"Type"}
					filter_options={type_options}
				/>
				<DropdownMenuCategory
					filter_title={"Amenities"}
					filter_options={amenities_options}
				/> */}
			</Grid>

			<Separator size={"4"} />

			{/* <FilterOptions /> */}
		</Flex>
	);
}

export default OptionsPanel;
