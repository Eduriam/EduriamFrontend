import type { Id } from "domain/models/types/core";
import { Modify } from "domain/models/utils/modify";
import { parseQueryParams } from "util/functions/api";

import API, { FetchHook } from "infrastructure/api/API";
import useAPI from "infrastructure/api/hooks/useAPI";

import { BaseTemplate } from "./BaseTemplates";

export interface BaseTemplateParams {}

const BaseTemplatesAPI = {
  URI: "base-templates",

  useBaseTemplate(
    id: Id,
  ): Modify<FetchHook<BaseTemplate>, { baseTemplate: BaseTemplate }> {
    const { data, ...rest } = useAPI<BaseTemplate>(`${this.URI}/${id}`);
    return { baseTemplate: data, ...rest };
  },

  useBaseTemplates(
    params: BaseTemplateParams = {},
  ): Modify<
    FetchHook<Array<BaseTemplate>>,
    { baseTemplates: Array<BaseTemplate> }
  > {
    const { data, ...rest } = useAPI<Array<BaseTemplate>>(
      `${this.URI}?${parseQueryParams(params)}`,
    );
    return { baseTemplates: data, ...rest };
  },

  async createBaseTemplate(
    baseTemplate: Omit<BaseTemplate, "id">,
  ): Promise<BaseTemplate> {
    return API.post(`${this.URI}`, baseTemplate);
  },

  async getBaseTemplate(baseTemplateId: Id): Promise<BaseTemplate> {
    return API.get(`${this.URI}/${baseTemplateId}`);
  },

  async getBaseTemplates(
    params: BaseTemplateParams = {},
  ): Promise<Array<BaseTemplate>> {
    return API.get(`${this.URI}?${parseQueryParams(params)}`);
  },

  async updateBaseTemplate(
    baseTemplate: Partial<BaseTemplate>,
  ): Promise<BaseTemplate> {
    return API.put(`${this.URI}/${baseTemplate.id}`, baseTemplate);
  },

  async deleteBaseTemplate(baseTemplateId: Id): Promise<void> {
    return API.delete(`${this.URI}/${baseTemplateId}`);
  },
};

export default BaseTemplatesAPI;

