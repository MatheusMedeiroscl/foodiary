import z from "zod";
import { HttpRequest, HttpResponse } from "../types/Http";
import { badRequest, conflict, created } from "../utils/http";
import {db} from '../db/index'
import { usersTable } from "../db/schema";
import { eq } from "drizzle-orm";
import { hash } from "bcryptjs";
import { signAccessToken } from "../lib/jwt";
import { calculateGoals } from "../lib/calculateGoals";


//valida os dados recebidos
const schema = z.object({
   goal: z.enum(['lose', 'maintain', 'gain']),
    gender: z.enum(['male', 'female']),
    birthDate: z.coerce.date(),
    height: z.number().min(50).max(300), // exemplo de faixa
    weight: z.number().min(30).max(300),
    activityLevel: z.number().min(1).max(5),
    account: z.object({
        name: z.string().min(1),
        email: z.string().email(),
        password: z.string().min(8)
    })
});

export class SignupController {
    static async handle({body}: HttpRequest): Promise<HttpResponse>{
        const {success, error, data} = schema.safeParse(body)
        if(!success){
            return badRequest({errors: error.issues})
        }

        //verifica se o usuário já existe pelo email
        const userAlreadyExists = await db.query.usersTable.findFirst({
            columns: {
                email: true,
            },
            where: eq(usersTable.email, data.account.email),
        })

        if(userAlreadyExists){
            return conflict({error: 'This email is already in use'})
        }

        // abstrai os dados do account do restante
        const { account, ...rest } = data;

        // manda para o CalculateGoals para retornar quais serão as metas do user
        const goals = calculateGoals({
            activityLevel: rest.activityLevel,
            birthDate: new Date(rest.birthDate),
            gender: rest.gender,
            goal: rest.goal,
            height: rest.height,
            weight: rest.weight,
        });

        //hasheia a senha do usuário
        const hashedPassword =  await hash(account.password, 8)

        //faz o insert no banco
        const [user] = await db.insert(usersTable).values({
            ...account,
            ...rest,
            ...goals,
            password: hashedPassword,   
        }).returning({ id: usersTable.id });

        //cria um token de acesso
        const accessToken = signAccessToken(user.id)
        
        return created({accessToken})
    }

}