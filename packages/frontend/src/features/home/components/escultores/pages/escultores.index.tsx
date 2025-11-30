/**
 * Class: SculptorsIndex
 * Description: Entry point for the sculptors section in the home page. Adapts to mobile or desktop view.
 * Responsibilities:
 *   - Detect screen size to toggle between mobile and desktop views.
 *   - Render the appropriate sculptor list component.
 * Collaborators:
 *   - SculptorListHome: Desktop view for the sculptor list.
 *   - SculptorListMobile: Mobile view for the sculptor list.
 */
import React, { useState, useEffect } from "react";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import SculptorListHome from "../components/SculptorListHome.tsx";
import SculptorListMobile from "../components/SculptorListMobile.tsx";

const SculptorsIndex: React.FC = () => {
    // State to check if we are on mobile
    const [isMobile, setIsMobile] = useState<boolean>(false);

    // Updates isMobile state based on window size
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768); // Breakpoint at 768px
        };

        // Initialize state on first render
        handleResize();

        // Add event listener for window resize
        window.addEventListener("resize", handleResize);

        // Cleanup event listener on unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // Render appropriate component based on window size
    return isMobile ? (
        <SculptorListMobile />
    ) : (
        <SculptorListHome />
    );
};

export default SculptorsIndex;
