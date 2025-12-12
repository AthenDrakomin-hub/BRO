import React, { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { CashIcon, LoaderIcon } from '../ui/Icons';
import type { Donation } from '../../types';

const ITEMS_PER_PAGE = 10;

const DonationHistory: React.FC = () => {
    const { t } = useLanguage();
    const [donations, setDonations] = useState<Donation[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        const fetchDonations = () => {
            setLoading(true);
            setTimeout(() => {
                const mockData: Donation[] = Array.from({ length: 35 }, (_, i) => {
                    const statuses: Donation['status'][] = ['Succeeded', 'Succeeded', 'Succeeded', 'Succeeded', 'Pending', 'Failed'];
                    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
                    const randomAmount = Math.floor(Math.random() * 500) + 5;
                    const date = new Date();
                    date.setDate(date.getDate() - i * 2 - Math.floor(Math.random() * 5));

                    return {
                        id: `dn_${(Math.random() + 1).toString(36).substring(2, 10)}${i + 1}`,
                        amount: randomAmount,
                        status: randomStatus,
                        createdAt: date.toISOString(),
                    };
                });
                setDonations(mockData.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
                setLoading(false);
            }, 1200);
        };
        fetchDonations();
    }, []);
    
    const totalPages = Math.ceil(donations.length / ITEMS_PER_PAGE);
    const paginatedDonations = useMemo(() => {
         return donations.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            currentPage * ITEMS_PER_PAGE
        );
    }, [donations, currentPage]);


    const handleNextPage = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages));
    };

    const handlePrevPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
    };

    const StatusBadge: React.FC<{ status: Donation['status'] }> = ({ status }) => {
        const styles = {
            Succeeded: 'bg-green-100 text-green-800',
            Pending: 'bg-yellow-100 text-yellow-800',
            Failed: 'bg-red-100 text-red-800',
        };
        return (
            <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${styles[status]}`}>
                {t(`status_${status.toLowerCase()}`)}
            </span>
        );
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <LoaderIcon className="w-10 h-10 animate-spin text-red-600 mb-4" />
                <p className="font-semibold">{t('loading_donations')}</p>
            </div>
        );
    }
    
    if (donations.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <CashIcon className="w-16 h-16 text-gray-300 mb-4" />
                <h3 className="text-xl font-bold text-gray-700">{t('donations_title')}</h3>
                <p className="mt-2">{t('no_donations_found')}</p>
            </div>
        );
    }


    return (
        <div>
            <div className="text-center mb-8">
                <CashIcon className="w-12 h-12 text-red-600 mx-auto mb-2" />
                <h3 className="text-2xl font-bold text-gray-800">{t('donations_title')}</h3>
                <p className="text-gray-600 mt-2 max-w-2xl mx-auto">{t('donations_subtitle')}</p>
            </div>

            <div className="overflow-x-auto bg-white rounded-lg shadow border">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('donations_id_header')}</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('donations_amount_header')}</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('donations_status_header')}</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('donations_date_header')}</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {paginatedDonations.map(donation => (
                            <tr key={donation.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500">{donation.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${donation.amount.toFixed(2)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><StatusBadge status={donation.status} /></td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(donation.createdAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <div className="mt-6 flex items-center justify-between">
                 <button 
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {t('pagination_previous')}
                </button>
                 <span className="text-sm text-gray-700">
                    {t('pagination_page_info').replace('{currentPage}', String(currentPage)).replace('{totalPages}', String(totalPages))}
                </span>
                 <button 
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {t('pagination_next')}
                </button>
            </div>
        </div>
    );
};

export default DonationHistory;
