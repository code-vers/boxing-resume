import React from "react";

const AfterComparisonBanner = () => {
    return (
        <section className="w-full bg-card-dark py-12 md:py-8">
            <div className="mx-auto flex w-full flex-col items-start justify-center px-4 sm:px-6 md:px-8 xl:px-12">
                {/* * @block Main Title */}
                <h1 className="text-3xl font-black uppercase tracking-tighter text-surface-white sm:text-4xl md:text-[40px] md:leading-none">
                    HEAD-TO-HEAD COMPARISON
                </h1>

                {/* * @block Subtitle */}
                <p className="mt-2 text-[12px] font-medium tracking-wide text-text-placeholder sm:text-[13px]">
                    Select two fighters to compare stats, records, and performance.
                </p>
            </div>
        </section>
    );
};

export default AfterComparisonBanner;
