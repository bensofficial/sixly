import React, { useState } from "react";
import "./App.css";
import {
	faCoins,
	faFireFlameCurved,
	faPercent,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ContentTile from "./ContentTile";

interface Story {
	company: string;
	news: string;
	logoUrl: string;
}

export interface Content {
	company: string;
	logoUrl: string;
	sector: string;
	prices: Array<{
		date: Date;
		price: number;
	}>;
}

function App() {
	// one number for each of the four stories
	const [storyShown, setStoryShown] = useState(-1);
	// 1: Greatest change in last x hours
	// 2: Trending
	// 3: Greatest capital
	const [siteShown, setSiteShown] = useState(1);
	let timeout: NodeJS.Timeout | undefined;

	const stories: Array<Story> = [
		{
			company: "Google",
			news: "Google is a search engine",
			logoUrl:
				"https://static.giga.de/wp-content/uploads/2018/12/Google-logo-G-icon-symbol-2021.jpg",
		},
		{
			company: "Twitter",
			news: "Twitter is also called X",
			logoUrl:
				"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/512px-Logo_of_Twitter.svg.png",
		},
		{
			company: "Microsoft",
			news: "Microsoft created Windows",
			logoUrl:
				"https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png",
		},
		{
			company: "Amazon",
			news: "Amazon is a online marketplace.",
			logoUrl:
				"https://i.pinimg.com/736x/0a/06/60/0a06600cc3cedeb49280b54114c88ce6.jpg",
		},
	];

	const contentSiteOne: Array<Content> = [
		{
			company: "Microsoft",
			logoUrl:
				"https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png",
			sector: "IT",
			prices: [
				{
					date: new Date(2023, 0, 1, 1, 0, 0),
					price: 20,
				},
				{
					date: new Date(2023, 5, 1, 1, 0, 0),
					price: 20,
				},
				{
					date: new Date(2024, 0, 1, 1, 0, 0),
					price: 30,
				},
			],
		},
		{
			company: "Amazon",
			logoUrl:
				"https://i.pinimg.com/736x/0a/06/60/0a06600cc3cedeb49280b54114c88ce6.jpg",
			sector: "Shopping",
			prices: [
				{
					date: new Date(2023, 0, 1, 1, 0, 0),
					price: 1,
				},
				{
					date: new Date(2023, 5, 1, 1, 0, 0),
					price: 20,
				},
				{
					date: new Date(2024, 0, 1, 1, 0, 0),
					price: 6,
				},
			],
		},
	];
	const contentSiteTwo: Array<Content> = [];
	const contentSiteThree: Array<Content> = [];

	function showStory(storyPosition: number) {
		setStoryShown(storyPosition);
		timeout = setTimeout(() => hideStoryShown(), 10 * 1000);
	}

	function hideStoryShown() {
		clearTimeout(timeout);
		setStoryShown(-1);
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
					<h1>sixly</h1>
					<div className={"sixly-stories"}>
						{stories.map((story, index) => {
							return (
								<div
									className={"sixly-story"}
									onClick={() => showStory(index)}
								>
									<img
										className={"sixly-story-image"}
										src={story.logoUrl}
										alt={`Logo ${story.company}`}
									/>
									<br />
									{story.company}
								</div>
							);
						})}
					</div>

					<div className={"sixly-content"}>
						{siteShown === 1 &&
							contentSiteOne.map((content) => {
								return <ContentTile content={content} />;
							})}
						{siteShown === 1 && contentSiteOne.length === 0 && (
							<>No content could be loaded.</>
						)}
						{siteShown === 2 &&
							contentSiteTwo.map((content) => {
								return <ContentTile content={content} />;
							})}
						{siteShown === 2 && contentSiteTwo.length === 0 && (
							<>No content could be loaded.</>
						)}
						{siteShown === 3 &&
							contentSiteThree.map((content) => {
								return <ContentTile content={content} />;
							})}
						{siteShown === 3 && contentSiteThree.length === 0 && (
							<>No content could be loaded.</>
						)}
					</div>
				</div>
				<footer className={"sixly-footer"}>
					<FontAwesomeIcon
						className={"sixly-footer-icon"}
						icon={faPercent}
						onClick={() => setSiteShown(1)}
					/>
					<FontAwesomeIcon
						className={"sixly-footer-icon"}
						icon={faFireFlameCurved}
						onClick={() => setSiteShown(2)}
					/>
					<FontAwesomeIcon
						className={"sixly-footer-icon"}
						icon={faCoins}
						onClick={() => setSiteShown(3)}
					/>
				</footer>
				<div className={"sixly-overlay"}></div>
			</>
		);
	}
}

export default App;
