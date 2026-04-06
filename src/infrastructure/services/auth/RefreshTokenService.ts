import { getAuth } from "infrastructure/api/generated/auth/auth";
import type {
  RefreshTokenModel,
  RefreshTokenRespModel,
} from "infrastructure/api/generated/models";
import { toErrorCode } from "infrastructure/services/utils/toErrorCode";

const authClient = getAuth();

export class RefreshTokenService {
  static async refreshIdToken(
    data: RefreshTokenModel,
  ): Promise<RefreshTokenRespModel> {
    try {
      const response = await authClient.postApiAuthRefreshToken(data);

      if (!response.data) {
        throw new Error("Refresh token response is empty.");
      }

      return response.data;
    } catch (error) {
      return toErrorCode(error);
    }
  }
}
