import { useState } from "react";

const useClipboard = () => {
	const [clipboardValue, setClipboardValue] = useState<string>("");

	const copyClipboard = () => {
		const value = window.getSelection()?.toString() || window.location.href;

		setClipboardValue(value);
	};

	const pasteClipboard = () => {
		return clipboardValue;
	};

	return { copyClipboard, pasteClipboard };
};

export default useClipboard;
