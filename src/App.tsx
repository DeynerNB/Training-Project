import { Grid } from "@radix-ui/themes";
import GoogleMap from "./components/GoogleMap/GoogleMap";
import PlacesList from "./components/PlacesList/PlacesList";
import OptionPanel from "./components/PlacesPanel/OptionsPanel";

function App() {
	return (
		<Grid
			width={"100vw"}
			height={"100vh"}
			columns={{ initial: "1", sm: "1fr 1fr 2fr" }}
			rows={{ initial: "2", sm: "1" }}
		>
			{/* Options panel */}
			<OptionPanel />

			{/* My places component */}
			<PlacesList />

			{/* Google map component */}
			<GoogleMap />
		</Grid>
	);
}

export default App;
