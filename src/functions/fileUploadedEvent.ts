import { S3Event } from "aws-lambda";
import { record } from "zod";

export async function handler(event: S3Event) {

    //Pega todos os eventos e os separa para que cada um seja publicado separadamente
    await Promise.all(
        event.Records.map(record => {
            //id o argv
            record.s3.object.key
        })
    ) 
}