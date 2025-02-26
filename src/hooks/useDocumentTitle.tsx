import { useEffect, useState } from "react";

const useDocumentTitle = (title = "") => {
	const [documentTitle, setDocumentTitle] = useState<string>(title);

	useEffect(() => {
		document.title = documentTitle;
	}, [documentTitle]);

	return { setDocumentTitle };
};

export default useDocumentTitle;
