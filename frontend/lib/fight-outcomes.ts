export interface RapidFightFighter {
  fighter_id: string | null;
  name: string;
  full_name: string;
  winner: boolean;
}

export interface RapidFightResults {
  outcome: string;
  outcome_long: string;
  round: number;
}

export interface RapidFight {
  id: string;
  title: string;
  date: string;
  status: string; // e.g., "FINISHED"
  results: RapidFightResults | null;
  fighters: {
    fighter_1: RapidFightFighter;
    fighter_2: RapidFightFighter;
  };
}

/**
 * Computes a fighter's "Last 6" fight outcomes from their fights history.
 *
 * @param fighterId - The ID of the target fighter.
 * @param fights - The array of fights returned by the API.
 * @returns A space-separated string of outcomes (e.g. "W L W W D W") or fallback "—".
 */
export function computeLastSixOutcomes(fighterId: string, fights: RapidFight[]): string {
  if (!fighterId || !fights || !Array.isArray(fights)) {
    return '—';
  }

  // 1. Strict filtering: status === "FINISHED" and results is not null
  const finishedFights = fights.filter(
    (fight) => fight.status === 'FINISHED' && fight.results !== null
  );

  // 2. Take up to the first 6 matches (from the newest first list)
  const recentSix = finishedFights.slice(0, 6);

  // 3. Loop through and map target fighter to W, L, or D
  const outcomes: ('W' | 'L' | 'D')[] = [];

  recentSix.forEach((fight) => {
    const f1 = fight.fighters?.fighter_1;
    const f2 = fight.fighters?.fighter_2;

    const isF1 = f1?.fighter_id === fighterId;
    const isF2 = f2?.fighter_id === fighterId;

    if (isF1 || isF2) {
      const target = isF1 ? f1 : f2;
      const opponent = isF1 ? f2 : f1;

      if (target?.winner === true) {
        outcomes.push('W');
      } else if (opponent?.winner === true) {
        outcomes.push('L');
      } else {
        outcomes.push('D');
      }
    }
  });

  // 4. Reverse the array so they read chronologically (oldest on left, newest on right)
  outcomes.reverse();

  // 5 & 6. Join with space, fallback to "—" if empty
  return outcomes.join(' ') || '—';
}
