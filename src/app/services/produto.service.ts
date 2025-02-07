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

    const carregarProduto = async (id) : Promise<Produto> => {
        const url: string = `${resourceUrl}/${id}`
        const response: AxiosResponse<Produto> = await httpClient.get(url);
        return response.data;
    }

    const deletar = async (id) : Promise<void> => {
        const url: string = `${resourceUrl}/${id}`
        await httpClient.delete(url)
    }

    const listar = async () : Promise<Produto[]> => {
        const response: AxiosResponse<Produto[]> = await httpClient.get(resourceUrl )
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