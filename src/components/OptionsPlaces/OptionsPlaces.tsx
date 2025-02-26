import { Button, DropdownMenu, Flex, Grid, TextField } from "@radix-ui/themes";

function OptionsPlaces() {
	return (
		<Flex direction={"column"} p={"3"} gap={"3"}>
			<Grid columns={"2fr 1fr"} gap={"3"}>
				{/* Text input */}
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
			</Grid>

			{/* Button */}
			<Button>Add place</Button>
		</Flex>
	);
}

export default OptionsPlaces;
