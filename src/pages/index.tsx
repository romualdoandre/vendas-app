import Head from 'next/head'
import { Layout, Dashboard } from 'components'
import { useDashboardService } from 'app/services'
import { DashboardData } from 'app/models/dashboard'

interface HomeProps{
    dashboard: DashboardData
}

const Home: React.FC<HomeProps> = (props: HomeProps) => {
    return (<div>
        <Head>
            <title>Vendas App</title>
            <link rel="icon" href='/favicon.ico' />
        </Head>
        <Layout titulo='Dashboard'>
            <Dashboard clientes={props.dashboard.clientes}
             vendas={props.dashboard.vendas}
             produtos={props.dashboard.produtos}
             vendasPorMes={props.dashboard.vendasPorMes}/>
        </Layout>
    </div>)
}

export async function getStaticProps(context: any) {
    const service = useDashboardService()
    const dashboard: DashboardData= await service.get() 
    return {
        props: {
            dashboard
        },
        revalidate: 60
    }
}

export default Home;