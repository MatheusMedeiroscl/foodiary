import { SendMessageCommand } from '@aws-sdk/client-sqs';
import { S3Event } from 'aws-lambda';
import { sqsClient } from '../clients/sqsClient';

//recebe os dados HTTP e responde par o usuário oque o controller ou o erro responder 
//PARA CADA UM QUE FOR RECEBIDO
export async function handler(event: S3Event) {

    //Pega todos os eventos e os separa para que cada um seja publicado separadamente
    await Promise.all(
        event.Records.map( async record => {
            const command = new SendMessageCommand({
                QueueUrl: process.env.MEALS_QUEUE_URL,
                MessageBody: JSON.stringify({fileKey: record.s3.object.key}),
            });

            await sqsClient.send(command);
        }),
    ) 
}