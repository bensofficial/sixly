import React from "react";
import "./ContentTile.css";
import { Content } from "./App";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
} from "recharts";

type ContentTileProps = {
	content: Content;
};

function ContentTile({ content }: ContentTileProps) {
	return (
		<div className={"sixly-contenttile"}>
			<div className={"sixly-contenttile-header"}>
				<img
					className={"sixly-contenttile-image"}
					src={content.logoUrl}
					alt={`Logo ${content.fond}`}
				/>
				{content.fond}
				<span className={"sixly-contenttile-score"}>
					{content.score}
				</span>
			</div>
			<div className={"sixly-contenttile-sector"}>{content.sector}</div>
			<LineChart
				className={"sixly-contenttile-chart"}
				width={400}
				height={300}
				data={content.prices}
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="date" />
				<YAxis />
				<Tooltip
					labelFormatter={(value) => {
						const date =
							value.getDate() +
							"-" +
							parseInt(value.getMonth() + 1) +
							"-" +
							value.getFullYear();
						const time =
							value.getHours() +
							":" +
							value.getMinutes() +
							":" +
							value.getSeconds();
						return `${date} ${time}`;
					}}
				/>
				<Line
					type="monotone"
					dataKey="price"
					stroke="#8884d8"
					dot={false}
				/>
			</LineChart>
		</div>
	);
}

export default ContentTile;
