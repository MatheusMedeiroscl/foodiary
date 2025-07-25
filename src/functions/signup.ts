import { APIGatewayProxyEventV2 } from 'aws-lambda';
import { SignupController } from "../controllers/SignupController";
import { parseEvent } from '../utils/parseEvent';
import { parseResponse } from '../utils/parseResponse';

//recebe os dados HTTP e responde par o usuário oque o controller ou o erro responder
export async function handler(event: APIGatewayProxyEventV2) {
    const request = parseEvent(event);
    const response = await SignupController.handle(request);
    return parseResponse(response);


    
};