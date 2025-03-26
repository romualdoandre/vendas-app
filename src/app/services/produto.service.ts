import { httpClient, registrarToken } from "app/http";
import { Produto } from "app/models/produtos";
import { AxiosResponse } from "axios";

const resourceUrl: string = "/api/produtos"

export const useProdutoService = () => {
    
    const salvar = async (produto: Produto, headers?: any): Promise<Produto> => {
        const response: AxiosResponse<Produto> = await httpClient.post<Produto>(resourceUrl, produto, headers)
        return response.data
    }

    const atualizar = async (produto: Produto, headers?: any): Promise<void> =>{
        const url: string = `${resourceUrl}/${produto.id}`
        const response: AxiosResponse<Produto> = await httpClient.put<Produto>(url, produto, headers)
    }

    const carregarProduto = async (id, headers?: any) : Promise<Produto> => {
        const url: string = `${resourceUrl}/${id}`
        const response: AxiosResponse<Produto> = await httpClient.get(url, headers);
        return response.data;
    }

    const deletar = async (id, headers?: any) : Promise<void> => {
        const url: string = `${resourceUrl}/${id}`
        await httpClient.delete(url, headers)
    }

    const listar = async (headers?: any) : Promise<Produto[]> => {
        const response: AxiosResponse<Produto[]> = await httpClient.get(resourceUrl, headers )
        return response.data
    }

    return {
        salvar,
        atualizar,
        carregarProduto,
        deletar,
        listar
    }
}