import React, {useState} from 'react';
import './App.css';

interface Story {
    company: string,
    news: string,
    logoUrl: string,
}

function App() {
    const [isShowingStoryOne, setShowStoryOne] = useState(false)
    const [isShowingStoryTwo, setShowStoryTwo] = useState(false)
    const [isShowingStoryThree, setShowStoryThree] = useState(false)
    const [isShowingStoryFour, setShowStoryFour] = useState(false)

    let timeout: NodeJS.Timeout | undefined

    function showStoryOne() {
        setShowStoryOne(true)
        timeout = setTimeout(() => setShowStoryOne(false), 10*1000)
    }

    function showStoryTwo() {
        setShowStoryTwo(true)
        timeout = setTimeout(() => setShowStoryTwo(false), 10*1000)
    }

    function showStoryThree() {
        setShowStoryThree(true)
        timeout = setTimeout(() => setShowStoryThree(false), 10*1000)
    }

    function showStoryFour() {
        setShowStoryFour(true)
        timeout = setTimeout(() => setShowStoryFour(false), 10*1000)
    }

    const storyOne: Story = {
        company: "Google",
        news: "Google is a search engine",
        logoUrl: "https://static.giga.de/wp-content/uploads/2018/12/Google-logo-G-icon-symbol-2021.jpg",
    }

    const storyTwo: Story = {
        company: "Twitter",
        news: "Twitter is also called X",
        logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/512px-Logo_of_Twitter.svg.png",
    }

    const storyThree: Story = {
        company: "Microsoft",
        news: "Microsoft created Windows",
        logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png",
    }

    const storyFour: Story = {
        company: "Amazon",
        news: "Amazon is a online marketplace.",
        logoUrl: "https://i.pinimg.com/736x/0a/06/60/0a06600cc3cedeb49280b54114c88ce6.jpg",
    }

    if (isShowingStoryOne) {
        return (
            <div className={"sixly-show-story-background"}>
                <div className="sixly-show-story" onClick={() => {
                    clearTimeout(timeout)
                    setShowStoryOne(false)
                }}>
                    {storyOne.news}
                </div>
            </div>
        );
    } else if (isShowingStoryTwo) {
        return (
            <div className={"sixly-show-story-background"}>
                <div className="sixly-show-story" onClick={() => {
                    clearTimeout(timeout)
                    setShowStoryTwo(false)
                }}>
                    {storyTwo.news}
                </div>
            </div>
        );
    } else if (isShowingStoryThree) {
        return (
            <div className={"sixly-show-story-background"}>
                <div className="sixly-show-story" onClick={() => {
                    clearTimeout(timeout)
                    setShowStoryThree(false)
                }}>
                    {storyThree.news}
                </div>
            </div>
        );
    } else if (isShowingStoryFour) {
        return (
            <div className={"sixly-show-story-background"}>
                <div className="sixly-show-story" onClick={() => {
                    clearTimeout(timeout)
                    setShowStoryFour(false)
                }}>
                    {storyFour.news}
                </div>
            </div>
        );
    } else {
        return (
            <>
                <div className="sixly">
                    <h1>sixly</h1>
                    <div className={"sixly-stories"}>
                        <div className={"sixly-story"} onClick={() => showStoryOne()}>
                            <img className={"sixly-story-image"}
                                 src={storyOne.logoUrl} alt={`Logo ${storyOne.company}`}/>
                            <br/>
                            {storyOne.company}
                        </div>
                        <div className={"sixly-story"} onClick={() => showStoryTwo()}>
                            <img className={"sixly-story-image"}
                                 src={storyTwo.logoUrl} alt={`Logo ${storyTwo.company}`}/>
                            <br/>
                            {storyTwo.company}
                        </div>
                        <div className={"sixly-story"} onClick={() => showStoryThree()}>
                            <img className={"sixly-story-image"}
                                 src={storyThree.logoUrl} alt={`Logo ${storyThree.company}`}/>
                            <br/>
                            {storyThree.company}
                        </div>
                        <div className={"sixly-story"} onClick={() => showStoryFour()}>
                            <img className={"sixly-story-image"}
                                 src={storyFour.logoUrl} alt={`Logo ${storyFour.company}`}/>
                            <br/>
                            {storyFour.company}
                        </div>
                    </div>

                    <div>
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
                <footer>
                    hello
                </footer>
                <div className={"sixly-overlay"}></div>
            </>
        );
    }
}

export default App;
