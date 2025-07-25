import { HttpResponse } from "../types/Http";

// Função responsável por padronizar e serializar a resposta HTTP antes de enviá-la para o cliente
export function parseResponse({statusCode, body}: HttpResponse){
    return{
        statusCode,
        body: body ? JSON.stringify(body): undefined,
    };
}