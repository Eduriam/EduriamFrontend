import type { Id } from "domain/models/types/core";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import type { Notice } from "infrastructure/api/users/me/notices/Notices";
import NoticesAPI from "infrastructure/api/users/me/notices/NoticesAPI";

export interface NoticeContextType {
  notices: Notice[];
  fetchNotices: () => Promise<Notice[]>;
  markNoticeAsRead: (noticeId: Id) => Promise<void>;
}

export const NoticeContext = createContext<NoticeContextType | undefined>(
  undefined,
);

function mergeNotices(existing: Notice[], incoming: Notice[]): Notice[] {
  if (incoming.length === 0) {
    return existing;
  }

  const seen = new Set(existing.map((notice) => notice.id));
  const merged = [...existing];

  for (const notice of incoming) {
    if (seen.has(notice.id)) {
      continue;
    }

    seen.add(notice.id);
    merged.push(notice);
  }

  return merged;
}

// Source: https://dev.to/finiam/predictable-react-authentication-with-the-context-api-g10
export function NoticeProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [notices, setNotices] = useState<Notice[]>([]);

  const fetchNotices = useCallback(async (): Promise<Notice[]> => {
    const newNotices = await NoticesAPI.getNotices();
    setNotices((previousNotices) => mergeNotices(previousNotices, newNotices));
    return newNotices;
  }, []);

  const markNoticeAsRead = useCallback(async (noticeId: Id) => {
    await NoticesAPI.deleteNotice(noticeId);
    setNotices((previousNotices) =>
      previousNotices.filter((notice) => notice.id !== noticeId),
    );
  }, []);

  const contextValue = useMemo<NoticeContextType>(
    () => ({
      notices,
      fetchNotices,
      markNoticeAsRead,
    }),
    [notices, fetchNotices, markNoticeAsRead],
  );

  return (
    <NoticeContext.Provider value={contextValue}>
      {children}
    </NoticeContext.Provider>
  );
}

export default function useNotices(): NoticeContextType {
  const context = useContext(NoticeContext);

  if (!context) {
    throw new Error("useNotices must be used within a NoticeProvider.");
  }

  return context;
}

