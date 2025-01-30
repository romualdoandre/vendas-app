import { httpClient } from "app/http";
import { Cliente } from "app/models/clientes";
import { AxiosResponse } from "axios";
import { Page } from "app/models/common/page";

const resourceUrl: string = "/api/clientes"

export const useClienteService = () =>{
    const salvar = async (cliente: Cliente): Promise<Cliente> => {
        const response: AxiosResponse<Cliente> = await httpClient.post<Cliente>(resourceUrl, cliente)
        return response.data
    }
    const atualizar = async (cliente: Cliente): Promise<void> =>{
        const url: string = `${resourceUrl}/${cliente.id}`
        const response: AxiosResponse<Cliente> = await httpClient.put<Cliente>(url, cliente)
    }

    const carregarCliente = async (id) : Promise<Cliente> => {
        const url: string = `${resourceUrl}/${id}`
        const response: AxiosResponse<Cliente> = await httpClient.get(url);
        return response.data;
    }

    const deletar = async (id) : Promise<void> => {
        const url: string = `${resourceUrl}/${id}`
        await httpClient.delete(url)
    }

    const find = async (
        nome: string = '', 
        cpf: string = '', 
        page: number = 0, 
        size: number = 10) : Promise<Page<Cliente>> =>  {
        const url = `${resourceUrl}?nome=${nome}&cpf=${cpf}&page=${page}&size=${size}`
        const response: AxiosResponse<Page<Cliente>> = await httpClient.get(url);
        return response.data;
    }   

    return {
        salvar,
        atualizar,
        carregarCliente,
        deletar,
        find
    }
}