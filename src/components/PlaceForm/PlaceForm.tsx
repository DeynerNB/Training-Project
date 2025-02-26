import { Box, Button, Dialog, Flex, Grid } from "@radix-ui/themes";
import InputForm from "../Shared/InputForm/InputForm";

function PlaceForm() {
	return (
		<Dialog.Root>
			<Dialog.Trigger>
				<Button>Add place</Button>
			</Dialog.Trigger>

			<Dialog.Content>
				<Dialog.Title>Add place</Dialog.Title>

				<Grid columns={"2"} gapX={"3"}>
					<Box gridColumnStart={"1"} gridColumnEnd={"3"}>
						<InputForm
							inputLabel="Location Name"
							inputId="location-name-input"
						/>
					</Box>
					<InputForm inputLabel="Latitude" inputId="latitude-input" />
					<InputForm inputLabel="longitude" inputId="longitude-input" />
				</Grid>

				<Flex direction={"row-reverse"} gap={"3"}>
					<Dialog.Close>
						<Button>Cancel</Button>
					</Dialog.Close>
					<Dialog.Close>
						<Button>Save</Button>
					</Dialog.Close>
				</Flex>
			</Dialog.Content>
		</Dialog.Root>
	);
}

export default PlaceForm;
