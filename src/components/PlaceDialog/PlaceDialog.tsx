import { Button, Dialog, Flex, Text } from "@radix-ui/themes";
import type { IPlaceDialogProps } from "./PlaceDialog.interface";

import { availableAmenities } from "../../utils/FiltersOptions.util";

function PlaceDialog({ placeData }: IPlaceDialogProps) {
	return (
		<Dialog.Root>
			<Dialog.Trigger>
				<Button variant="ghost">View details</Button>
			</Dialog.Trigger>

			<Dialog.Content>
				<Dialog.Title size={"7"}>{placeData.name}</Dialog.Title>

				<Flex my={"2"} gap={"2"} direction={"column"}>
					<Text as="p">{placeData.description}</Text>
					<Text as="span">Amenities:</Text>

					{placeData.category_ammenities?.map((ammenity) => (
						<Flex gap={"2"} key={ammenity.label}>
							<img
								src={`/public/icons/${ammenity.icon}.svg`}
								aria-hidden
								style={{ display: "inline", filter: "brightness(0)" }}
							/>
							<Text as="span">{ammenity.label}</Text>
						</Flex>
					))}
				</Flex>

				<Dialog.Close>
					<Button variant="soft" color="gray">
						Close
					</Button>
				</Dialog.Close>
			</Dialog.Content>
		</Dialog.Root>
	);
}

export default PlaceDialog;
