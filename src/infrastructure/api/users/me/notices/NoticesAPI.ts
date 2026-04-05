import type { Id } from "domain/models/types/core";
import API from "infrastructure/api/API";

import type { Notice } from "./Notices";

const NoticesAPI = {
  URI: "users/me/notices",

  async getNotices(): Promise<Notice[]> {
    return API.get(this.URI);
  },

  async deleteNotice(noticeId: Id): Promise<void> {
    await API.delete(`${this.URI}/${noticeId}`);
  },
};

export default NoticesAPI;

