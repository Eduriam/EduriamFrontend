import { Modify } from "domain/models/utils/modify";
import { parseQueryParams } from "util/functions/api";

import API, { FetchHook } from "infrastructure/api/API";
import useAPI from "infrastructure/api/hooks/useAPI";

import { BaseTemplate } from "./BaseTemplates";

export interface BaseTemplateParams {}

const BaseTemplatesAPI = {
  URI: (base0TemplateId: Id) =>
    `base-0-templates/${base0TemplateId}/base-templates`,

  useBaseTemplate(
    base0TemplateId: Id,
    id: Id,
  ): Modify<FetchHook<BaseTemplate>, { baseTemplate: BaseTemplate }> {
    const { data, ...rest } = useAPI<BaseTemplate>(
      `${this.URI(base0TemplateId)}/${id}`,
    );
    return { baseTemplate: data, ...rest };
  },

  useBaseTemplates(
    base0TemplateId: Id,
    params: BaseTemplateParams = {},
  ): Modify<
    FetchHook<Array<BaseTemplate>>,
    { baseTemplates: Array<BaseTemplate> }
  > {
    const { data, ...rest } = useAPI<Array<BaseTemplate>>(
      `${this.URI(base0TemplateId)}?${parseQueryParams(params)}`,
    );
    return { baseTemplates: data, ...rest };
  },

  async createBaseTemplate(
    base0TemplateId: Id,
    baseTemplate: Omit<BaseTemplate, "id">,
  ): Promise<BaseTemplate> {
    return API.post(`${this.URI(base0TemplateId)}`, baseTemplate);
  },

  async getBaseTemplate(base0TemplateId: Id, id: Id): Promise<BaseTemplate> {
    return API.get(`${this.URI(base0TemplateId)}/${id}`);
  },

  async getBaseTemplates(
    base0TemplateId: Id,
    params: BaseTemplateParams = {},
  ): Promise<Array<BaseTemplate>> {
    return API.get(`${this.URI(base0TemplateId)}?${parseQueryParams(params)}`);
  },

  async updateBaseTemplate(
    base0TemplateId: Id,
    baseTemplate: Partial<BaseTemplate>,
  ): Promise<BaseTemplate> {
    return API.put(
      `${this.URI(base0TemplateId)}/${baseTemplate.id}`,
      baseTemplate,
    );
  },

  async deleteBaseTemplate(
    base0TemplateId: Id,
    baseTemplate: BaseTemplate,
  ): Promise<BaseTemplate> {
    return API.delete(`${this.URI(base0TemplateId)}/${baseTemplate.id}`);
  },
};

export default BaseTemplatesAPI;
