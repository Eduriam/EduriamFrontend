import { parseQueryParams } from "util/functions/api";

import API from "infrastructure/api/API";

import { Notice } from "./Notices";

export interface NoticeParams {}

const NoticesAPI = {
  URI: "user/notices",

  async getNotices(params: NoticeParams = {}): Promise<Array<Notice>> {
    return API.get(`${this.URI}?${parseQueryParams(params)}`);
  },

  async deleteNotice(noticeId: Id): Promise<void> {
    return API.delete(`${this.URI}/${noticeId}`);
  },
};

export default NoticesAPI;
