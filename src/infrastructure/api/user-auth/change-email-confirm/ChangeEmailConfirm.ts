export interface ChangeEmailConfirmRequestBody {
  token: string;
  oldEmail: string;
  newEmail: string;
}
