import { TrashIcon } from "@radix-ui/react-icons";
import { Card, Flex, IconButton, Inset, Text } from "@radix-ui/themes";
import type { IPlaceCard } from "./PlaceCard.interface";

import defaultPlaceImage from "../../assets/DefaultPlaceImage.jpg";

function PlaceCard(props: IPlaceCard) {
	const { placeData, handleRemovePlace } = props;

	return (
		<Card>
			<Inset clip="padding-box" side="top" pb="current">
				<img src={defaultPlaceImage} alt="Bold typography" />
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
				<IconButton
					size={"3"}
					variant={"ghost"}
					mt={"2"}
					onClick={() => handleRemovePlace(placeData.name)}
				>
					<TrashIcon color={"red"} />
				</IconButton>
			</Flex>
		</Card>
	);
}

export default PlaceCard;
