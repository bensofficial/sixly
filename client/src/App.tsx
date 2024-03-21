import React, {useState} from 'react';
import './App.css';
import {faCoins, faFireFlameCurved, faPercent} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Story {
    company: string,
    news: string,
    logoUrl: string,
}

function App() {
    // one number for each of the four stories
    const [storyShown, setStoryShown] = useState(-1)
    // 1: Greatest change in last x hours
    // 2: Trending
    // 3: Greatest capital
    const [siteShown, setSiteShown] = useState(1)
    let timeout: NodeJS.Timeout | undefined

    function showStory(storyPosition: number) {
        setStoryShown(storyPosition)
        timeout = setTimeout(() => hideStoryShown(), 10*1000)
    }

    function hideStoryShown() {
        clearTimeout(timeout)
        setStoryShown(-1)
    }

    const stories: Array<Story> = [{
        company: "Google",
        news: "Google is a search engine",
        logoUrl: "https://static.giga.de/wp-content/uploads/2018/12/Google-logo-G-icon-symbol-2021.jpg",
    }, {
        company: "Twitter",
        news: "Twitter is also called X",
        logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/512px-Logo_of_Twitter.svg.png",
    }, {
        company: "Microsoft",
        news: "Microsoft created Windows",
        logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png",
    }, {
        company: "Amazon",
        news: "Amazon is a online marketplace.",
        logoUrl: "https://i.pinimg.com/736x/0a/06/60/0a06600cc3cedeb49280b54114c88ce6.jpg",
    },
    ]

    if (storyShown >= 0) {
        return (
            <div className={"sixly-show-story-background"}>
                <div className="sixly-show-story" onClick={() => hideStoryShown()}>
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
                                <div className={"sixly-story"} onClick={() => showStory(index)}>
                                    <img className={"sixly-story-image"}
                                         src={story.logoUrl} alt={`Logo ${story.company}`}/>
                                    <br/>
                                    {story.company}
                                </div>
                            );
                        })}
                    </div>

                    <div className={"sixly-content"}>
                        {siteShown === 1 && <div>page one</div>}
                        {siteShown === 2 && <div>page two</div>}
                        {siteShown === 3 && <div>page tree</div>}

                        stories<br/>
                        stories<br/>
                        stories<br/>
                        stories<br/>
                        stories<br/>
                        stories<br/>
                        stories<br/>
                        stories<br/>
                        stories<br/>
                        stories<br/>
                        stories<br/>
                        stories<br/>
                        stories<br/>
                        stories<br/>
                        stories<br/>
                        stories<br/>
                        stories<br/>
                        stories<br/>
                        stories<br/>
                        stories<br/>
                        stories<br/>
                        stories<br/>
                        stories<br/>
                        stories<br/>
                        stories<br/>
                        stories<br/>
                        stories<br/>
                        stories<br/>
                        stories<br/>
                        stories<br/>
                        stories<br/>
                        stories<br/>
                        stories<br/>
                        stories<br/>
                        stories<br/>
                        stories<br/>
                        stories<br/>
                        stories<br/>
                        stories<br/>
                        stories<br/>
                        stories<br/>
                        stories<br/>
                        stories<br/>
                        stories<br/>
                        stories<br/>
                        stories<br/>
                        stories<br/>
                        stories<br/>
                        stories<br/>
                        stories<br/>
                        stories<br/>
                        stories<br/>
                        stories<br/>
                        stories<br/>
                        stories<br/>
                        stories<br/>
                        stories<br/>
                        stories<br/>
                        stories<br/>
                        stories<br/>
                        stories<br/>
                        stories<br/>
                        stories<br/>
                        stories<br/>
                        stories<br/>
                        stories<br/>
                        stories<br/>
                        stories<br/>
                        stories<br/>
                        stories<br/>
                        stories<br/>
                        stories<br/>
                        stories<br/>
                        stories<br/>
                        stories<br/>
                        stories<br/>
                        stories<br/>
                    </div>
                </div>
                <footer className={"sixly-footer"}>
                    <FontAwesomeIcon className={"sixly-footer-icon"} icon={faPercent} onClick={() => setSiteShown(1)} />
                    <FontAwesomeIcon className={"sixly-footer-icon"} icon={faFireFlameCurved} onClick={() => setSiteShown(2)} />
                    <FontAwesomeIcon className={"sixly-footer-icon"} icon={faCoins} onClick={() => setSiteShown(3)} />
                </footer>
                <div className={"sixly-overlay"}></div>
            </>
        );
    }
}

export default App;
