import cx from "classnames";
import styles from "./GenericGrid.module.css";

const GenericGridComponent = (props: React.ComponentProps<"div">) => {
	const { className, children } = props;

	return <ol className={cx(styles.grid, className)}>{children}</ol>;
};

const GenericGridItem = (props: React.ComponentProps<"li">) => {
	const { className, children } = props;

	return <li className={cx(styles.item, className)}>{children}</li>;
};

export const GenericGrid = Object.assign(GenericGridComponent, {
	Item: GenericGridItem,
});
