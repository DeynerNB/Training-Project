import { Grid } from "@radix-ui/themes";
import { useWindowSize } from "usehooks-ts";
import GoogleMap from "./components/GoogleMap/GoogleMap";
import OptionPanel from "./components/OptionsPanel/OptionsPanel";
import PlacesList from "./components/PlacesList/PlacesList";
import { FilterProvider } from "./context/FilterContext/FilterContext";
import { GMapProvider } from "./context/GMapContext/GMapContext";

function App() {
	const { width } = useWindowSize();

	return (
		<GMapProvider>
			<FilterProvider>
				<Grid
					width={"100vw"}
					height={"100vh"}
					columns={{ initial: "1", sm: "1fr 2fr" }}
					rows={{ initial: "min-content 1fr", sm: "1" }}
				>
					<Grid
						minWidth={"300px"}
						rows={{ initial: "1", sm: "min-content 1fr" }}
						p={"3"}
						gap={"2"}
					>
						{/* Options panel */}
						<OptionPanel />

						{/* My places component */}
						{width < 768 ? <></> : <PlacesList />}
					</Grid>

					{/* Google map component */}
					<GoogleMap />
				</Grid>
			</FilterProvider>
		</GMapProvider>
	);
}

export default App;
