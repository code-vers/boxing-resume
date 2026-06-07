'use client';

import React from 'react';

const HISTORY_DATA = [
  {
    id: 1,
    champion: 'Carlos Adames',
    initials: 'CA',
    start: 'Nov 15, 2023',
    end: 'Present',
    howWon: 'UD',
    howLost: '—',
    defenses: '3',
  },
  {
    id: 2,
    champion: 'Terrell Gausha',
    initials: 'TG',
    start: 'Mar 12, 2023',
    end: 'Nov 15, 2023',
    howWon: 'SD',
    howLost: 'UD',
    defenses: '1',
  },
];

const DEFENSES_DATA = [
  {
    date: 'Apr 20, 2024',
    champion: 'Carlos Adames',
    initials: 'CA',
    challenger: 'Julian Williams',
    challengerInitials: 'JW',
    result: 'W',
    method: 'TKO',
    rounds: '8',
    location: 'Las Vegas, NV',
  },
  {
    date: 'Jan 15, 2024',
    champion: 'Carlos Adames',
    initials: 'CA',
    challenger: 'Maciej Sulecki',
    challengerInitials: 'MS',
    result: 'W',
    method: 'UD',
    rounds: '12',
    location: 'Chicago, IL',
  },
];

export default function TitleHistoryTable() {
  return (
    <div className="w-full mx-auto px-6 md:px-12 flex flex-col gap-10">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Title History */}
        <div className="flex flex-col gap-3">
          <h3 className="text-[20px] font-['Bebas_Neue'] text-[#0a0a0a] tracking-[0.6px] uppercase">
            TITLE HISTORY
          </h3>
          <div className="bg-white border border-[#e8e2d8] rounded-[10px] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className="bg-[#f0ebe1] border-b border-[#e8e2d8] text-[10px] text-[#857f78] font-normal tracking-[0.6px] uppercase">
                    <th className="px-4 py-3 text-left w-12">#</th>
                    <th className="px-4 py-3 text-left">CHAMPION</th>
                    <th className="px-4 py-3 text-left">REIGN START</th>
                    <th className="px-4 py-3 text-left">REIGN END</th>
                    <th className="px-4 py-3 text-left">HOW WON</th>
                    <th className="px-4 py-3 text-left">HOW LOST</th>
                    <th className="px-4 py-3 text-center">DEFENSES</th>
                  </tr>
                </thead>
                <tbody className="text-[12px]">
                  {HISTORY_DATA.map((row) => (
                    <tr key={row.id} className="border-b border-[#f0ebe1] last:border-0">
                      <td className="px-4 py-4 text-[#e8e2d8] font-['Bebas_Neue'] text-base">
                        {row.id}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-[#0a0a0a] border border-[#d72322] flex items-center justify-center text-[11px] text-white font-['Bebas_Neue']">
                            {row.initials}
                          </div>
                          <span className="font-medium text-[#0a0a0a]">{row.champion}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-[#857f78]">{row.start}</td>
                      <td className="px-4 py-4 text-[#857f78]">{row.end}</td>
                      <td className="px-4 py-4">
                        <span className="bg-[#dcfce7] text-[#166534] px-2 py-1 rounded text-[10px] font-medium">
                          {row.howWon}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-[#857f78]">{row.howLost}</td>
                      <td className="px-4 py-4 text-center font-['Bebas_Neue'] text-sm text-[#0a0a0a]">
                        {row.defenses}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Notable Defenses */}
        <div className="flex flex-col gap-3">
          <h3 className="text-[20px] font-['Bebas_Neue'] text-[#0a0a0a] tracking-[0.6px] uppercase">
            NOTABLE DEFENSES
          </h3>
          <div className="bg-white border border-[#e8e2d8] rounded-[10px] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className="bg-[#f0ebe1] border-b border-[#e8e2d8] text-[10px] text-[#857f78] font-normal tracking-[0.6px] uppercase">
                    <th className="px-4 py-3 text-left">DATE</th>
                    <th className="px-4 py-3 text-left">CHAMPION</th>
                    <th className="px-4 py-3 text-left">CHALLENGER</th>
                    <th className="px-4 py-3 text-left">RESULT</th>
                    <th className="px-4 py-3 text-left">METHOD</th>
                    <th className="px-4 py-3 text-left">RDS</th>
                    <th className="px-4 py-3 text-left">LOCATION</th>
                  </tr>
                </thead>
                <tbody className="text-[12px]">
                  {DEFENSES_DATA.map((row, idx) => (
                    <tr key={idx} className="border-b border-[#f0ebe1] last:border-0">
                      <td className="px-4 py-4 text-[#857f78]">{row.date}</td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-[#0a0a0a] border border-[#d72322] flex items-center justify-center text-[11px] text-white font-['Bebas_Neue']">
                            {row.initials}
                          </div>
                          <span className="font-medium text-[#0a0a0a]">{row.champion}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-[#0a0a0a] border border-[#d72322] flex items-center justify-center text-[11px] text-white font-['Bebas_Neue']">
                            {row.challengerInitials}
                          </div>
                          <span className="font-medium text-[#0a0a0a]">{row.challenger}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="bg-[#dcfce7] text-[#166534] px-2 py-1 rounded text-[10px] font-medium">
                          {row.result}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-[#3d3b38]">{row.method}</td>
                      <td className="px-4 py-4 font-medium text-[#0a0a0a]">{row.rounds}</td>
                      <td className="px-4 py-4 text-[#857f78]">{row.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
