import { date, z } from 'zod';

import { db } from '../db';
import { mealsTable } from '../db/schema';
import { HttpResponse, ProtectedHttpRequest } from '../types/Http';
import { badRequest, ok } from '../utils/http';
import { eq, and, gte, lte } from 'drizzle-orm';


const schema = z.object({
    date: z.coerce.date().transform(datestr => new Date(datestr)), // além de validar os dados ele transforma a str em date
})


export class ListeMealsController {
    static async handle({userId, queryParams}: ProtectedHttpRequest): Promise<HttpResponse>{
        const {success, error, data} = schema.safeParse(queryParams)
        
        if(!success){
            return badRequest({errors: error.issues})
        }

        // cria uma data limite para validação do GET
        const endDate = new Date(data.date);
        endDate.setUTCHours(23,59,59,59);
    
        const meals = await db.query.mealsTable.findMany({
            columns: {
                id: true,
                foods: true,
                createdAt: true,
                icon: true,
                name: true,
            },
             where: and (
                    eq(mealsTable.userId, userId),
                    eq(mealsTable.status, 'success'),
                    gte(mealsTable.createdAt, data.date),
                    lte(mealsTable.createdAt, endDate),
                    
                )
        });

        return ok({meals})
    }
}