import { Layout } from 'components';
import Link from 'next/link';
import { TabelaProdutos } from './tabela';
import { Produto } from 'app/models/produtos';
import useSWR from 'swr'
import { httpClient } from 'app/http';
import { Axios, AxiosResponse } from 'axios';
import { useEffect } from 'react'
import { useState } from 'react'
import { Alert } from 'components/common/message'
import { useProdutoService } from 'app/services';
import { Loader } from 'components/common';



export const ListagemProdutos: React.FC = () => {
    const { data: result, error } = useSWR<AxiosResponse<Produto[]>>
                    ('/api/produtos', url => httpClient.get(url) )

    const [ lista, setLista ] = useState<Produto[]>([])
    const service = useProdutoService()
    useEffect( () => {
        setLista(result?.data || [])
    }, [result])

    return (<Layout titulo='Produtos'>
        <Link href="/cadastros/produtos">
            <button className='button is-warning'>Novo</button>
        </Link>
        <br/><Loader show={!result} />
        <TabelaProdutos produtos={lista}></TabelaProdutos>
    </Layout>)
}