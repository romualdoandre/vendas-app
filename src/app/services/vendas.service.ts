import { httpClient } from "app/http";
import { Venda, ItemVenda } from "app/models/vendas";
import { AxiosResponse } from "axios";

const resourceUrl = '/api/vendas'

export const useVendaService = () =>{

    const realizarVenda = async (venda: Venda): Promise<void> => {
        await httpClient.post<Venda>(resourceUrl, venda)
    }


    return {
        realizarVenda
    }
}