import { Box, Grid } from "@radix-ui/themes";
import { useContext, useEffect } from "react";
import PlaceCard from "../PlaceCard/PlaceCard";

import { GMapContext } from "../../context/GMapContext/GMapContext";
import type { IPlace } from "../../interfaces/Places.interface";

function PlacesList() {
	const { placesList, removePlaceFromMap } = useContext(GMapContext);

	const handleRemovePlace = (markerId: string) => {
		removePlaceFromMap(markerId);
	};

	return (
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
	);
}

export default PlacesList;
