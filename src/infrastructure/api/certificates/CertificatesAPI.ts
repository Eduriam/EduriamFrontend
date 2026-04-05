import type { Id } from "domain/models/types/core";
import { Modify } from "domain/models/utils/modify";

import API, { FetchHook } from "infrastructure/api/API";
import useAPI from "infrastructure/api/hooks/useAPI";

export interface CertificateDTO {
  id: Id;
  /** Full name of the certificate recipient. */
  userName: string;
  /** Name of the completed course or learning path. */
  courseName: string;
  /** Date when the course or learning path was completed (formatted string). */
  completedAt: string;
}

const CertificatesAPI = {
  URI: "certificates",

  async getCertificate(id: Id): Promise<CertificateDTO> {
    return API.get(`${this.URI}/${id}`);
  },

  useCertificate(
    id: Id,
  ): Modify<FetchHook<CertificateDTO>, { certificate: CertificateDTO }> {
    const { data, ...rest } = useAPI<CertificateDTO>(`${this.URI}/${id}`);
    return { certificate: data, ...rest };
  },
};

export default CertificatesAPI;

