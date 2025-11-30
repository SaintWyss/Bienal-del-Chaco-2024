import React from 'react';
import SculptorList from "../components/SculptorList.tsx";


const Sculptors: React.FC = () => {
    return (
        <div className="absolute inset-0 overflow-hidden flex flex-col min-h-screen">
            <SculptorList />
        </div>
    );
};

export default Sculptors;