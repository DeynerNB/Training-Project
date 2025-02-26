import style from "./Spinner.module.scss";

/**
 * HTML AND CSS for this spinner was taken from:
 * https://cssloaders.github.io/
 */

function Spinner() {
	return <span className={style.loader} />;
}

export default Spinner;
