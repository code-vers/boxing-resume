import React from 'react';

const AllFightersBanner = () => {
    return (
        <section className="w-full bg-[#0a0a0a] py-16 md:py-20">
            <div className="mx-auto flex w-full  flex-col gap-6 px-4 sm:px-6 md:px-8 xl:px-12">
                <div className="flex flex-col gap-4">
                    <h1 className="text-4xl md:text-5xl font-['Bebas_Neue'] uppercase tracking-tight text-white mb-0">
                        ALL FIGHTERS
                    </h1>
                    <p className="max-w-[541px] text-[15px] font-['Inter'] leading-relaxed text-[#857f78]">
                        Search fighters, explore full bout histories, compare records, and follow the rankings of active and legendary boxers from around the world.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default AllFightersBanner;
