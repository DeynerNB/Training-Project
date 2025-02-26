import { useEffect, useRef, useState } from "react";
import style from "./Header.module.scss";

import useClipboard from "../../hooks/useClipboard";
import useDocumentTitle from "../../hooks/useDocumentTitle";

import type { IHeaderProps } from "./Header.interface";

function Header(props: IHeaderProps) {
	const { locationName } = props;

	const input_text = useRef<HTMLInputElement>(null);

	const [title, setTitle] = useState("There is no location active");

	const { copyClipboard, pasteClipboard } = useClipboard();

	const { setDocumentTitle } = useDocumentTitle("Google Maps API");

	useEffect(() => {
		if (locationName) {
			setTitle(`Hello from ${locationName}`);
		}
	}, [locationName]);

	const handlePaste = () => {
		const value = pasteClipboard();

		if (input_text.current) {
			input_text.current.value = value;
		}
	};

	return (
		<div className={style["container-header"]}>
			<div className={style["container-header__location-options"]}>
				<h1 className={style["container-header__location-options__title"]}>
					{title}
				</h1>
			</div>
			<div>
				<input
					type="text"
					ref={input_text}
					id="header-input"
					className="input-text input-text--full"
				/>
				<div className="btn__group">
					<button
						type="button"
						className="btn btn--full"
						onClick={copyClipboard}
					>
						Copy
					</button>
					<button type="button" className="btn btn--full" onClick={handlePaste}>
						Paste
					</button>
					<button
						type="button"
						className="btn btn--full"
						onClick={() => setDocumentTitle(`Google Maps API ${Math.random()}`)}
					>
						<span className="material-symbols-outlined">restart_alt</span>
						Change title
					</button>
				</div>
			</div>
		</div>
	);
}

export default Header;
