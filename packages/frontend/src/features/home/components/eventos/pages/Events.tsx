/**
 * Class: EventsPage
 * Description: Page component for displaying the list of events.
 * Responsibilities:
 *   - Render the EventList component.
 * Collaborators:
 *   - EventList: Component that displays the list of events.
 */
import React from 'react';
import EventList from "../components/EventList.tsx";

const EventsPage: React.FC = () => {
    return (
        <div>
            <div className="relative inset-0 overflow-hidden flex flex-col min-h-screen">
                <EventList />
            </div>
        </div>
    );
};

export default EventsPage;

