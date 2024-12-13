import Head from 'next/head'

const Home: React.FC = () => {
    return (<div>
        <Head>
            <title>Vendas App</title>
            <link rel="icon" href='/favicon.ico'/>
        </Head>
        Bem vindo!
        <button className='button is-dark'>Button</button>
    </div>)
}

export default Home;