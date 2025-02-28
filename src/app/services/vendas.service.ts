import { httpClient } from "app/http";
import { Venda, ItemVenda } from "app/models/vendas";
import { AxiosResponse } from "axios";

const resourceUrl = '/api/vendas'

export const useVendaService = () =>{

    const realizarVenda = async (venda: Venda): Promise<void> => {
        await httpClient.post<Venda>(resourceUrl, venda)
    }

    const gerarRelatorioVendas = async (idCliente: string = '', dataInicio: string='', dataFim: string=''): Promise<Blob> =>{
        const url = `${resourceUrl}/relatorio-vendas?id=${idCliente}&inicio=${dataInicio}&fim=${dataFim}`
        const response = await httpClient.get(url,{responseType:'blob'})
        const bytes = response.data
        return new Blob([bytes], {type:'application/pdf'})
    }

    return {
        realizarVenda,
        gerarRelatorioVendas
    }
}