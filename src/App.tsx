import { Grid } from "@radix-ui/themes";
import GoogleMap from "./components/GoogleMap/GoogleMap";
import OptionPanel from "./components/OptionsPanel/OptionsPanel";
import PlacesList from "./components/PlacesList/PlacesList";
import { FilterProvider } from "./context/FilterContext/FilterContext";
import { GMapProvider } from "./context/GMapContext/GMapContext";

function App() {
	return (
		<GMapProvider>
			<FilterProvider>
				<Grid
					width={"100vw"}
					height={"100vh"}
					columns={{ initial: "1", sm: "1fr 3fr" }}
					rows={{ initial: "2", sm: "1" }}
				>
					<Grid minWidth={"300px"} rows={"min-content 1fr"} p={"3"}>
						{/* Options panel */}
						<OptionPanel />

						{/* My places component */}
						<PlacesList />
					</Grid>

					{/* Google map component */}
					<GoogleMap />
				</Grid>
			</FilterProvider>
		</GMapProvider>
	);
}

export default App;
