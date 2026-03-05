import type { IconName } from "@eduriam/ui-core";

export const drawerWidth = 240;

interface DrawerItem {
  label: string;
  icon: IconName;
  path: string;
  premium?: boolean;
}

export const lessons: DrawerItem[] = [
  {
    label: "studying.vocabulary",
    icon: "study",
    path: "/lessons?type=VOCABULARY",
  },
  {
    label: "studying.grammar",
    icon: "study",
    path: "/lessons?type=GRAMMAR",
  },
  {
    label: "studying.pronunciation",
    icon: "study",
    path: "/lessons?type=PRONUNCIATION",
  },
  {
    label: "studying.speaking",
    icon: "study",
    path: "/lessons?type=SPEAKING",
  },
  {
    label: "studying.reading",
    icon: "study",
    path: "/lessons?type=READING",
  },
  {
    label: "studying.listening",
    icon: "study",
    path: "/lessons?type=LISTENING",
  },
];

export const levels: DrawerItem[] = [
  {
    label: "levels.0",
    icon: "study",
    path: "/?level=0",
    premium: false,
  },
  {
    label: "levels.1",
    icon: "study",
    path: "/?level=1",
    premium: false,
  },
  {
    label: "levels.2",
    icon: "study",
    path: "/?level=2",
    premium: false,
  },
  {
    label: "levels.3",
    icon: "study",
    path: "/?level=3",
    premium: false,
  },
  {
    label: "levels.4",
    icon: "study",
    path: "/?level=4",
    premium: true,
  },
  {
    label: "levels.5",
    icon: "study",
    path: "/?level=5",
    premium: true,
  },
];

export const studying: DrawerItem[] = [
  {
    label: "navigation.favorites",
    icon: "star",
    path: "/favorites",
  },
  {
    label: "navigation.myVocabulary",
    icon: "study",
    path: "/user-lessons",
  },
  {
    label: "navigation.courses",
    icon: "courses",
    path: "/courses",
  },
  {
    label: "navigation.search",
    icon: "search",
    path: "/search",
  },
];

export const other: DrawerItem[] = [
  {
    label: "navigation.help",
    icon: "help",
    path: "/help",
  },
  {
    label: "navigation.premium",
    icon: "premium",
    path: "/premium",
  },
  {
    label: "navigation.settings",
    icon: "settings",
    path: "/settings",
  },
  {
    label: "navigation.logout",
    icon: "logout",
    path: "/logout",
  },
];
