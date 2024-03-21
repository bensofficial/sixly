import React, { useEffect, useState } from "react";
import "./App.css";
import {
	faCoins,
	faFireFlameCurved,
	faPercent,
	faQuestion,
} from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ContentTile from "./ContentTile";
import logo from "./logo.png";
import { Multiselect } from "multiselect-react-dropdown";
import { Tooltip } from "react-tooltip";

interface Story {
	fond: string;
	news: string;
	logoUrl: string;
}

export interface Content {
	fond: string;
	logoUrl: string;
	sector: string;
	score: string;
	prices: Array<{
		date: Date;
		price: number;
	}>;
}

const rootUrl = "http://localhost:8080";

function App() {
	// one number for each of the four stories
	const [storyShown, setStoryShown] = useState(-1);
	// 1: Greatest change in last x hours
	// 2: Trending
	// 3: Greatest capital
	const [siteShown, setSiteShown] = useState(1);
	let timeout: NodeJS.Timeout | undefined;

	let [stories, setStories] = useState<Story[]>([]);
	let [contentList, setContentList] = useState<Content[]>([]);

	useEffect(() => {
		fetch(`${rootUrl}/api/sixly/news`)
			.then((response) => response.json())
			.then((data) => {
				setStories(data);
			});
	}, []);

	useEffect(() => {
		fetchContent(1);
	}, []);

	function fetchContent(currentlyShownSide: number) {
		fetch(`${rootUrl}/api/sixly/content/${currentlyShownSide}`)
			.then((response) => response.json())
			.then((data) => {
				data = data.map((entry: any) => {
					return {
						fond: entry.fond,
						logoUrl: entry.logoUrl,
						sector: entry.sector,
						score: entry.score,
						prices: entry.prices.map((priceEntry: any) => {
							return {
								date: new Date(priceEntry.date),
								price: priceEntry.price,
							};
						}),
					};
				});
				setContentList(data);
			});
	}

	function fetchContentWithSelectedList(
		currentlyShownSide: number,
		selectedList: any,
	) {
		const keywords = selectedList
			.map((selected: any) => selected.name)
			.join(",")
			.toLowerCase();

		fetch(
			`${rootUrl}/api/sixly/content/${currentlyShownSide}?keywords=${keywords}`,
		)
			.then((response) => response.json())
			.then((data) => {
				data = data.map((entry: any) => {
					return {
						fond: entry.fond,
						logoUrl: entry.logoUrl,
						sector: entry.sector,
						score: entry.score,
						prices: entry.prices.map((priceEntry: any) => {
							return {
								date: new Date(priceEntry.date),
								price: priceEntry.price,
							};
						}),
					};
				});
				setContentList(data);
			});
	}

	function showStory(storyPosition: number) {
		setStoryShown(storyPosition);
		timeout = setTimeout(() => hideStoryShown(), 10 * 1000);
	}

	function hideStoryShown() {
		clearTimeout(timeout);
		setStoryShown(-1);
	}

	function onSelect(selectedList: any, selectedItem: any) {
		fetchContentWithSelectedList(siteShown, selectedList);
	}

	function onRemove(selectedList: any, removedItem: any) {
		fetchContentWithSelectedList(siteShown, selectedList);
	}

	if (storyShown >= 0) {
		return (
			<div className={"sixly-show-story-background"}>
				<div
					className="sixly-show-story"
					onClick={() => hideStoryShown()}
				>
					{stories[storyShown].news}
				</div>
			</div>
		);
	} else {
		return (
			<>
				<div className="sixly">
					<div className={"sixly-header"}>
						<img className={"sixly-logo"} src={logo}></img>
						<span>sixly</span>
						<span className={"sixly-user"}>
							<FontAwesomeIcon icon={faUser} />
						</span>
					</div>
					<div className={"sixly-stories"}>
						{stories &&
							stories.map((story, index) => {
								return (
									<div
										className={"sixly-story"}
										onClick={() => showStory(index)}
									>
										<img
											className={"sixly-story-image"}
											src={story.logoUrl}
											alt={`Logo ${story.fond}`}
										/>
										<br />
										{story.fond}
									</div>
								);
							})}
					</div>

					<div className={"sixly-select-information"}>
						Select
						<a
							className={"sixly-tooltip"}
							data-tooltip-id={"select-tooltip"}
							data-tooltip-content={
								"Select categories that are important to you when investing.\n" +
								"Sustainability: \n" +
								"Risk: \n" +
								"Return: "
							}
						>
							<FontAwesomeIcon icon={faQuestion} />
						</a>
					</div>
					<Tooltip id="select-tooltip" />
					<Multiselect
						className={"sixly-select"}
						options={[
							{ name: "Sustainability", id: 1 },
							{ name: "Risk", id: 2 },
							{ name: "Return", id: 3 },
						]}
						onSelect={onSelect}
						onRemove={onRemove}
						placeholder={""}
						displayValue="name"
						style={{
							chips: {
								background: "darkviolet",
							},
							multiselectContainer: {
								color: "darkviolet",
							},
							searchBox: {
								border: "1px solid grey",
								borderBottom: "solid",
							},
						}}
					/>

					<div className={"sixly-content"}>
						{contentList &&
							contentList.map((content) => {
								return <ContentTile content={content} />;
							})}
					</div>
				</div>
				<footer className={"sixly-footer"}>
					<div className={"sixly-footer-item"}>
						<FontAwesomeIcon
							className={"sixly-footer-icon"}
							icon={faPercent}
							onClick={() => {
								setSiteShown(1);
								fetchContent(1);
							}}
						/>
						<br />
						Biggest Change
					</div>
					<div className={"sixly-footer-item"}>
						<FontAwesomeIcon
							className={"sixly-footer-icon"}
							icon={faFireFlameCurved}
							onClick={() => {
								setSiteShown(2);
								fetchContent(2);
							}}
						/>
						<br />
						Trending
					</div>
					<div className={"sixly-footer-item"}>
						<FontAwesomeIcon
							className={"sixly-footer-icon"}
							icon={faCoins}
							onClick={() => {
								setSiteShown(3);
								fetchContent(3);
							}}
						/>
						<br />
						Top Stocks
					</div>
				</footer>
				<div className={"sixly-overlay"}></div>
			</>
		);
	}
}

export default App;
