"use client";

import { PageRoot } from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";
import icons from "styles/icons";

import { useEffect } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import BottomFab from "components/atoms/BottomFab/BottomFab";
import StudyMap from "components/atoms/StudyMap/StudyMap";
import NoticeBoard from "components/molecules/NoticeBoard/NoticeBoard";

import { UserPrivate } from "infrastructure/api/user/User";
import { LocalStorageManager } from "infrastructure/repositories/LocalStorageManager";
import useAuth from "infrastructure/services/AuthProvider";

export interface IHomePage {}

const HomePage: React.FC<IHomePage> = () => {
  const searchParams = useSearchParams();
  const { user, mutateUser } = useAuth();
  const { t } = useTranslation("common");
  const router = useRouter();

  function getSearchParamsLevel(): number | undefined {
    const level = searchParams?.get("level");

    if (level !== null && !isNaN(Number(level))) {
      return Number(level);
    }
    return undefined;
  }

  useEffect(() => {
    const params = searchParams?.get("level");
    let level;

    if (params !== null && !isNaN(Number(params))) {
      level = Number(params);
    } else {
      level = undefined;
    }

    if (
      user?.lastViewedStudyMapLevel &&
      (level === undefined || level === null)
    ) {
      router.push(`/?level=${user?.lastViewedStudyMapLevel}`);
    }

    if (level !== user?.lastViewedStudyMapLevel && level !== undefined) {
      const change: Partial<UserPrivate> = {
        lastViewedStudyMapLevel: level,
      };
      mutateUser(change);
      LocalStorageManager.setItem<number>("lastViewedStudyMapLevel", level);
    }
  }, [searchParams, mutateUser, user?.lastViewedStudyMapLevel, router]);

  return (
    <PageRoot data-test="home-page">
      {user && <NoticeBoard fetchNewNotices={true} />}
      {user && (
        <StudyMap
          courseId={user.selectedCourse.id}
          level={getSearchParamsLevel()}
          lastViewedLevel={user.lastViewedStudyMapLevel ?? 0}
        />
      )}
      <BottomFab
        header={t("studying.study")}
        icon={icons.start}
        onClick={() => router.push(`/study`)}
      />
    </PageRoot>
  );
};

export default HomePage;
