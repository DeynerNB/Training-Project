import {
	Crosshair2Icon,
	HeartFilledIcon,
	TrashIcon,
} from "@radix-ui/react-icons";
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

function PlaceCard(props: IPlaceCard) {
	const { placeData, handleRemovePlace, closeDialog } = props;

	const { setMapCenter } = useContext(GMapContext);

	const handleSetMapPosition = () => {
		const { lat, lng } = placeData;
		setMapCenter({ lat, lng });

		if (closeDialog) {
			closeDialog();
		}
	};

	return (
		<Box maxHeight={"350px"} maxWidth={"100%"} position={"relative"}>
			<Card style={{ height: "100%" }}>
				<Flex
					direction={"column"}
					height={"100%"}
					// style={{ justifyContent: "space-between" }}
				>
					{/* Card image inset */}
					<Inset
						clip="padding-box"
						side="top"
						pb="current"
						style={{ height: "100%" }}
					>
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

					{placeData.isFavorite ? (
						<Box position={"absolute"} top={"3"} right={"3"}>
							<HeartFilledIcon className="default-icon favorite-icon" />
						</Box>
					) : (
						<></>
					)}

					{/* Card title */}
					<Flex justify={"between"}>
						<Text
							as="label"
							size="6"
							weight="bold"
							// className={style["card-title"]}
							color={"yellow"}
						>
							{placeData.name}
						</Text>

						{/* Card category type badge */}
						<Box my={"1"}>
							<Badge>{placeData.category_type}</Badge>
						</Box>
					</Flex>

					{/* Card description */}
					{placeData.description && (
						<Box>
							<Text as="p" size="3" color={"gray"} truncate>
								{placeData.description}
							</Text>
						</Box>
					)}

					{/* Card lat and lng information */}
					<Flex gap={"3"}>
						<Text as="div" size="2" color={"gray"}>
							Latitude: {placeData.lat}
						</Text>
						<Text as="div" size="2" color={"gray"}>
							Longitud: {placeData.lng}
						</Text>
					</Flex>

					{/* Card buttons */}
					<Flex mt={"3"} justify={"between"} align={"center"} gap={"3"}>
						<PlaceDialog {...props} />
						<Flex gap={"3"} align={"center"}>
							<IconButton
								size={"3"}
								variant={"ghost"}
								aria-label="find place on map"
							>
								<Crosshair2Icon
									className="default-icon"
									onClick={handleSetMapPosition}
								/>
							</IconButton>
							<IconButton
								size={"3"}
								variant={"ghost"}
								onClick={() => handleRemovePlace(placeData.name)}
								aria-label="delete place"
							>
								<TrashIcon color={"red"} className="default-icon" />
							</IconButton>
						</Flex>
					</Flex>
				</Flex>
			</Card>
		</Box>
	);
}

export default PlaceCard;
