import { Grid } from "@radix-ui/themes";
import GoogleMap from "./components/GoogleMap/GoogleMap";
import OptionPanel from "./components/OptionsPanel/OptionsPanel";
import PlacesList from "./components/PlacesList/PlacesList";
import { GMapProvider } from "./context/GMapContext/GMapContext";

function App() {
	return (
		<GMapProvider>
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
		</GMapProvider>
	);
}

export default App;
