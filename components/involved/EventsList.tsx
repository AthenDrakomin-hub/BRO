import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { CalendarIcon, MapPinIcon } from '../ui/Icons';

interface Event {
    titleKey: string;
    dateKey: string;
    locationKey: string;
    descriptionKey: string;
}

const eventsData: Event[] = [
    { titleKey: 'event1_title', dateKey: 'event1_date', locationKey: 'event1_location', descriptionKey: 'event1_desc'},
    { titleKey: 'event2_title', dateKey: 'event2_date', locationKey: 'event2_location', descriptionKey: 'event2_desc'},
]

const EventCard: React.FC<{ event: Event }> = ({ event }) => {
    const { t } = useLanguage();
    return (
        <div className="bg-gray-50 rounded-lg shadow-sm p-6 flex flex-col md:flex-row gap-6 border border-gray-200">
            <div className="flex-grow">
                <h4 className="text-xl font-bold text-gray-900 mb-2">{t(event.titleKey)}</h4>
                <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center">
                        <CalendarIcon className="w-4 h-4 mr-1.5 text-red-600"/>
                        <span>{t(event.dateKey)}</span>
                    </div>
                    <div className="flex items-center">
                        <MapPinIcon className="w-4 h-4 mr-1.5 text-red-600"/>
                        <span>{t(event.locationKey)}</span>
                    </div>
                </div>
                <p className="text-gray-700">{t(event.descriptionKey)}</p>
            </div>
            <div className="flex-shrink-0 md:self-center">
                 <button className="w-full md:w-auto bg-red-600 text-white font-bold py-2 px-6 rounded-md hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
                    {t('event_register_button')}
                </button>
            </div>
        </div>
    );
};


const EventsList: React.FC = () => {
    const { t } = useLanguage();
    return (
        <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2 text-center">{t('events_title')}</h3>
            <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">{t('events_subtitle')}</p>
            <div className="space-y-6">
                {eventsData.map((event, index) => (
                    <EventCard key={index} event={event} />
                ))}
            </div>
        </div>
    );
};

export default EventsList;
