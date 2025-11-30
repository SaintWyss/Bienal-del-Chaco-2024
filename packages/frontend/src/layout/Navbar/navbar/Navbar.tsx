import React from "react";
import { INavbarLink } from "../components/interfaces/INavigationLink";
import { navbarStyles } from "../styles/NavbarStyles";
import NavbarToggleButton from "../components/NavbarToggleButton.tsx";
import NavbarLinks from "../components/ui/NavbarLinks.tsx";

interface NavbarProps {
    links: INavbarLink[];
    isExpanded: boolean;
    toggleNavbar: () => void;
    onLinkClick?: (index: number) => void;
}

const Navbar: React.FC<NavbarProps> = ({ links, isExpanded, toggleNavbar, onLinkClick }) => {
    return (
        <header className={`${navbarStyles.container} ${isExpanded ? "backdrop-blur-md" : ""} md:flex hidden`}>
            <div className="flex items-center gap-2">
                <NavbarToggleButton
                    isExpanded={isExpanded}
                    toggleNavbar={toggleNavbar}
                    className="w-8 h-8"
                />
            </div>
            <nav
                className={`${navbarStyles.nav} ${
                    isExpanded ? navbarStyles.expanded : navbarStyles.collapsed
                }`}
            >
                <div className="flex justify-end gap-4 pr-4 pt-3 md:gap-20 md:pr-7">
                    <NavbarLinks
                        links={links}
                        closeNavbar={toggleNavbar}
                        onLinkClick={onLinkClick}
                    />
                </div>
            </nav>
        </header>
    );
};

export default Navbar;