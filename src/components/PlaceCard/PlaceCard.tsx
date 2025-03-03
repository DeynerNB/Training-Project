import { StarFilledIcon, TrashIcon } from "@radix-ui/react-icons";
import {
	Badge,
	Box,
	Card,
	Flex,
	IconButton,
	Inset,
	Text,
} from "@radix-ui/themes";
import { useContext } from "react";

import defaultPlaceImage from "../../assets/DefaultPlaceImage.jpg";
import { GMapContext } from "../../context/GMapContext/GMapContext";
import PlaceDialog from "../PlaceDialog/PlaceDialog";
import type { IPlaceCard } from "./PlaceCard.interface";

import style from "./PlaceCard.module.scss";

function PlaceCard(props: IPlaceCard) {
	const { placeData, handleRemovePlace } = props;

	const { setMapCenter } = useContext(GMapContext);

	const handleSetMapPosition = () => {
		const { lat, lng } = placeData;
		setMapCenter({ lat, lng });
	};

	return (
		<Box maxHeight={"300px"} maxWidth={"100%"}>
			<Card style={{ height: "100%" }}>
				<Flex direction={"column"} height={"100%"}>
					{/* Card image inset */}
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

					{/* Card title */}
					<Flex justify={"between"} align={"center"}>
						<Text
							as="label"
							size="6"
							weight="bold"
							onClick={handleSetMapPosition}
							className={style["card-title"]}
						>
							{placeData.name}
						</Text>

						{placeData.isFavorite ? <StarFilledIcon /> : <></>}
					</Flex>

					{/* Card category type badge */}
					{placeData.category_type && (
						<Box>
							<Badge>{placeData.category_type}</Badge>
						</Box>
					)}

					{/* Card description */}
					{placeData.description && (
						<Box>
							<Text as="p" size="3" truncate>
								{placeData.description}
							</Text>
						</Box>
					)}

					{/* Card lat and lng information */}
					<Flex gap={"3"}>
						<Text as="div" size="2">
							Latitude: {placeData.lat}
						</Text>
						<Text as="div" size="2">
							Longitud: {placeData.lng}
						</Text>
					</Flex>

					{/* Card buttons */}
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
