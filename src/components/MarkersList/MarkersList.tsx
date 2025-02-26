import style from "./MarkersList.module.scss";

import type { IMarkerListItem } from "../../interfaces/Marker.interface";
import type { IMarkersListProps } from "./MarkersList.interface";

function MarkersList(props: IMarkersListProps) {
	const { markersList, setMapPosition, removeMarker } = props;

	const handleUpdateMapPosition = (markerData: IMarkerListItem) => {
		const { marker } = markerData;
		const position = marker.position as google.maps.LatLngLiteral;

		const { lat, lng } = position;

		setMapPosition({ lat, lng });
	};

	return markersList.length === 0 ? (
		<div className="badge">
			<span className="material-symbols-outlined icon">location_on</span>
			<span>There are no markers</span>
		</div>
	) : (
		<div className={style["table-container"]}>
			<table className={style.table}>
				<thead className={style.table__header}>
					<tr className={style.table__row}>
						<th colSpan={2} className={style.table__cell__header}>
							Markers List
						</th>
					</tr>
				</thead>
				<tbody>
					{markersList.map((markerData) => {
						return (
							<tr key={markerData.id} className={style.table__row}>
								<td
									className={`${style.table__cell} ${style["table__cell--hover"]}`}
									onMouseDown={() => handleUpdateMapPosition(markerData)}
								>
									{markerData.id}
								</td>
								<td className={style.table__cell}>
									<span
										className={"icon icon__hover material-symbols-outlined"}
										onMouseDown={() => removeMarker(markerData.id)}
									>
										delete
									</span>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}

export default MarkersList;
