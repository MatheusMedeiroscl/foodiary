import { compare } from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

import { db } from '../db';
import { usersTable } from '../db/schema';
import { HttpRequest, HttpResponse } from '../types/Http';
import { badRequest, ok, unauthorized } from '../utils/http';
import {sign} from 'jsonwebtoken';
import { signAccessToken } from '../lib/jwt';

const schema = z.object({
    email: z.email(),
    password: z.string().min(8)
})

export class SigninController {
    static async handle({body}: HttpRequest): Promise<HttpResponse>{
        const {success, error, data} = schema.safeParse(body)
        
        if(!success){
            return badRequest({errors: error.issues})
        }


        
        const user = await db.query.usersTable.findFirst({
            columns: {
                id: true,
                email: true,
                password: true,

            }, 
            where: eq(usersTable.email, data.email),
            })  
            
        if(!user){
            return unauthorized({error: 'invalid email'})
        }    
        
        const isPasswordValid = await compare(data.password, user.password);

        if(!isPasswordValid){
            return unauthorized({error: 'invalid password'})
        }   
        
        const accessToken = signAccessToken(user.id)
        
        
        return ok({accessToken})
    }

}