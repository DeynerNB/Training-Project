import { useState } from "react";
import styles from "./App.module.scss";

import Header from "./components/Header/Header";
import MapView from "./components/MapView/MapView";
import { MarkersListProvider } from "./context/MapListContext/MapListContext";

import { Grid, Tabs } from "@radix-ui/themes";
import GoogleMap from "./components/GoogleMap/GoogleMap";
import PlacesPanel from "./components/PlacesPanel/PlacesPanel";

function App() {
	// const [locationName, setLocationName] = useState<string>("");

	// const handleLocationName = (name: string) => {
	// 	setLocationName(name);
	// };

	return (
		// <div className={styles.container}>
		// 	<Header locationName={locationName} />
		// 	<hr />
		// 	<MarkersListProvider>
		// 		<MapView handleLocationName={handleLocationName} />
		// 	</MarkersListProvider>
		// </div>
		<Grid
			width={"100vw"}
			height={"100vh"}
			columns={{ initial: "1", sm: "1fr 2fr" }}
			rows={{ initial: "2", sm: "1" }}
			p={"3"}
			gap={"3"}
		>
			{/* Panel component */}
			<Tabs.Root defaultValue="tab1">
				<Tabs.List>
					<Tabs.Trigger value={"tab1"} style={{ flexGrow: "1" }}>
						My Places
					</Tabs.Trigger>
					<Tabs.Trigger value={"tab2"} style={{ flexGrow: "1" }}>
						Add Place
					</Tabs.Trigger>
				</Tabs.List>

				<Tabs.Content value={"tab1"}>
					<PlacesPanel />
				</Tabs.Content>
				<Tabs.Content value={"tab2"}>
					{/* <PlacesPanel /> */}
					<p>Nuevno</p>
				</Tabs.Content>
			</Tabs.Root>

			{/* Google map component */}
			<GoogleMap />
		</Grid>

		// <div>
		// 	<GoogleMap />
		// </div>
	);
}

export default App;
