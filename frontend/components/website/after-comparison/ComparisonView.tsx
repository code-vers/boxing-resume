const fighters = [
    {
        initials: 'CA',
        name: 'CANELO ALVAREZ',
        record: '61-2-2',
        division: 'Super Middleweight',
    },
    {
        initials: 'OU',
        name: 'OLEKSANDR USYK',
        record: '22-0-0',
        division: 'Heavyweight',
    },
];

const ComparisonView = () => {
    return (
        <section className="w-full bg-page-bg px-4 py-8 sm:px-6 md:px-8 xl:px-12">
            <div className="flex min-h-[348px] w-full items-center justify-center rounded-[6px] border border-card-border bg-surface-white px-4 py-12 shadow-sm">
                <div className="flex w-full max-w-[220px] flex-col items-center text-center">
                    <FighterSummary {...fighters[0]} />

                    <span className="my-7 font-heading text-[28px] font-black uppercase leading-none text-text-accent">
                        VS
                    </span>

                    <FighterSummary {...fighters[1]} />
                </div>
            </div>
        </section>
    );
};

const FighterSummary = ({
    initials,
    name,
    record,
    division,
}: {
    initials: string;
    name: string;
    record: string;
    division: string;
}) => {
    return (
        <div className="flex flex-col items-center">
            <div className="flex h-[46px] w-[46px] items-center justify-center rounded-full border-2 border-text-accent bg-card-dark font-heading text-[16px] font-black uppercase leading-none text-surface-white">
                {initials}
            </div>
            <h3 className="mt-3 font-heading text-[14px] font-black uppercase leading-none text-text-primary">
                {name}
            </h3>
            <span className="mt-2 text-[11px] font-medium leading-none text-text-placeholder">
                {record}
            </span>
            <span className="mt-2 text-[10px] font-medium leading-none text-text-placeholder">
                {division}
            </span>
            <button className="mt-2 text-[10px] font-medium leading-none text-text-accent transition-colors hover:text-btn-primary-hover">
                Change
            </button>
        </div>
    );
};

export default ComparisonView;
