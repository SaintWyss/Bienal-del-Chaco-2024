/**
 * Class: AdminPage
 * Description: Main dashboard for administrators. Provides navigation to different management modules (Events, Sculptures, etc.) and public pages.
 * Responsibilities:
 *   - Render the sidebar navigation.
 *   - Render the main content area using Swiper for transitions.
 *   - Manage state for selected page and selected management tab.
 * Collaborators:
 *   - EventManagement, SculptureManagement, SculptorManagement, UserManagement: Management components.
 *   - Home, Events, Sculptures, Sculptors, LoginPage: Public page previews.
 *   - Swiper: Third-party library for content transitions.
 */
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/effect-creative';
import { EffectCreative } from 'swiper/modules';

import { FaCalendarAlt, FaCogs, FaUser, FaUsers, FaHome } from 'react-icons/fa'; // Icon library

// Import management components
import EventManagement from "./components/event/EventManagement";
import SculptureManagement from "./components/sculpture/SculptureManagement";
import SculptorManagement from "./components/sculptor/SculptorManagement";
import UserManagement from "./components/user/UserManagement";
import Home from "../home/Home.tsx";
import Events from "../home/components/eventos/pages/Events.tsx";
import Sculptures from "../home/components/esculturas/pages/Sculptures.tsx";
import Sculptors from "../home/components/escultores/pages/Sculptors.tsx";
import LoginPage from "../auth/pages/AuthPage.tsx";

const AdminPage: React.FC = () => {
    const [selectedPage, setSelectedPage] = useState<string>("home");  // State for new pages
    const [selectedTab, setSelectedTab] = useState<string>("event");  // State for management modules

    // Function to change databoard content based on selected option
    const renderPageContent = () => {
        switch (selectedPage) {
            case "home":
                return <Home />;
            case "events":
                return <Events />;
            case "sculptures":
                return <Sculptures />;
            case "sculptors":
                return <Sculptors />;
            case "login":
                return <LoginPage />;
            default:
                return <Home />;
        }
    };

    // Function to change databoard content based on selected management option
    const renderDataboardContent = () => {
        switch (selectedTab) {
            case "event":
                return <EventManagement />;
            case "sculpture":
                return <SculptureManagement />;
            case "sculptor":
                return <SculptorManagement />;
            case "user":
                return <UserManagement />;
            default:
                return <EventManagement />;
        }
    };

    return (
        <div className="w-full h-screen flex bg-gray-100">
            {/* Sidebar Menu */}
            <div className="w-1/4 bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 rounded-lg p-4 text-gray-900 flex flex-col justify-between shadow-lg">
                <div>
                    <h2 className="text-3xl font-extrabold mb-8">Admin Dashboard</h2>
                    <ul>
                        {/* Links for new pages */}
                        <li
                            onClick={() => setSelectedPage("home")}
                            className="cursor-pointer mb-6 flex items-center text-lg hover:text-gray-300 transition-all ease-in-out"
                        >
                            <FaHome className="mr-3 text-xl"/>
                            Home
                        </li>
                        <li
                            onClick={() => setSelectedPage("events")}
                            className="cursor-pointer mb-6 flex items-center text-lg hover:text-gray-300 transition-all ease-in-out"
                        >
                            <FaCalendarAlt className="mr-3 text-xl"/>
                            Events
                        </li>
                        <li
                            onClick={() => setSelectedPage("sculptures")}
                            className="cursor-pointer mb-6 flex items-center text-lg hover:text-gray-300 transition-all ease-in-out"
                        >
                            <FaCogs className="mr-3 text-xl"/>
                            Sculptures
                        </li>
                        <li
                            onClick={() => setSelectedPage("sculptors")}
                            className="cursor-pointer mb-6 flex items-center text-lg hover:text-gray-300 transition-all ease-in-out"
                        >
                            <FaUsers className="mr-3 text-xl"/>
                            Sculptors
                        </li>
                        <li
                            onClick={() => setSelectedPage("login")}
                            className="cursor-pointer mb-6 flex items-center text-lg hover:text-gray-300 transition-all ease-in-out"
                        >
                            <FaUser className="mr-3 text-xl"/>
                            login
                        </li>

                        {/* Links for management modules */}
                        <li
                            onClick={() => setSelectedTab("event")}
                            className="cursor-pointer mb-6 flex items-center text-lg hover:text-gray-300 transition-all ease-in-out"
                        >
                            <FaCalendarAlt className="mr-3 text-xl"/>
                            Event Management
                        </li>
                        <li
                            onClick={() => setSelectedTab("sculpture")}
                            className="cursor-pointer mb-6 flex items-center text-lg hover:text-gray-300 transition-all ease-in-out"
                        >
                            <FaCogs className="mr-3 text-xl"/>
                            Sculpture Management
                        </li>
                        <li
                            onClick={() => setSelectedTab("sculptor")}
                            className="cursor-pointer mb-6 flex items-center text-lg hover:text-gray-300 transition-all ease-in-out"
                        >
                            <FaUsers className="mr-3 text-xl"/>
                            Sculptor Management
                        </li>
                        <li
                            onClick={() => setSelectedTab("user")}
                            className="cursor-pointer mb-6 flex items-center text-lg hover:text-gray-300 transition-all ease-in-out"
                        >
                            <FaUser className="mr-3 text-xl"/>
                            User Management
                        </li>
                    </ul>
                </div>

                {/* Footer */}
                <div className="text-center text-sm text-gray-950 mt-12">
                    <p>Bienal Admin Panel</p>
                </div>
            </div>

            {/* Databoard with Swiper effect */}
            <div className="w-3/4  bg-gray-100 p-6 flex flex-col">
                <Swiper
                    grabCursor={true}
                    effect="creative"
                    creativeEffect={{
                        prev: {
                            shadow: true,
                            translate: [0, 0, -400],
                        },
                        next: {
                            translate: ['100%', 0, 0],
                        },
                    }}
                    modules={[EffectCreative]}
                    className="w-full h-full bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 rounded-lg shadow-2xl"
                >
                    <SwiperSlide className="flex items-center justify-center bg-gradient-to-b from-blue-300 to-blue-500 rounded-lg shadow-lg">
                        {/* Content rendered depending on selected page */}
                        {renderPageContent()}
                    </SwiperSlide>

                    {/* Content for management modules */}
                    <SwiperSlide className="flex items-center justify-center bg-gradient-to-r from-blue-100  to-purple-100 via-red-100 rounded-lg shadow-2xl overflow-y-scroll">
                        {renderDataboardContent()}
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
};

export default AdminPage;
