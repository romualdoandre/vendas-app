import { Layout } from 'components';
import Link from 'next/link';
import { TabelaProdutos } from './tabela';
import { Produto } from 'app/models/produtos';
import useSWR from 'swr'
import { httpClient, registrarToken } from 'app/http';
import { Axios, AxiosResponse } from 'axios';
import { useEffect } from 'react'
import { useState } from 'react'
import { Alert } from 'components/common/message'
import { useProdutoService } from 'app/services';
import { Loader } from 'components/common';
import Router from 'next/router'
import { ConfirmDialog } from 'primereact/confirmdialog';
import { useSession} from 'next-auth/client'

export const ListagemProdutos: React.FC = () => {
    const [session] = useSession()
    const token = session.accessToken
    const options = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    const { data: result, error } = useSWR<AxiosResponse<Produto[]>>
                    ('/api/produtos', url => httpClient.get(url,options) )

    const [ lista, setLista ] = useState<Produto[]>([])
    const [ messages, setMessages ] = useState<Array<Alert>>([])
    const service = useProdutoService()
    

    useEffect( () => {
        setLista(result?.data || [])
    }, [result])

    const editar = (produto: Produto) => {
        const url = `/cadastros/produtos?id=${produto.id}`
        Router.push(url)
    }

    const deletar = (produto: Produto) => {
        service.deletar(produto.id, options).then(response => {
            setMessages([
                {  tipo: "success", texto: "Produto excluido com sucesso!" }
            ])
            const listaAlterada: Produto[] = lista?.filter( p => p.id !== produto.id )
            setLista(listaAlterada)
        })
    }

    return (<Layout titulo='Produtos' mensagens={messages}>
        <ConfirmDialog/>
        <Link href="/cadastros/produtos">
            <button className='button is-warning'>Novo</button>
        </Link>
        <br/><Loader show={!result} />
        <TabelaProdutos produtos={lista} onEdit={editar} onDelete={deletar}></TabelaProdutos>
    </Layout>)
}