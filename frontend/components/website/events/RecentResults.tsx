'use client';

/**
 * @constant DUMMY_RESULTS
 * @description Mock data for recent boxing results.
 */
const DUMMY_RESULTS = [
  {
    eventName: 'Fury vs Usyk II',
    promoter: 'Top Rank',
    mainEvent: 'Fury def. Usyk',
    method: 'UD',
    date: 'Nov 2023',
    venue: 'Kingdom Arena',
    location: 'Riyadh, SA',
    broadcast: 'PPV',
  },
  {
    eventName: 'Canelo vs Bivol II',
    promoter: 'Matchroom',
    mainEvent: 'Canelo def. Bivol',
    method: 'SD',
    date: 'Nov 2023',
    venue: 'Kingdom Arena',
    location: 'Riyadh, SA',
    broadcast: 'DAZN',
  },
  {
    eventName: 'Haney vs Lomachenko',
    promoter: 'Top Rank',
    mainEvent: 'Haney def. Loma',
    method: 'KO R7',
    date: 'Nov 2023',
    venue: 'Kingdom Arena',
    location: 'Riyadh, SA',
    broadcast: 'ESPN',
  },
  {
    eventName: 'Tank vs Garcia',
    promoter: 'PBC',
    mainEvent: 'Tank def. Garcia',
    method: 'UD',
    date: 'Nov 2023',
    venue: 'Kingdom Arena',
    location: 'Riyadh, SA',
    broadcast: 'PPV',
  },
];

/**
 * @component RecentResults
 * @description A table-style display of recently concluded boxing events and their outcomes.
 */
export default function RecentResults() {
  return (
    <div className='w-full'>
      <div className='flex items-center justify-between mb-6'>
        <h3 className='font-bebas text-xl text-text-primary tracking-wider uppercase'>
          RECENT RESULTS
        </h3>
      </div>

      <div className='bg-surface-white rounded-lg border border-[#e8e2d8] overflow-hidden'>
        <div className='overflow-x-auto no-scrollbar'>
          <table className='w-full text-left border-collapse'>
            <thead>
              <tr className='border-b border-[#e8e2d8]'>
                <th className='px-6 py-4 text-[12px] font-bold text-[#656464] tracking-wider uppercase'>
                  Event Name
                </th>
                <th className='px-6 py-4 text-[12px] font-bold text-[#656464] tracking-wider uppercase text-center'>
                  Main Event
                </th>
                <th className='px-6 py-4 text-[12px] font-bold text-[#656464] tracking-wider uppercase text-center'>
                  Result
                </th>
                <th className='px-6 py-4 text-[12px] font-bold text-[#656464] tracking-wider uppercase text-center'>
                  Broadcast
                </th>
                <th className='px-6 py-4 text-[12px] font-bold text-[#656464] tracking-wider uppercase text-center'>
                  Venue
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-[#f1ede1]'>
              {DUMMY_RESULTS.map((result, index) => (
                <tr key={index} className='hover:bg-page-bg transition-colors'>
                  <td className='px-6 py-4'>
                    <div className='flex flex-col'>
                      <span className='text-[13px] font-medium text-text-primary'>
                        {result.eventName}
                      </span>
                      <span className='text-[10px] text-text-disabled uppercase'>
                        {result.promoter}
                      </span>
                    </div>
                  </td>
                  <td className='px-6 py-4 text-center'>
                    <span className='text-sm text-[#656464] font-normal'>
                      {result.mainEvent}
                    </span>
                  </td>
                  <td className='px-6 py-4 text-center'>
                    <div className='flex justify-center'>
                      <span
                        className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                          result.method.includes('KO')
                            ? 'bg-destructive/10 text-destructive'
                            : result.method === 'UD'
                            ? 'bg-success-bg text-success-text'
                            : 'bg-warning-bg text-warning-text'
                        }`}
                      >
                        {result.method}
                      </span>
                    </div>
                  </td>
                  <td className='px-6 py-4 text-center'>
                    <div className='flex justify-center'>
                      <span
                        className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                          result.broadcast === 'PPV'
                            ? 'bg-text-accent text-surface-white'
                            : result.broadcast === 'DAZN'
                            ? 'bg-muted text-text-secondary'
                            : 'bg-destructive/10 text-destructive'
                        }`}
                      >
                        {result.broadcast}
                      </span>
                    </div>
                  </td>
                  <td className='px-6 py-4'>
                    <div className='flex flex-col items-center'>
                      <span className='text-xs text-[#3d3b38]'>{result.venue}</span>
                      <span className='text-[10px] text-text-placeholder'>{result.location}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
