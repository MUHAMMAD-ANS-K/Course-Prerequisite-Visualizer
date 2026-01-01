import "./About.css"
import AboutComp from "./AboutComp";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap/gsap-core";
import { ScrollTrigger } from "gsap/all";
export default function About() {
    useGSAP(()=>{
        gsap.registerPlugin(ScrollTrigger);
        gsap.utils.toArray(".vr-circle-fill").forEach(element => {
            gsap.to(element, {
                opacity: 1,
                scrollTrigger:{
                    trigger: element,
                    start: "top 40%",
                    scrub: true,
                    end: "bottom 30%"
                }
            })
        });
        gsap.utils.toArray(".vr-fill").forEach(element => {
            gsap.to(element,{
                height: "100%",
                scrollTrigger: {
                    trigger: element,
                    scrub: true,
                    start: "top 40%",
                    end: "bottom 30%"
                }
            })
        });
    }, [])
    return (
        <section className="about">
            <div className="about-heading">
                <h1>About CPV</h1>
                <p>Course prerequisites are often scattered across documents and portals, making them hard to interpret. This system brings them together in a single visual space, helping students quickly understand course dependencies and plan their studies with confidence.</p>
            </div>
            <div className="about-components">
            <h1>
                Our Story
            </h1>
            <AboutComp key={1} content={"We started our journey in 2024"} left={0}/>
            <AboutComp key={2} content={"We launched our first course prerequisite graph and helped students(2025)"} left={1}/>
            <AboutComp key={3} content={"Now a lot of students this service regularly."} left={0}/>
            <div className="about-end-content">
            <h1>Development Onwards...</h1>
            <p className="about-end-para">CPV is making progress by each day due to continuous efforts and we are trying our best to make use of this platform an ease for you.</p>
            </div>
            </div>
        </section>
    );
}