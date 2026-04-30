import { getUsers } from "infrastructure/api/generated/users/users";
import { toErrorCode } from "infrastructure/services/utils/toErrorCode";

const usersClient = getUsers();

const DeviceService = {
  async registerDeviceToken(token: string): Promise<void> {
    try {
      await usersClient.postApiUsersMeDevices({ token });
    } catch (error) {
      return toErrorCode(error);
    }
  },
};

export default DeviceService;
