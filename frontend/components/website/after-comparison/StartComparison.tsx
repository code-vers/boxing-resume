import { Share2 } from 'lucide-react';

const stats = [
    {
        label: 'Total Fights',
        canelo: '65',
        usyk: '23',
        winner: 'canelo',
    },
    {
        label: 'Wins',
        canelo: '61',
        usyk: '22',
        winner: 'canelo',
    },
    {
        label: 'Losses',
        canelo: '2',
        usyk: '0',
        winner: 'usyk',
    },
    {
        label: 'Draws',
        canelo: '2',
        usyk: '0',
        winner: 'usyk',
    },
    {
        label: 'KOs',
        canelo: '39',
        usyk: '14',
        winner: 'canelo',
    },
    {
        label: 'KO Rate',
        canelo: '60',
        usyk: '61',
        winner: 'usyk',
    },
    {
        label: 'Titles Won',
        canelo: '4',
        usyk: '4',
        winner: 'both',
    },
    {
        label: 'Reach',
        canelo: '70.5',
        usyk: '78',
        winner: 'usyk',
    },
];

const StartComparison = () => {
    return (
        <section className="w-full bg-page-bg px-4 pb-8 sm:px-6 md:px-8 xl:px-12">
            <div className="mb-5 flex items-center justify-between gap-4">
                <h2 className="font-heading text-[20px] font-black uppercase leading-none text-text-primary">
                    Stats Comparison
                </h2>

                <button className="inline-flex h-9 items-center gap-2 rounded-[6px] border border-card-border bg-transparent px-4 text-[11px] font-medium text-text-placeholder transition-colors hover:border-card-border-hover hover:text-text-primary">
                    <Share2 className="h-3.5 w-3.5" />
                    Share Comparison
                </button>
            </div>

            <div className="overflow-hidden rounded-[8px] border border-card-border bg-surface-white">
                <div className="grid h-[72px] grid-cols-[1fr_120px_1fr] items-start bg-page-bg px-5 py-5 sm:grid-cols-[1fr_180px_1fr]">
                    <span className="font-heading text-[12px] font-black uppercase leading-none text-text-primary">
                        Canelo Alvarez
                    </span>
                    <span className="pt-8 text-center text-[14px] font-medium uppercase leading-none text-text-placeholder">
                        Stat
                    </span>
                    <span className="self-end text-right font-heading text-[12px] font-black uppercase leading-none text-text-primary">
                        Oleksandr Usyk
                    </span>
                </div>

                {stats.map((stat, index) => (
                    <div
                        key={stat.label}
                        className={`grid min-h-[82px] grid-cols-[1fr_120px_1fr] items-center border-t border-divider px-5 sm:grid-cols-[1fr_180px_1fr] ${
                            index % 2 === 0 ? 'bg-surface-white' : 'bg-section-bg'
                        }`}
                    >
                        <span
                            className={`text-left text-[13px] font-medium leading-none ${
                                stat.winner === 'canelo' || stat.winner === 'both'
                                    ? 'text-text-accent'
                                    : 'text-text-disabled'
                            }`}
                        >
                            {stat.canelo}
                        </span>

                        <span className="text-center text-[14px] font-medium leading-none text-text-placeholder">
                            {stat.label}
                        </span>

                        <span
                            className={`text-right text-[13px] font-medium leading-none ${
                                stat.winner === 'usyk' || stat.winner === 'both'
                                    ? 'text-text-accent'
                                    : 'text-text-disabled'
                            }`}
                        >
                            {stat.usyk}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default StartComparison;
