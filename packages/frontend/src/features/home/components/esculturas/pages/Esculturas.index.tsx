/**
 * Class: EsculturasIndex
 * Description: Entry point for the sculptures section in the home page. Adapts to mobile or desktop view.
 * Responsibilities:
 *   - Detect screen size to toggle between mobile and desktop views.
 *   - Render the appropriate sculpture list component for the home page.
 * Collaborators:
 *   - SculptureListHome: Desktop view for the home sculpture list.
 *   - SculptureListHomeMobile: Mobile view for the home sculpture list.
 */
import React, { useState, useEffect } from "react";
import SculptureListHomeMobile from "../components/SculptureListHomeMobile.tsx";
import SculptureListHome from "../components/SculptureListHome.tsx";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface IndexProps {
    eventoId?: number;
}

const EsculturasIndex: React.FC<IndexProps> = ({ eventoId }) => {
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
        <SculptureListHomeMobile eventoId={eventoId} />
    ) : (
        <SculptureListHome eventoId={eventoId} />
    );
};

export default EsculturasIndex;
