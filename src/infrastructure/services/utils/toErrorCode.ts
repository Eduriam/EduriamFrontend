import axios from "axios";

export const toErrorCode = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    const errorCode = (error.response?.data as { error?: string } | undefined)
      ?.error;
    throw errorCode ?? error;
  }

  throw error;
};

