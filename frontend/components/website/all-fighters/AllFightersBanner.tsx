import React from 'react';

const AllFightersBanner = () => {
    return (
        <section className="w-full bg-card-dark py-12 md:py-16">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 sm:px-6 md:px-8 xl:px-12">
                <div className="flex flex-col gap-3">
                    <p className="text-sm uppercase tracking-[0.32em] text-text-accent">
                        All Fighters
                    </p>
                    <h1 className="text-3xl font-black uppercase tracking-tighter text-surface-white sm:text-4xl md:text-[40px] md:leading-none">
                        Browse the complete database of professional boxers.
                    </h1>
                    <p className="max-w-2xl text-sm font-medium tracking-wide text-text-placeholder sm:text-base">
                        Search fighters by name and explore profiles, records, and titles across every division.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default AllFightersBanner;
