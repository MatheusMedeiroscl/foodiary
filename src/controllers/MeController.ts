import { compare } from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

import { db } from '../db';
import { usersTable } from '../db/schema';
import { HttpRequest, HttpResponse, ProtectedHttpRequest } from '../types/Http';
import { badRequest, ok, unauthorized } from '../utils/http';
import {sign} from 'jsonwebtoken';
import { signAccessToken } from '../lib/jwt';



export class MeController {
    static async handle({userId}: ProtectedHttpRequest): Promise<HttpResponse>{
        const user = await db.query.usersTable.findFirst({
            columns: {
                id: true,
                email: true,
                name: true,
                calories: true,
                proteins: true,
                carbohydrates: true,
                fats: true,
            },
            where: eq(usersTable.id, userId)
        })
        return ok({user})
    }

}