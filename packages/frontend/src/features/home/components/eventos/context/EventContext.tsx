import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getEventos, createEvento, deleteEvento, updateEvento, getEventoById } from '../../../../../services/EventService.ts';

interface EventContextType {
    eventos: any[];
    addEvent: (name: string) => Promise<void>;
    removeEvent: (id: string) => Promise<void>;
    updateEvent: (id: string, data: any) => Promise<void>;
    fetchEventById: (id: string) => Promise<any>;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const useEventContext = () => {
    const context = useContext(EventContext);
    if (!context) {
        throw new Error('useEventContext must be used within an EventProvider');
    }
    return context;
};

interface EventProviderProps {
    children: ReactNode;
}

export const EventProvider: React.FC<EventProviderProps> = ({ children }) => {
    const [eventos, setEventos] = useState<any[]>([]);

    useEffect(() => {
        const fetchEventos = async () => {
            const data = await getEventos();
            setEventos(data);
        };
        fetchEventos();
    }, []);

    const addEvent = async (name: string) => {
        await createEvento({ name });
        const data = await getEventos();
        setEventos(data);
    };

    const removeEvent = async (id: string) => {
        await deleteEvento(id);
        const data = await getEventos();
        setEventos(data);
    };

    const updateEvent = async (id: string, data: any) => {
        await updateEvento(id, data);
        const updatedData = await getEventos();
        setEventos(updatedData);
    };

    const fetchEventById = async (id: string) => {
        return await getEventoById(id);
    };

    return (
        <EventContext.Provider value={{ eventos, addEvent, removeEvent, updateEvent, fetchEventById }}>
            {children}
        </EventContext.Provider>
    );
};