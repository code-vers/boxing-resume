'use client';

/**
 * @file fighters/page.tsx
 * @description Public-facing Fighters page.
 *
 * AllFightersGrid is self-contained — it manages its own data fetching via
 * useRankingsTable, running the full pipeline:
 *   /divisions → /rankings → /fighters/{id} + /fights
 *
 * To inject ratings from an external source, pass:
 *   <AllFightersGrid externalRatings={{ "fighter-id-123": 95.4 }} />
 *
 * To restrict to specific divisions, pass:
 *   <AllFightersGrid divisionFilter={["div-id-1", "div-id-2"]} />
 */

import AllFightersBanner from '@/components/website/all-fighters/AllFightersBanner';
import AllFightersGrid from '@/components/website/all-fighters/AllFightersGrid';

const FightersPage = () => {
    return (
        <div>
            <AllFightersBanner />
            <AllFightersGrid />
        </div>
    );
};

export default FightersPage;
