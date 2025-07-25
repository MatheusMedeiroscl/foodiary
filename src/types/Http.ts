// DEFINE O FORMATO BASE PARA UMA REQ HTTP GENÉRICA

export type HttpRequest = {
    body: Record<string, any>; // o corpo da req 
    queryParams: Record<string, any>; // parâmetros da URL
    params: Record<string, any>; // parâmetros da rota
};

// Requisição HTTP protegida por autenticação por meio o ID do usuário
export type ProtectedHttpRequest =  HttpRequest & {
    userId: string
}
// Define a estrutura esperada de uma resposta do HTTP
export type HttpResponse = {
    statusCode: number; // código HTTP
    body: Record<string, any>; // respota da req
};