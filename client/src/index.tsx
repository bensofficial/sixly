import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement,
);

const width = document.documentElement.clientWidth;
console.log(width);
if (width < 450) {
	// c.f. https://stackoverflow.com/a/15010718 and https://stackoverflow.com/a/25683272
	document.querySelector("meta[name=viewport]")?.setAttribute(
		"content",
		// eslint-disable-next-line max-len
		"width=device-width, initial-scale=" +
			(width / 450 - 0.05) +
			", maximum-scale=" +
			(width / 450 - 0.05) +
			", user-scalable=0",
	);
	console.error("here");
}

root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
