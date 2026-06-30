type ResultType = 'UD' | 'SD' | 'TKO';

interface Fight {
    date: string;
    opponent: string;
    result: ResultType;
    method: string;
}

interface FighterFights {
    fighter: string;
    fights: Fight[];
}

const fightHistory: FighterFights[] = [
    {
        fighter: 'Canelo Alvarez',
        fights: [
            { date: 'May 18', opponent: 'Dmitry Bivol', result: 'UD', method: 'UD' },
            { date: 'May 4', opponent: 'Jaime Munguia', result: 'UD', method: 'UD' },
            { date: 'Sep 16', opponent: 'Jermell Charlo', result: 'UD', method: 'UD' },
            { date: 'May 6', opponent: 'John Ryder', result: 'TKO', method: 'TKO 5' },
            { date: 'Nov 5', opponent: 'Caleb Plant', result: 'TKO', method: 'TKO 11' },
            { date: 'May 8', opponent: 'Billy Joe Saunders', result: 'TKO', method: 'TKO 8' },
        ],
    },
    {
        fighter: 'Oleksandr Usyk',
        fights: [
            { date: 'Dec 21', opponent: 'Tyson Fury', result: 'UD', method: 'UD' },
            { date: 'May 18', opponent: 'Tyson Fury', result: 'SD', method: 'SD' },
            { date: 'Aug 20', opponent: 'Daniel Dubois', result: 'UD', method: 'UD' },
            { date: 'Aug 20', opponent: 'Anthony Joshua', result: 'SD', method: 'SD' },
            { date: 'Sep 25', opponent: 'Anthony Joshua', result: 'UD', method: 'UD' },
            { date: 'Oct 31', opponent: 'Derek Chisora', result: 'UD', method: 'UD' },
        ],
    },
];

const resultBadgeClasses: Record<ResultType, string> = {
    UD: 'bg-success-bg text-success-text',
    SD: 'bg-warning-bg text-warning-text',
    TKO: 'bg-red-100 text-text-accent',
};

const LastSixFights = () => {
    return (
        <section className="w-full bg-page-bg px-4 pb-10 sm:px-6 md:px-8 xl:px-12">
            <h2 className="mb-5 font-heading text-[20px] font-black uppercase leading-none text-text-primary">
                Last 6 Fights
            </h2>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {fightHistory.map((fighter) => (
                    <FightHistoryCard key={fighter.fighter} {...fighter} />
                ))}
            </div>
        </section>
    );
};

const FightHistoryCard = ({ fighter, fights }: FighterFights) => {
    return (
        <div className="overflow-hidden rounded-[8px] border border-card-border bg-surface-white shadow-sm">
            <div className="flex h-[56px] items-center border-b border-divider px-5">
                <h3 className="font-heading text-[12px] font-black uppercase leading-none text-text-primary">
                    {fighter}
                </h3>
            </div>

            <div>
                {fights.map((fight) => (
                    <div
                        key={`${fighter}-${fight.date}-${fight.opponent}`}
                        className="grid min-h-[34px] grid-cols-[56px_1fr_auto_auto] items-center gap-3 border-b border-divider px-5 last:border-b-0"
                    >
                        <span className="text-[10px] font-medium leading-none text-text-placeholder">
                            {fight.date}
                        </span>
                        <span className="truncate text-[12px] font-medium leading-none text-text-secondary">
                            {fight.opponent}
                        </span>
                        <span
                            className={`rounded-full px-2.5 py-1 text-[9px] font-black uppercase leading-none ${resultBadgeClasses[fight.result]}`}
                        >
                            {fight.result}
                        </span>
                        <span className="min-w-[38px] text-[10px] font-medium leading-none text-text-placeholder">
                            {fight.method}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LastSixFights;
