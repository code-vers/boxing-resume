import ChampionsGrid from '@/components/website/champions/ChampionsGrid';
import ResultsBanner from '@/components/website/results/ResultsBanner';

const page = () => {
  return (
    <div>
      <ResultsBanner />
      <ChampionsGrid />
    </div>
  );
};

export default page;
