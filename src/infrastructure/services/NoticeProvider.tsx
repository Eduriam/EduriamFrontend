import { ReactNode, createContext, useContext, useState } from "react";

import { Notice } from "infrastructure/api/user/notices/Notices";
import NoticesAPI from "infrastructure/api/user/notices/NoticesAPI";

export interface NoticeContextType {
  notices: Array<Notice>;
  addNotices: (noticesToAdd: Array<Notice>) => void;
  popNotice: () => void;
  fetchNotices: () => Promise<void>;
  deleteNotice: (noticeId: Id) => void;
}

export const NoticeContext = createContext<NoticeContextType>(
  {} as NoticeContextType,
);

// Source: https://dev.to/finiam/predictable-react-authentication-with-the-context-api-g10
export function NoticeProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [notices, setNotices] = useState<Array<Notice>>([]);

  function addNotices(noticesToAdd: Array<Notice>) {
    setNotices([...notices, ...noticesToAdd]);
  }

  function popNotice() {
    setNotices(notices.slice(1));
  }

  async function fetchNotices() {
    // Isn't implemented on backend in v1.0.0
    // const newNotices = await NoticesAPI.getNotices();
    const newNotices: Array<Notice> = [];

    setNotices([...notices, ...newNotices]);

    return Promise.resolve();
  }

  async function deleteNotice(noticeId: Id) {
    setNotices(notices.filter((e) => e.id !== noticeId));
    await NoticesAPI.deleteNotice(noticeId);
  }

  return (
    <NoticeContext.Provider
      value={{
        notices,
        addNotices,
        popNotice,
        deleteNotice,
        fetchNotices,
      }}
    >
      {children}
    </NoticeContext.Provider>
  );
}

export default function useNotices(): NoticeContextType {
  return useContext(NoticeContext);
}
