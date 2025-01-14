import { httpClient } from "app/http";
import { Produto } from "app/models/produtos";
import { AxiosResponse } from "axios";

const resourceUrl: string = "/api/produtos"

export const useProdutoService = () => {
    const salvar = async (produto: Produto): Promise<Produto> => {
        const response: AxiosResponse<Produto> = await httpClient.post<Produto>(resourceUrl, produto)
        return response.data
    }

    const atualizar = async (produto: Produto): Promise<void> =>{
        const url: string = `${resourceUrl}/${produto.id}`
        const response: AxiosResponse<Produto> = await httpClient.put<Produto>(url, produto)
    }

    return {
        salvar,
        atualizar
    }
}