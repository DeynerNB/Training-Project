import { TrashIcon } from "@radix-ui/react-icons";
import { Box, Card, Flex, IconButton, Inset, Text } from "@radix-ui/themes";
import type { IPlaceCard } from "./PlaceCard.interface";

import defaultPlaceImage from "../../assets/DefaultPlaceImage.jpg";

function PlaceCard(props: IPlaceCard) {
	const { placeData, handleRemovePlace } = props;

	return (
		<Box maxHeight={"300px"} maxWidth={"100%"}>
			<Card style={{ height: "100%" }}>
				<Flex direction={"column"} height={"100%"}>
					<Inset clip="padding-box" side="top" pb="current">
						<img
							src={defaultPlaceImage}
							alt="Bold typography"
							style={{
								display: "block",
								objectFit: "cover",
								width: "100%",
								height: "100%",
								backgroundColor: "var(--gray-5)",
							}}
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
						<IconButton
							size={"3"}
							variant={"ghost"}
							mt={"2"}
							onClick={() => handleRemovePlace(placeData.name)}
						>
							<TrashIcon color={"red"} />
						</IconButton>
					</Flex>
				</Flex>
			</Card>
		</Box>
	);
}

export default PlaceCard;
