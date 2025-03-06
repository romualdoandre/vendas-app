export interface DashboardData{
    clientes?: number;
    vendas?: number;
    produtos?: number;
    vendasPorMes?: VendaPorMes[];
}

export interface VendaPorMes{
    mes?: number;
    valor?: number;
}