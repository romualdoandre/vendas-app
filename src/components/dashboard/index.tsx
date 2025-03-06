import { Card } from 'primereact/card'

interface DashboardProps {
    clientes?: number;
    vendas?: number;
    produtos?: number;
}

export const Dashboard: React.FC<DashboardProps> = ({ clientes, vendas, produtos }) => {

    const produtoCardStyle={
        background:'red',
        color: 'white'

    }
    const vendaCardStyle={
        background:'blue',
        color: 'white'
    }
    const clienteCardStyle={
        background:'green',
        color: 'white'
    }

    return (
        <div className="p-fluid">
            <div className="p-grid">
                <div className="p-col">
                    <Card title='Produtos' style={produtoCardStyle}>
                        <p className='p-m-0'>
                            {produtos}
                        </p>
                    </Card>
                </div>
                <div className="p-col">
                    <Card title='Clientes' style={clienteCardStyle}>
                        <p className='p-m-0'>
                            {clientes}
                        </p>
                    </Card>
                </div>
                <div className="p-col">
                    <Card title='Vendas' style={vendaCardStyle}>
                        <p className='p-m-0'>
                            {vendas}
                        </p>
                    </Card>
                </div>
            </div>
        </div>
    )
}