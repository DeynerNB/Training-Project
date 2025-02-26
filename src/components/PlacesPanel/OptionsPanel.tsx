import {
	Button,
	DropdownMenu,
	Flex,
	Separator,
	Text,
	TextField,
} from "@radix-ui/themes";
import PlaceForm from "../PlaceForm/PlaceForm";

import style from "./OptionsPanel.module.scss";

function OptionsPanel() {
	return (
		<Flex direction={"column"} p={"3"} gap={"6"}>
			{/* Add a new location */}
			<PlaceForm />

			<Separator orientation={"horizontal"} size={"4"} />

			{/* Other filters */}
			{/* Text input */}
			<Flex direction={"column"} gap={"3"}>
				<Text as={"span"}>Filters</Text>
				<TextField.Root placeholder="Search" />

				{/* Option element */}
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						<Button>
							Filters
							<DropdownMenu.TriggerIcon />
						</Button>
					</DropdownMenu.Trigger>

					<DropdownMenu.Content>
						<DropdownMenu.Item>Contenido</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</Flex>
		</Flex>
	);
}

export default OptionsPanel;
