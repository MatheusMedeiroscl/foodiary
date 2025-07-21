import { APIGatewayProxyEventV2 } from 'aws-lambda';
import { SigninController } from "../controllers/SigninController";
import { parseEvent } from '../utils/parseEvent';
import { parseResponse } from '../utils/parseResponse';

export async function handler(event: APIGatewayProxyEventV2) {
  const request = parseEvent(event);
  const response = await SigninController.handle(request);
  return parseResponse(response);
    
};