import { HttpRequest, HttpResponse } from "../types/Http";
import { ok } from "../utils/http";

export class SignupController {
    static async handle(request: HttpRequest): Promise<HttpResponse>{
        return ok({accessToken : 'access Token'})
    }

}