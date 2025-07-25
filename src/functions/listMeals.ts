import { APIGatewayProxyEventV2 } from 'aws-lambda';
import { parseResponse } from '../utils/parseResponse';
import { parseProtectedEvent } from '../utils/parseProtectedEvent';
import { unauthorized } from '../utils/http';
import { ListeMealsController } from '../controllers/ListMealsController';

//recebe os dados HTTP e responde par o usuário oque o controller ou o erro responder
export async function handler(event: APIGatewayProxyEventV2) {
  try {
    const request = parseProtectedEvent(event);
    const response = await ListeMealsController.handle(request);
    return parseResponse(response);
  } catch {
    return parseResponse(
      unauthorized({ error: 'Invalid access token.' })
    );
  }
}