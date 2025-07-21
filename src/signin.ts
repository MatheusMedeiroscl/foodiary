export async function handler(event) {
    return {
        statusCode: event,
        body: JSON.stringify({
            message: 'Hello from the handler in signin!',
            input: event,
        }),
    }
    
}