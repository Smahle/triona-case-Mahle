export interface UserInfoDto {
  id: string;
  firstName: string;
  lastName: string;
  adress: string;
  birthDate: Date;
  phoneNumber: number;
}
export interface LoginCredentials {
  userName: string;
  password: string;
}
