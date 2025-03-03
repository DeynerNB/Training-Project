import { Cross1Icon, HeartFilledIcon, HeartIcon } from "@radix-ui/react-icons";
import {
	Badge,
	Box,
	Button,
	Dialog,
	Flex,
	IconButton,
	Link,
	Text,
} from "@radix-ui/themes";
import { useContext, useState } from "react";

import defaultPlaceImage from "../../assets/DefaultPlaceImage.jpg";
import { GMapContext } from "../../context/GMapContext/GMapContext";
import type { IPlaceDialogProps } from "./PlaceDialog.interface";

import style from "./PlaceDialog.module.scss";

function PlaceDialog({ placeData }: IPlaceDialogProps) {
	// Function to change the favorite state of a place
	const { toggleFavorite } = useContext(GMapContext);

	// Control which icon to display
	const [favoriteIcon, setFavoriteIcon] = useState<boolean>(
		placeData.isFavorite,
	);

	const handleToggleFavorite = () => {
		toggleFavorite(placeData.name);
		setFavoriteIcon(!favoriteIcon);
	};

	return (
		<Dialog.Root>
			{/* Button trigger to open dialog */}
			<Dialog.Trigger>
				<Button variant="outline">View details</Button>
			</Dialog.Trigger>

			<Dialog.Content className={style["dialog-container"]}>
				{/* Image and name of the place */}
				<Box
					className={style["place-image-container"]}
					position={"relative"}
					height={"300px"}
				>
					<img
						className={style["place-image"]}
						src={placeData.images?.[0] || defaultPlaceImage}
						alt={placeData.name}
					/>
					{/* Name and favorite button container */}
					<Flex
						width={"100%"}
						position={"absolute"}
						bottom={"0"}
						className={`${style["place-title"]} ${style["place-overlay"]}`}
						justify={"between"}
						align={"center"}
						px={"3"}
					>
						<Dialog.Title size={"7"}>{placeData.name}</Dialog.Title>
						<IconButton variant={"ghost"} onClick={handleToggleFavorite}>
							{favoriteIcon ? (
								<HeartFilledIcon className={"default-icon favorite-icon"} />
							) : (
								<HeartIcon className={"default-icon favorite-icon"} />
							)}
						</IconButton>
					</Flex>

					{/* Dialog Close button */}
					<Box
						position={"absolute"}
						top={"4"}
						right={"4"}
						className={style["place-overlay"]}
					>
						<Dialog.Close style={{ placeSelf: "end" }}>
							<IconButton color={"ruby"} variant={"ghost"}>
								<Cross1Icon />
							</IconButton>
						</Dialog.Close>
					</Box>
				</Box>

				{/* Other information */}
				<Box px={"5"} py={"4"}>
					<Flex>
						<Flex direction={"column"} gap={"2"} style={{ flexGrow: 1 }}>
							{/* Description */}
							<Text as="span" weight={"medium"}>
								About this place:
							</Text>
							<Text as="p">{placeData.description}</Text>

							{/* Budget */}
							<Text as="span" weight={"medium"}>
								Budget:
							</Text>
							<Text as="p">{placeData.categoryBudget}</Text>

							{/* Amenities */}
							<Text as="span" weight={"medium"}>
								Amenities:
							</Text>
							{placeData.category_ammenities?.map((ammenity) => (
								<Flex gap={"2"} key={ammenity.label}>
									<img
										src={`/icons/${ammenity.icon}.svg`}
										aria-hidden
										style={{ display: "inline", filter: "brightness(0)" }}
									/>
									<Text as="span">{ammenity.label}</Text>
								</Flex>
							))}

							{/* Google Maps link */}
							<Box mt={"2"}>
								<Link
									target={"_blank"}
									href={`https://maps.google.com/?q=${placeData.lat},${placeData.lng}`}
								>
									I want to go there
								</Link>
							</Box>
						</Flex>

						{/* Place type */}
						<Box>
							<Badge size={"3"} style={{ placeSelf: "end" }}>
								{placeData.category_type}
							</Badge>
						</Box>
					</Flex>
				</Box>
			</Dialog.Content>
		</Dialog.Root>
	);
}

export default PlaceDialog;
