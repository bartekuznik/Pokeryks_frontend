import React from 'react';
import NavBarr from './components/NavBarr';
import './App.css';

const About = () => {
    return (
        <div>
            <NavBarr />
            <div className="centered-content">
                <div className="about-content">
                    <h1>About Pokeryks</h1>
                    <p>
                        The Pokeryks project, carried out as part of the 'Team project' course run by 
                        the number II Friday group, aims to create a poker app in the Friday group 
                        number II, aiming to develop a poker application based on a REST API mechanism.
                        The application will be available as a web and mobile version on Android.
                        <br /><br />
                        The main aim of the project is to develop features, ensure optimal performance, 
                        and provide users with a high-quality entertainment experience. The motivation for 
                        the project stems from the perceived shortcomings and inadequate functionality 
                        of existing competitive solutions...
                    </p>
                </div>
            </div>
        </div>
    )
}

export default About;
