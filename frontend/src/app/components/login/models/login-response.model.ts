import { UserModel } from "./user.model";

// Bize API isteği sonrasında geri dönecek cevap için model oluşturduk.
export class LoginResponseModel{
    token: string = "";
    user: UserModel = new UserModel();
}
