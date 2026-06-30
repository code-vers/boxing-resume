import AfterComparisonBanner from '@/components/website/after-comparison/AfterComparisonBanner';
import ComparisonView from '@/components/website/after-comparison/ComparisonView';
import LastSixFights from '@/components/website/after-comparison/LastSixFights';
import StartComparison from '@/components/website/after-comparison/StartComparison';
import React from 'react';

const page = () => {
    return (
        <div>
            <AfterComparisonBanner/>
            <ComparisonView/>
            <StartComparison/>
            <LastSixFights/>
        </div>
    );
};

export default page;
