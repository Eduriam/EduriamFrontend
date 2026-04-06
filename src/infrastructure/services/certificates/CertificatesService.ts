import type { Id } from "domain/models/types/core";
import { Modify } from "domain/models/utils/modify";

import { FetchHook } from "infrastructure/api/API";
import { getCertificates } from "infrastructure/api/generated/certificates/certificates";
import type { CertificateModel } from "infrastructure/api/generated/models";
import useAPI from "infrastructure/api/hooks/useAPI";
import { toErrorCode } from "infrastructure/services/utils/toErrorCode";

const certificatesClient = getCertificates();

function useCertificateQuery(
  id: Id,
): Modify<FetchHook<CertificateModel>, { certificate: CertificateModel }> {
  const { data, ...rest } = useAPI<CertificateModel>(
    `certificates/${id}`,
    async () => CertificatesService.getCertificate(id),
  );

  return { certificate: data, ...rest };
}

export const CertificatesService = {
  async getCertificate(id: Id): Promise<CertificateModel> {
    try {
      const response = await certificatesClient.getApiCertificatesId(id);
      if (!response.data) {
        throw new Error("Certificate response is empty.");
      }

      return response.data;
    } catch (error) {
      return toErrorCode(error);
    }
  },

  useCertificate(
    id: Id,
  ): Modify<FetchHook<CertificateModel>, { certificate: CertificateModel }> {
    return useCertificateQuery(id);
  },
};
