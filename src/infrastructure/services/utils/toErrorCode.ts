import axios from "axios";

export const toErrorCode = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    const errorPayload = error.response?.data as
      | { error?: string; code?: string }
      | undefined;
    const errorCode = errorPayload?.error ?? errorPayload?.code;
    throw errorCode ?? error;
  }

  throw error;
};
