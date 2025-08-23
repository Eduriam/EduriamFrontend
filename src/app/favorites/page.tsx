"use client";

import FavoritesOverview from "components/layouts/FavoritesOverview/FavoritesOverview";

import useAuth from "infrastructure/services/AuthProvider";

export interface IFavoritesPage {}

const FavoritesPage: React.FC<IFavoritesPage> = () => {
  const { user } = useAuth();

  return <>{user && <FavoritesOverview courseId={user.selectedCourse.id} />}</>;
};

export default FavoritesPage;
