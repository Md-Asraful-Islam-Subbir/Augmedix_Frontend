import React, { useState } from 'react';
import './Resources.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { assets } from '../../assets/assets';

const Resources = () => {
    const [activeTab, setActiveTab] = useState("All");

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        adaptiveHeight: true,
    };

    const tabs = ["All", "News", "Media Mentions", "Press Releases", "Blogs", "Case Studies", "Webinars"];

    const resourceData = [
        { id: 1, category: "Case Studies",date: "January 29, 2025", title: "Reclaiming Work-Life Balance", description: "Learn how Dr. Lamberty achieved a better work-life balance by using ClinixNote Go to enhance patient care and simplify medical documentation.", image: assets.logo3 },
        { id: 2, category: "Media Mentions", date: "January 13, 2025", title: "ClinixNote Awarded Vizient Contract", description: "ClinixNote, a Commure company, has secured a contract with Vizient, the nation’s largest provider-driven healthcare performance improvement company.", image: assets.logo1 },
        { id: 3, category: "Press Releases", date: "January 13, 2025", title: "ClinixNote Awarded Vizient Contract", description: "ClinixNote and Vizient to offer ClinixNote Go, ClinixNote Assist, and ClinixNote Live for diverse group of providers and health systems across the United States.", image: assets.logo2 },
    ];

    const filteredResources = activeTab === "All" ? resourceData : resourceData.filter(item => item.category === activeTab);

    return (
        <div className="resources-container">
            {/* Carousel */}
            <div className="press-container">
                <Slider {...settings}>
                    <div className="press-slide">
                        <div className="press-content">
                            <div className="text">
                                <p className="date">PRESS RELEASES / OCTOBER 2, 2024</p>
                                <h1>Commure Completes Merger with ClinixNote</h1>
                                <p className="description">
                                    Commure, a healthcare technology company, announced today that it has completed the acquisition 
                                    of ClinixNote. ClinixNote will now operate as a wholly-owned subsidiary of Commure.
                                </p>
                                <button className="read-more">Read More</button>
                            </div>
                            <div className="logo">
                                <img src={assets.logo3} alt="ClinixNote Logo" />
                            </div>
                        </div>
                    </div>

                    <div className="press-slide">
                        <div className="press-content">
                            <div className="text">
                                <p className="date">PRESS RELEASES / OCTOBER 10, 2024</p>
                                <h1>New AI Healthcare Innovation</h1>
                                <p className="description">
                                    ClinixNote launches a new AI-driven healthcare assistant, improving documentation and patient care.
                                </p>
                                <button className="read-more">Read More</button>
                            </div>
                            <div className="logo">
                                <img src={assets.logo2} alt="Healthcare AI" />
                            </div>
                        </div>
                    </div>
                </Slider>
            </div>

            {/* Tabs Navigation */}
            <div className="tabs">
                {tabs.map(tab => (
                    <button key={tab} className={activeTab === tab ? "active" : ""} onClick={() => setActiveTab(tab)}>
                        {tab}
                    </button>
                ))}
            </div>

            {/* Resource Cards */}
            <div className="resource-grid">
                {filteredResources.map(resource => (
                    <div key={resource.id} className="resource-card">
                        <div className="resource-header">
                            <h3>{resource.category}</h3>
                        </div>
                        {resource.image && <img src={resource.image} alt={resource.title} className="resource-image" />}
                        <div className="resource-content">
                            <p className="date">{resource.date}</p>
                            <h2>{resource.title}</h2>
                            <p>{resource.description}</p>
                            <br/><br/>
                            <a href="#" className="read-more">Read More</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Resources;
