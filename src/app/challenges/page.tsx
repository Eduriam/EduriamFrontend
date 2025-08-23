"use client";

import ChallengesOverview from "components/layouts/ChallengesOverview/ChallengesOverview";

export interface IChallengesPage {}

const ChallengesPage: React.FC<IChallengesPage> = () => {
  return <ChallengesOverview />;
};

export default ChallengesPage;
