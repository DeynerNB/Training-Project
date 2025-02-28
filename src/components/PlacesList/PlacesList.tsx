import { Box, Flex, Grid, Text } from "@radix-ui/themes";
import { useContext } from "react";
import PlaceCard from "../PlaceCard/PlaceCard";

import { GMapContext } from "../../context/GMapContext/GMapContext";
import type { IPlace } from "../../interfaces/Places.interface";

import style from "./PlacesList.module.scss";

function PlacesList() {
	const { placesList, removePlaceFromMap } = useContext(GMapContext);

	const handleRemovePlace = (markerId: string) => {
		removePlaceFromMap(markerId);
	};

	return (
		<>
			{placesList.length === 0 ? (
				<Box>
					<Flex
						p={"3"}
						height={"100%"}
						direction={"column"}
						justify={"center"}
						align={"center"}
						className={style["container-no-places-yet"]}
					>
						<Text align={"center"} as={"p"}>
							There are no places added yet.
						</Text>
						<Text align={"center"} as={"p"}>
							To add one, click the place you want to add on the map.
						</Text>
					</Flex>
				</Box>
			) : (
				<Grid
					p={"3"}
					gap={"3"}
					overflowY={"scroll"}
					rows={"repeat(auto-fill, 300px)"}
				>
					{placesList.map((place: IPlace) => {
						return (
							<PlaceCard
								key={place.name}
								placeData={place}
								handleRemovePlace={handleRemovePlace}
							/>
						);
					})}
				</Grid>
			)}
		</>
	);
}

export default PlacesList;
