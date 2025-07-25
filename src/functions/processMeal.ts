import { SQSEvent } from "aws-lambda";
import { ProcessMeal } from "../queue/ProcessMeal";

//recebe os dados HTTP e responde par o usuário oque o controller ou o erro responder
export async function handler(event: SQSEvent) {
    await Promise.all(event.Records.map( async record => {
        const body = JSON.parse(record.body);
        await ProcessMeal.process(body)
    }));
    
}