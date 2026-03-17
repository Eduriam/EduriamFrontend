export interface ChangePasswordRequestBody {
  resetToken: string;
  email: string;
  password: string;
}
