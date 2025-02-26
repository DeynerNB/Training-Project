import { Avatar, Box, Card, Flex, Text } from "@radix-ui/themes";
import { useContext } from "react";
import { PlacesContext } from "../../context/PlacesContext/PlacesContext";
import type { IPlace } from "../../interfaces/Places.interface";
import PlaceCard from "../PlaceCard/PlaceCard";

function PlacesList() {
	const { placesList } = useContext(PlacesContext);

	return (
		<Box>
			{placesList.map((place: IPlace) => {
				return <PlaceCard key={place.name} placeData={place} />;
			})}
		</Box>
	);
}

export default PlacesList;
