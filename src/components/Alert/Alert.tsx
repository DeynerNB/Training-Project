import type { IAlertProps } from "./Alert.interface";

function Alert(props: IAlertProps) {
	const { content } = props;

	return <div className="alert">{content}</div>;
}

export default Alert;
