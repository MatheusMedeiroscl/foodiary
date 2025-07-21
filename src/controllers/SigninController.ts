import { HttpRequest, HttpResponse } from "../types/Http";
import { created } from "../utils/http";

export class SigninController {
    static async handle(request: HttpRequest): Promise<HttpResponse>{
        return created({accessToken: 'access Token'})
    }

}