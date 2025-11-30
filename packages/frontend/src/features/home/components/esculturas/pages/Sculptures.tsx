/**
 * Class: SculpturesPage
 * Description: Page component for displaying the list of sculptures. Adapts to mobile or desktop view.
 * Responsibilities:
 *   - Detect screen size to toggle between mobile and desktop views.
 *   - Render the appropriate sculpture list component.
 * Collaborators:
 *   - SculptureList: Desktop view for the sculpture list.
 *   - SculptureListMobile: Mobile view for the sculpture list.
 */
import React, { useState, useEffect } from "react";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import SculptureList from "../components/SculptureList.tsx";
import SculptureListMobile from "../components/EsculturaListMobile.tsx";

interface IndexProps {}

const SculpturesPage: React.FC<IndexProps> = () => {
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
        <SculptureListMobile />
    ) : (
        <SculptureList />
    );
};

export default SculpturesPage;
