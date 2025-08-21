import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import stud_detail from "../assets/stud_detail.png";
// import TickIcon from "./TickIcon.jsx"; 
// import { FaCheck } from "react-icons/fa";
import App from '../assets/Apps.png'
import Group from '../assets/Group.png';

import Products from './Products.jsx'
import Testtimonials from './Testtimonials.jsx';
import Plan from './Plan.jsx'
import styles from './Acedmic.module.css'

const Acedmic = () => {
    return (
        <div >

            {/* Section 1 (Acedmic) */}
            <div className={styles.heroContainer}>
                {/* Left Section */}
                <div className={styles.leftSection}>

                    <div className={styles.textBox}>
                        <div className={styles.heading}>
                            <p>
                            Academic &  Administrative Management Made  Easy
                            </p>
                        </div>
                        <div className={styles.paragraph}>
                            <p>
                            From admissions to attendance, fee collection to faculty
                            management — our ERP handles it all seamlessly. Get real-time
                            reports and analytics to make informed decisions.
                            </p>
                        </div>
                    </div>

                    {/* Button */}
                    <button className={styles.buttonWrapper}>
                        <div className={styles.button}>
                            Learn More
                            <FaArrowRight className={styles.icon} />
                        </div>
                    </button>
                {/* <img src={BACKGROUND} alt="" className={styles.backgroundImage} /> */}
                </div>

                {/* Right Section */}
                <div className={styles.rightSection}>
                    {/* You can place an image here */}
                </div>
            </div>


            {/* Section-2 */}

            <div className={styles.containerSec2}>
                {/* Left image */}
                <div className={styles.imageWrapperSec2}>
                    <img src={stud_detail} alt="Student Details" />
                </div>

                {/* Right content */}
                <div className={styles.contentSec2}>
                    <p className={styles.headingSec2}>Keep everyone connected</p>
                    <p className={styles.paragraphSec2}>
                    Enable smooth communication between teachers, students, and parents.
                    Share notices, assignments, and performance updates instantly.
                    </p>

                    <button className={styles.buttonSec2}>
                        <span>Try it now</span>
                        <FaArrowRight className={styles.iconSec2} />
                    </button>
                </div>
            </div>



            {/* Section-3 */}
            <div className={styles.containerSec3}>
                {/* Left Content */}
                <div className={styles.leftSec3}>
                    <div className={styles.textBoxSec3}>
                        <p className={styles.headingSec3}>
                            Integrates With Your Existing System
                        </p>

                        <p className={styles.paragraphSec3}>
                            Already have a website? Our ERP fits right in, or we can build you a
                            new one from scratch.
                        </p>

                        <button className={styles.buttonSec3}>
                            <span className={styles.buttonTextSec3}>Let's Go</span>
                            <FaArrowRight className={styles.iconSec3} />
                        </button>
                    </div>
                </div>

                {/* Right Box (placeholder for image/graphic) */}
                <div className={styles.rightSec3}>

                </div>
            </div>


            {/* Section-4 */}

            <div className={styles.containerSec4}>
                {/* Left Box */}
                <div className={styles.leftBoxSec4}></div>

                {/* Right Box */}
                    <div className={styles.rightBoxSec4}>
                        <div className={styles.textContentSec4}>
                            <p className={styles.headingSec4}>
                                Modules That Fit Your Institutions
                            </p>
                            <p className={styles.subTextSec4}>
                                Choose from 30+ modules — add, remove or customize based on your workflow.
                            </p>
                        <button className={styles.buttonSec4}>
                            <span className={styles.btnTextSec4}>Let’s Go</span>
                            <FaArrowRight className={styles.arrowIconSec4} />
                        </button>
                    </div>
                </div>
            </div>

            

            {/* Section 5 (PRoduct) */}
            <section className={styles.featuresSection}>
                <div className={styles.headerSec5}>
                    <p className={styles.titleSec5}>Product’s Features</p>
                </div>

                <div className={styles.productsWrapperSec5}>
                    <Products />
                </div>
            </section>

            
            {/* Section 6  */}
            <section className={styles.workSection}>
                <div className={styles.contentBoxSec6}>
                    <div className={styles.textBoxSec6}>
                    <h2 className={styles.headingSec6}>Your work, everywhere you are</h2>
                    <p className={styles.descriptionSec6}>
                        Access your notes from your computer, phone or tablet by synchronising
                        with various services, including Whitepace, Dropbox and OneDrive. 
                        The app is available on Windows, macOS, Linux, Android and iOS. 
                        A terminal app is also available!
                    </p>
                    </div>

                    <button className={styles.buttonSec6}>
                    <span className={styles.btnTextSec6}>Try Now</span>
                    <FaArrowRight className={styles.btnIconSec6} />
                    </button>
                </div>
            </section>




            {/* Section-7 (plan) */}

           <section className={styles.plansSection}>
                <div className={styles.headerSec7}>
                    <h2 className={styles.titleSec7}>Choose Your Plan</h2>
                </div>

                <div className={styles.plansWrapperSec7}>
                    <Plan />
                    
                </div>
            </section>


            {/* Section -8 */}

            <section className={styles.section8}>
                {/* Left Image */}
                <div className={styles.imageContainerSec8}>
                    <img src={App} alt="App Integration" className={styles.imageSec8} />
                </div>

                {/* Right Content */}
                <div className={styles.contentSec8}>
                    <h2 className={styles.titleSec8}>Work with Your Favorite Apps</h2>
                    <p className={styles.subtitleSec8}>
                    Seamlessly integrate with Google Workspace, Microsoft Teams, Zoom, and more
                    </p>

                    <button className={styles.buttonSec8}>
                    <span>Read more</span>
                    <FaArrowRight className={styles.iconSec8} />
                    </button>
                </div>
            </section>



            {/* Section 9 (Testimonials) */}
             <section className={styles.section9}>
                <h2 className={styles.headingSec9}>
                    What Our Clients{" "}
                    <span className={styles.highlightSec9}>
                    Says
                    <img src={Group} alt="" className={styles.underlineSec9} />
                    </span>
                </h2>

                {/* Testimonials */}
                <div className={styles.testimonialsWrapperSec9}>
                    <Testtimonials />
                </div>
            </section>



            {/* Section-10 (contact us) */}

            <section className={styles.contactSection10}>
                {/* Background outlined text */}
                <h1 className={styles.backgroundTextSec10}>contact us</h1>

                <div className={styles.contactContentSec10}>
                    <div className={styles.leftContentSec10}>
                    <h2 className={styles.titleSec10}>
                        Have a Query! <br /> Let’s discuss
                    </h2>
                    <p className={styles.subtitleSec10}>
                        Thank you for getting in touch! Kindly fill the form, have a great day!
                    </p>
                    </div>

                    {/* Form */}
                    <form className={styles.formSec10}>
                    <div className={styles.rowSec10}>
                        <input type="text" placeholder="Your Name" />
                        <input type="email" placeholder="Your Email" />
                    </div>

                    <div className={styles.rowSec10}>
                        <input type="number" placeholder="Your Phone Number" />
                        <select>
                        <option value="">Country</option>
                        <option value="india">India</option>
                        <option value="russia">Russia</option>
                        <option value="uk">UK</option>
                        <option value="canada">Canada</option>
                        </select>
                    </div>

                    <div className={styles.rowSec10}>
                        <input type="text" placeholder="Describe Query" />
                        <select>
                        <option value="">Query Related</option>
                        <option value="q1">Query 1</option>
                        <option value="q2">Query 2</option>
                        <option value="q3">Query 3</option>
                        <option value="q4">Query 4</option>
                        </select>
                    </div>

                    <div className={styles.rowFullSec10}>
                        <textarea placeholder="Message" rows="3"></textarea>
                    </div>

                    <button type="submit" className={styles.buttonSec10}>
                        Submit
                    </button>
                    </form>
                </div>
            </section>

        </div>
    );
};

export default Acedmic;
