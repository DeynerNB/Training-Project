import { useState } from "react";

import useForm from "../../hooks/useForm";
import Alert from "../Alert/Alert";
import style from "./FormLocation.module.scss";

import type { ICoordinates } from "../../interfaces/Coordinates.interface";
import type { IFormLocationProps } from "./FormLocation.interfaces";

function FormLocation(props: IFormLocationProps) {
	const { submitMarker } = props;

	// Form custom hooks
	const [markerName, validState_MarkerName, handleMarkerNameChange] = useForm({
		initialValue: "Ubicacion",
		validationFunction: (v) => {
			return typeof v === "string";
		},
	});
	const [markerLat, validState_MarkerLat, handleMarkerLatChange] = useForm({
		initialValue: "9.996898",
		validationFunction: (v) => {
			return !Number.isNaN(+v);
		},
	});
	const [markerLng, validState_MarkerLng, handleMarkerLngChange] = useForm({
		initialValue: "-84.114893",
		validationFunction: (v) => {
			return !Number.isNaN(+v);
		},
	});

	const [showAlert, setShowAlert] = useState(false);

	const handleSubmitMarker = () => {
		// Check if all forms has a valid state
		if (validState_MarkerName && validState_MarkerLat && validState_MarkerLng) {
			const position: ICoordinates = {
				lat: Number.parseFloat(markerLat),
				lng: Number.parseFloat(markerLng),
			};

			submitMarker({
				id: markerName,
				position,
			});
			return;
		}

		// If not -> Display an alert message
		setShowAlert(true);
		setTimeout(() => {
			setShowAlert(false);
		}, 3000);
	};

	return (
		<form className={style.form}>
			<div className={style.form__header}>
				<h3>Complete this information to add a new marker</h3>
			</div>
			<div className="form__group">
				<label htmlFor="markerName">Name</label>
				<input
					id="markerName"
					className={`input-text input-text--full ${validState_MarkerName ? "" : "input-text--wrong"}`}
					type="text"
					value={markerName}
					onChange={handleMarkerNameChange}
				/>
			</div>
			<div className={style.form__group}>
				<div>
					<label htmlFor="markerLat">Latitude</label>
					<input
						id="markerLat"
						className={`input-text input-text--full ${validState_MarkerLat ? "" : "input-text--wrong"}`}
						type="text"
						value={markerLat}
						onChange={handleMarkerLatChange}
					/>
				</div>
				<div>
					<label htmlFor="markerLng">Longitude</label>
					<input
						id="markerLng"
						className={`input-text input-text--full ${validState_MarkerLng ? "" : "input-text--wrong"}`}
						type="text"
						value={markerLng}
						onChange={handleMarkerLngChange}
					/>
				</div>
			</div>
			<div className="form__group">
				<button
					type="button"
					onClick={handleSubmitMarker}
					className="btn btn-full"
				>
					Add marker
				</button>
			</div>

			{showAlert && (
				<Alert content={"There is some invalid data in the form"} />
			)}
		</form>
	);
}

export default FormLocation;
