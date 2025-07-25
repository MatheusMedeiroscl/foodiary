import { APIGatewayProxyEventV2 } from 'aws-lambda';
import { validateAccessToken } from '../lib/jwt';
import { ProtectedHttpRequest } from '../types/Http';
import { parseEvent } from './parseEvent';

// esse argv vai ser responsavel por organizar e padronizar os parametros da request em um objeto 
// Com uma autenticação JWT 
export function parseProtectedEvent(event: APIGatewayProxyEventV2): ProtectedHttpRequest {
  const baseEvent = parseEvent(event);
  const { authorization } = event.headers;

  if (!authorization) {
    throw new Error('Access token not provided.');
  }
  
// tira o Baerer do Autheticate
  const [, token] = authorization.split(' ');
  const userId = validateAccessToken(token);

  if (!userId) {
    throw new Error('Invalid access token.');
  }

  return {
    ...baseEvent,
    userId,
  };
}
