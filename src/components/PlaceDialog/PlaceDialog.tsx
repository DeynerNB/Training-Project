import { Badge, Box, Button, Dialog, Flex, Link, Text } from "@radix-ui/themes";
import type { IPlaceDialogProps } from "./PlaceDialog.interface";

import defaultPlaceImage from "../../assets/DefaultPlaceImage.jpg";

import style from "./PlaceDialog.module.scss";

function PlaceDialog({ placeData }: IPlaceDialogProps) {
	return (
		<Dialog.Root>
			<Dialog.Trigger>
				<Button variant="ghost">View details</Button>
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
					<Dialog.Title className={style["place-title"]} size={"7"}>
						{placeData.name}
					</Dialog.Title>
				</Box>

				{/* Other information */}
				<Box p={"3"}>
					<Flex>
						<Flex direction={"column"} gap={"2"} style={{ flexGrow: 1 }}>
							{/* Description */}
							<Text as="span" weight={"medium"}>
								About this place:
							</Text>
							<Text as="p">{placeData.description}</Text>

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
						<Box>
							<Badge size={"3"} style={{ placeSelf: "end" }}>
								{placeData.category_type}
							</Badge>
						</Box>
					</Flex>

					<Box mt={"2"} style={{ textAlign: "end" }}>
						<Dialog.Close style={{ placeSelf: "end" }}>
							<Button variant="soft" color="gray">
								Close
							</Button>
						</Dialog.Close>
					</Box>
				</Box>
			</Dialog.Content>
		</Dialog.Root>
	);
}

export default PlaceDialog;
