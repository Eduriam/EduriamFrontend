"use client";

import { useSearchParams } from "next/navigation";

import FollowersOverview from "components/layouts/FollowersOverview/FollowersOverview";

export interface IFollowersPage {
  params: {
    userId: string;
  };
}

const FollowersPage: React.FC<IFollowersPage> = ({ params }) => {
  const searchParams = useSearchParams();

  function getInitialState() {
    switch (searchParams?.get("val")) {
      case "followers":
        return "followers";
      case "following":
        return "following";
      default:
        return undefined;
    }
  }

  return (
    <FollowersOverview
      userId={params.userId}
      initialState={getInitialState()}
    />
  );
};

export default FollowersPage;
