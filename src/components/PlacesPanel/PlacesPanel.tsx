import { Box, Button, Container, Heading } from "@radix-ui/themes";
import OptionsPlaces from "../OptionsPlaces/OptionsPlaces";
import PlacesList from "../PlacesList/PlacesList";

import style from "./PlacesPanel.module.scss";

function PlacesPanel() {
	return (
		<Box as={"div"}>
			<Box py={"4"} className={style["container-title"]}>
				<Heading align={"center"}>My Places</Heading>
			</Box>
			<OptionsPlaces />
			<Box as={"div"}>
				<PlacesList />
			</Box>
		</Box>
	);
}

export default PlacesPanel;
