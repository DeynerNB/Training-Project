import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

import "@radix-ui/themes/styles.css";
import "./styles/global.scss";

import { Theme } from "@radix-ui/themes";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Theme
			accentColor="cyan"
			grayColor="gray"
			panelBackground="solid"
			scaling="100%"
			radius="full"
		>
			<App />
		</Theme>
	</StrictMode>,
);
