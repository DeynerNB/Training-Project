import { StarFilledIcon, StarIcon, TrashIcon } from "@radix-ui/react-icons";
import {
	Badge,
	Box,
	Card,
	Flex,
	IconButton,
	Inset,
	Text,
} from "@radix-ui/themes";
import type { IPlaceCard } from "./PlaceCard.interface";

import { useEffect } from "react";
import defaultPlaceImage from "../../assets/DefaultPlaceImage.jpg";
import PlaceDialog from "../PlaceDialog/PlaceDialog";

function PlaceCard(props: IPlaceCard) {
	const { placeData, handleRemovePlace } = props;

	useEffect(() => {
		console.log("placeData: ", placeData);
	}, [placeData]);

	return (
		<Box maxHeight={"300px"} maxWidth={"100%"}>
			<Card style={{ height: "100%" }}>
				<Flex direction={"column"} height={"100%"}>
					<Inset clip="padding-box" side="top" pb="current">
						<img
							src={placeData?.images?.[0] || defaultPlaceImage}
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

					<Flex justify={"between"} align={"center"}>
						<Text as="label" size="6" weight="bold">
							{placeData.name}
						</Text>

						{placeData.isFavorite ? <StarFilledIcon /> : <></>}
					</Flex>

					{placeData.category_type && (
						<Box>
							<Badge>{placeData.category_type}</Badge>
						</Box>
					)}

					{placeData.description && (
						<Box>
							<Text as="p" size="3" truncate>
								{placeData.description}
							</Text>
						</Box>
					)}
					<Flex gap={"3"}>
						<Text as="div" size="2">
							Latitude: {placeData.lat}
						</Text>
						<Text as="div" size="2">
							Longitud: {placeData.lng}
						</Text>
					</Flex>
					<Flex mt={"2"} justify={"end"} align={"center"} gap={"3"}>
						<PlaceDialog {...props} />
						<IconButton
							size={"3"}
							variant={"ghost"}
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
