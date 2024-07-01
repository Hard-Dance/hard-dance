import { Header } from "../components/Header";
import WidgetBot from "@widgetbot/react-embed";
import { ClientOnly } from "remix-utils/client-only";

export default function Index() {
	return (
		<>
			<Header />
			<ClientOnly>
				{() => (
					<WidgetBot
						className="widgetbot"
						/* eslint-disable @typescript-eslint/no-explicit-any */
						// biome-ignore lint/suspicious/noExplicitAny: Manually added properties to window
						server={(window as any).ENV.WSR}
						// biome-ignore lint/suspicious/noExplicitAny: Manually added properties to window
						channel={(window as any).ENV.WSC}
						/* eslint-enable */
					/>
				)}
			</ClientOnly>
		</>
	);
}
