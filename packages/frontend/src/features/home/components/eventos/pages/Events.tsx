import React from 'react';

import EventList from "../components/EventList.tsx";

const Events: React.FC = () => {
    return (
        <div>
            <div className="relative inset-0 overflow-hidden flex flex-col min-h-screen">
                <EventList />
            </div>
        </div>
    );
};

export default Events;

