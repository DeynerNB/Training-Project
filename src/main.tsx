import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

import "@radix-ui/themes/styles.css";
import "./styles/global.scss";

import { Theme } from "@radix-ui/themes";

const LoadInitialGoogleMapScript = () => {
	const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
	const API_URL = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&loading=async&callback=initMap&libraries=marker,places&v=beta`;

	window.initMap = () => {};

	const scriptNode = document.createElement("script");
	scriptNode.id = "google-map-initial-script";
	scriptNode.type = "text/javascript";
	scriptNode.src = API_URL;
	scriptNode.defer = true;

	document.head.appendChild(scriptNode);
};

LoadInitialGoogleMapScript();

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Theme
			accentColor="yellow"
			grayColor="gray"
			panelBackground="solid"
			scaling="100%"
			radius="medium"
		>
			<App />
		</Theme>
	</StrictMode>,
);
