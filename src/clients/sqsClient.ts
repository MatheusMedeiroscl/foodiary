import { SQSClient } from "@aws-sdk/client-sqs";

// exporta a fila sqs
export const sqsClient = new SQSClient();