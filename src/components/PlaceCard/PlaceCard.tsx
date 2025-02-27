import { TrashIcon } from "@radix-ui/react-icons";
import { Avatar, Box, Button, Card, Flex, Inset, Text } from "@radix-ui/themes";
import type { IPlaceCard } from "./PlaceCard.interface";

function PlaceCard(props: IPlaceCard) {
	const { placeData, handleRemovePlace } = props;

	return (
		<Card>
			<Inset clip="padding-box" side="top" pb="current">
				<img
					src="https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
					alt="Bold typography"
				/>
			</Inset>

			<Text as="div" size="2" weight="bold">
				{placeData.name}
			</Text>
			<Flex gap={"3"}>
				<Text as="div" size="2">
					Latitude: {placeData.lat}
				</Text>
				<Text as="div" size="2">
					Longitud: {placeData.lng}
				</Text>
			</Flex>
			<Flex justify={"end"}>
				<Button
					variant={"ghost"}
					mt={"2"}
					onClick={() => handleRemovePlace(placeData.name)}
				>
					<TrashIcon color={"red"} />
				</Button>
			</Flex>
		</Card>
	);
}

export default PlaceCard;
