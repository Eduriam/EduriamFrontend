"use client";

import TopicsOverview from "components/layouts/TopicsOverview/TopicsOverview";

import useAuth from "infrastructure/services/AuthProvider";

export interface ITopicSelectionPage {}

const TopicSelectionPage: React.FC<ITopicSelectionPage> = () => {
  const { user } = useAuth();

  return <>{user && <TopicsOverview courseId={user.selectedCourse.id} />}</>;
};

export default TopicSelectionPage;
