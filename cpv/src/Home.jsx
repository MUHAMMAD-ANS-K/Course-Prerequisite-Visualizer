import { useEffect, useRef, useState } from "react"
import "./home.css"
import { gsap } from "gsap/gsap-core";

export default function Home() {
    const [currentSelection, setSelection] = useState("v");
    const [answer, setAnswer] = useState("No");
    // const timeoutref = useRef();
    // const index = useRef(1);
    // useEffect(()=>{
    //     const items = ["v", "u", "p", "e", "s"];

    //      gsap.delayedCall(2, setSelection(s => {console.log(index.current);index.current = (index.current + 1) % 5;;return items[index - 1];}))


    // }, [])
    function questionHandler(e) {
        if(answer != "No"){
            let el = document.querySelector(`.plus${answer}`).children[1].children[1];
            gsap.to(el, {
                rotate : "90deg",
                overwrite : "auto"
            })
        }
        let temp = e.currentTarget.classList[1];
        let temp2 = temp.replace(/[a-zA-Z]/g, "");
        if(temp2 != answer){
            setAnswer(temp2);
            let el = document.querySelector(`.${temp}`).children[1].children[1];
            console.log(el);
            gsap.to(el, {
                rotate : "0deg",
                overwrite : "auto"
            })
        }
        else{
            setAnswer("No");
        }
        // const el2 = e.currentTarget
        // gsap.to(, {
        //     rotate : "180deg",
        //     overwrite : "auto"
        // })
    }
    function activeButtonHandler(e, active){
        setSelection(s => active); 
        document.querySelector(".active-button").classList.remove("active-button");
        e.currentTarget.classList.add("active-button") 
    }
    return (
        <>
            <div className="main-text">
                <div className="first-part">
                    <div className="plain-part">
                        WHERE
                    </div>
                    <div className="plain-part">
                        YOUR PATHS
                    </div>
                    <div className="blue-part">
                        BECOME CLEAR
                    </div>
                </div>
                <div className="second-part">
                    <div>Everything is built and designed</div> <div>to help students so that they can understand their </div> <div>degree structure by eliminating prerequisite confusion</div> <div> and thus achieve their goals.</div>
                </div>
                <div className="nav-button-2">Search Courses</div>
            </div>
            <div className="benefit-text-container">
                <div className="green-buttons">
                    <div className="active-button green-button" onClick={(e) => { setSelection(s => "v"); document.querySelector(".active-button").classList.remove("active-button"); e.currentTarget.classList.add("active-button") }}>Visualize</div>
                    <div className="green-button" onClick={(e) => activeButtonHandler(e, "u")}>Understand</div>
                    <div className="green-button" onClick={(e) => activeButtonHandler(e, "p")}>Plan</div>
                    <div className="green-button" onClick={(e) => activeButtonHandler(e, "e") }>Explore</div>
                    <div className="green-button" onClick={(e) => activeButtonHandler(e, "s") }>Simplify</div>
                </div>
                <div className="benefit-text">
                    {currentSelection == "v" ? <div>Turn prerequisite data into clear graphical relationships.</div> : <></>}
                    {currentSelection == "u" ? <div>Quickly grasp course dependencies and academic structure at a glance.</div> : <></>}
                    {currentSelection == "p" ? <div>Understand course dependencies to plan your academic path.</div> : <></>}
                    {currentSelection == "e" ? <div>Search and inspect individual courses to view their prerequisite relationships.</div> : <></>}
                    {currentSelection == "s" ? <div>Reduce complexity by presenting academic data in a clear and organized way.</div> : <></>}
                </div>
            </div>
            <div className="white-container">
                <div className="resources">
                    <div className="resource resource-1">
                        <div className="date">DEC 27, 2025</div>
                        <div className="heading">Get Started</div>
                        <div className="paragraph">Lorem ipsum dolor, Consectetur consequatur exercitationem quae a voluptatem, molestias veritatis nulla tempore nam cupiditate deleniti. Nulla ea aut asperiores exercitationem eligendi porro enim? Esse iusto corrupti commodi qui voluptatem amet laboriosam nesciunt voluptates assumenda?</div>
                        <div className="separator"></div>
                        <div className="learn-more">Learn More <span className="arrow">&rarr;</span></div>
                    </div>
                    <div className="resource resource-1">
                        <div className="date">DEC 27, 2025</div>
                        <div className="heading">Get Started</div>
                        <div className="paragraph">Lorem ipsum dolor, Consectetur consequatur exercitationem quae a voluptatem, molestias veritatis nulla tempore nam cupiditate deleniti. Nulla ea aut asperiores exercitationem eligendi porro enim? Esse iusto corrupti commodi qui voluptatem amet laboriosam nesciunt voluptates assumenda?</div>
                        <div className="separator"></div>
                        <div className="learn-more">Learn More <span className="arrow">&rarr;</span></div>
                    </div>
                    <div className="resource resource-1">
                        <div className="date">DEC 27, 2025</div>
                        <div className="heading">Get Started</div>
                        <div className="paragraph">Lorem ipsum dolor, Consectetur consequatur exercitationem quae a voluptatem, molestias veritatis nulla tempore nam cupiditate deleniti. Nulla ea aut asperiores exercitationem eligendi porro enim? Esse iusto corrupti commodi qui voluptatem amet laboriosam nesciunt voluptates assumenda?</div>
                        <div className="separator"></div>
                        <div className="learn-more">Learn More <span className="arrow">&rarr;</span></div>
                    </div>
                </div>
                <div className="frequently-asked-questions">
                    <div className="heading">
                        Frequently Asked Questions
                    </div>
                    <div className="flex-container">
                        <div className="question">
                            <div className="separator"></div>
                            <div className="question-wrapper plus1"  onClick={questionHandler}><span className="actual-question">How does CPV works?</span><span className="plus">
                                <span className="plus-1"></span>
                                <span className="plus-2"></span>
                            </span>
                            </div>
                            {answer == "1" ? <div className="answer">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt, sapiente non vero, deserunt qui eveniet voluptate, voluptates quos dolor delectus praesentium nulla a excepturi esse.</div> : <></>}
                            </div>
                        <div className="question">
                            <div className="separator"></div>
                            <div className="question-wrapper plus2"  onClick={questionHandler}><span className="actual-question">How does CPV works?</span><span className="plus">
                                <span className="plus-1"></span>
                                <span className="plus-2"></span>
                            </span>
                            </div>
                            {answer == "2" ? <div className="answer">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt, sapiente non vero, deserunt qui eveniet voluptate, voluptates quos dolor delectus praesentium nulla a excepturi esse.</div> : <></>}
                            </div>
                        <div className="question">
                            <div className="separator"></div>
                            <div className="question-wrapper plus3" onClick={questionHandler}><span className="actual-question">How does CPV works?</span><span className="plus">
                                <span className="plus-1"></span>
                                <span className="plus-2"></span>
                            </span>
                            </div>
                            {answer == "3" ? <div className="answer">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt, sapiente non vero, deserunt qui eveniet voluptate, voluptates quos dolor delectus praesentium nulla a excepturi esse.</div> : <></>}
                            </div>
                    </div>
                </div>
            </div>
        </>
    )
}