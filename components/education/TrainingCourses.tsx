import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { AcademicCapIcon } from '../ui/Icons';

interface Course {
    titleKey: string;
    descriptionKey: string;
}

const courses: Course[] = [
    { titleKey: 'training1_title', descriptionKey: 'training1_desc' },
    { titleKey: 'training2_title', descriptionKey: 'training2_desc' },
];

const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
    const { t } = useLanguage();
    return (
        <div className="bg-gray-50 rounded-lg shadow-sm p-6 flex flex-col md:flex-row gap-6 border border-gray-200 items-start">
            <div className="flex-shrink-0 text-red-600">
                <AcademicCapIcon className="w-12 h-12" />
            </div>
            <div className="flex-grow">
                <h4 className="text-xl font-bold text-gray-900">{t(course.titleKey)}</h4>
                <p className="text-gray-600 mt-1">{t(course.descriptionKey)}</p>
            </div>
            <div className="flex-shrink-0 mt-4 md:mt-0 md:self-center">
                 <button className="w-full md:w-auto flex items-center justify-center bg-red-600 text-white font-bold py-2 px-6 rounded-md hover:bg-red-700 transition-colors">
                    <span>{t('enroll_now_button')}</span>
                </button>
            </div>
        </div>
    );
};

const TrainingCourses: React.FC = () => {
    const { t } = useLanguage();
    return (
        <div>
            <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-800">{t('training_title')}</h3>
                <p className="text-gray-600 mt-2 max-w-2xl mx-auto">{t('training_subtitle')}</p>
            </div>
            <div className="space-y-6 max-w-4xl mx-auto">
                {courses.map((course, index) => (
                    <CourseCard key={index} course={course} />
                ))}
            </div>
        </div>
    );
};

export default TrainingCourses;