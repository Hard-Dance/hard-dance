import cx from "classnames";
import styles from "./GeneralTitleBar.module.scss";

const GeneralTitleBarComponent = (props: React.ComponentProps<"div">) => {
	const { className, children, ...rest } = props;

	return <div className={cx(styles.pageTitle, className)} {...rest}>
		{children}
	</div>;
};

const GeneralTitleBarPageTitle = (props: React.ComponentProps<"div">) => {
  const { children, ...rest } = props;
  return <h1 {...rest}>
    {children}
  </h1>;
}

const GeneralTitleBarPageTitleStart = (props: React.ComponentProps<"div">) => {
  const { className, ...rest } = props;
  return <div className={cx(styles.pageTitleStart, className)} {...rest} />;
}

const GeneralTitleBarPageTitleEnd = (props: React.ComponentProps<"div">) => {
  const { className, ...rest } = props;
  return <div className={cx(styles.pageTitleEnd, className)} {...rest} />;
}

const GeneralTitleBarPageTitleDrawer = (props: React.ComponentProps<"div">) => {
  const { className, ...rest } = props;
  return <div className={cx(styles.pageTitleDrawer, className)} {...rest} />;
}

export const GeneralTitleBar = Object.assign(
	GeneralTitleBarComponent,
	{
		PageTitle: GeneralTitleBarPageTitle, 
		PageTitleStart: GeneralTitleBarPageTitleStart,
		PageTitleEnd: GeneralTitleBarPageTitleEnd,
		PageTitleDrawer: GeneralTitleBarPageTitleDrawer,
	},
);