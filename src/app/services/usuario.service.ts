import { httpClient } from "app/http";
import { AxiosResponse } from "axios";
import { Token } from "app/models/token"
import { Usuario } from "app/models/usuario";

const resourceUrl: string = "/api/usuarios"


export const useUsuarioService = () => {
    const autenticar = async (credentials): Promise<Token> =>{

        const usuario: Usuario = {email:credentials.username, senha: credentials.password}

        try{
        const response: AxiosResponse<Token> = await httpClient.post<Token>(resourceUrl+'/autenticar', usuario)
        return response.data
        }
        catch(e){
            console.error(e)
            return null
        }
    }
    return {
        autenticar
    }
}
