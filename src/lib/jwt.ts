import { JwtPayload, sign, verify } from "jsonwebtoken";

//assina o token de acesso com o userID
export function signAccessToken(userId: string){
   const accessToken = sign(
            {sub: userId},
             process.env.JWT_SECRET!,
            {expiresIn: '3d'},
        );

        return accessToken;
          
}

// Recebe o token JWT e retorna o userID que está no sub da chave
export function validateAccessToken(token: string){
   try{ 
    const { sub } = verify(token, process.env.JWT_SECRET!) as JwtPayload;
     
    return sub ?? null
    }catch{
        return null;
    }
}