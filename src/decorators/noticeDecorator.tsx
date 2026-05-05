import { Story } from "@storybook/react";

import {
  NoticeContext,
  NoticeContextType,
} from "../infrastructure/services/NoticeProvider";

export default function NoticeDecorator(Story: Story) {
  const mock: NoticeContextType = {
    fetchNotices: async () => [],
    markNoticeAsRead: async () => console.log("markNoticeAsRead"),
    notices: [],
  };

  return (
    <div>
      <NoticeContext.Provider value={mock}>
        <Story />
      </NoticeContext.Provider>
    </div>
  );
}
