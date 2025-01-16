import { Layout } from 'components'
import { useState, useEffect } from 'react'
import { Input } from 'components'
import { useProdutoService } from 'app/services'
import { Produto } from 'app/models/produtos'
import { converterEmBigDecimal } from 'app/util/money'
import { Alert } from 'components/common/message'
import { useRouter } from 'next/router'
import * as yup from 'yup'
import Link from 'next/link'

const msgCampoObrigatorio ="Campo Obrigatório";

const validationSchema = yup.object().shape({
    sku: yup.string().trim().required(msgCampoObrigatorio),
    nome: yup.string().trim().required(msgCampoObrigatorio),
    descricao: yup.string().trim()
                    .required(msgCampoObrigatorio),
    preco: yup.number().required(msgCampoObrigatorio).moreThan(0, "Valor deve ser maior que 0,00 (Zero)")
})

interface FormErros {
    sku?: string;
    nome?: string;
    preco?: string;
    descricao?: string;
}

export const CadastroProdutos: React.FC = () => {

    const [sku, setSku] = useState('')
    const [preco, setPreco] = useState('')
    const [nome, setNome] = useState('')
    const [descricao, setDescricao] = useState('')
    const [id, setId] = useState('')
    const [cadastro, setCadastro] = useState('')
    const service = useProdutoService()
    const [ messages, setMessages ] = useState<Array<Alert>>([])
    const router = useRouter();
    const [ errors, setErrors ] = useState<FormErros>({})
    const { id: queryId  } = router.query;
    /*useEffect( () => {        
        if(queryId){
            service.carregarProduto(queryId).then(produtoEncontrado => {
                setId(produtoEncontrado.id)
                setSku(produtoEncontrado.sku)
                setNome(produtoEncontrado.nome)
                setDescricao(produtoEncontrado.descricao)
                setPreco( formatReal(`${produtoEncontrado.preco}`))
                setCadastro(produtoEncontrado.cadastro || '')
            })
        } 
    } , [ queryId ] )*/

    const submit = () => {
        const produto: Produto = {
            id,
            sku,
            preco: converterEmBigDecimal(preco),
            nome,
            descricao
        }
        validationSchema.validate(produto).then(obj => {
            setErrors({})

            if(id){
                service
                    .atualizar(produto)
                    .then(response => {
                        setMessages([{
                            tipo: "success", texto: "Produto atualizado com sucesso!"
                        }])
                    })
            }else{
                
                service
                    .salvar(produto)
                    .then(produtoResposta => {
                        setId(produtoResposta.id)
                        setCadastro(produtoResposta.cadastro)
                        setMessages([{
                            tipo: "success", texto: "Produto Salvo com sucesso!"
                        }])
                    })
            }

        }).catch(err => {
            const field = err.path;
            const message = err.message;
            setErrors({
                [field]: message
            })
        })
    }

    return (
        <Layout titulo='Produtos' mensagens={messages}>
            {id &&
                <div className="columns">
                    <Input label="Código:" 
                        columnClasses="is-half" 
                        value={id}
                        id="inputId"
                        disabled={true}
                        />

                    <Input label="Data Cadastro:" 
                        columnClasses="is-half" 
                        value={cadastro}
                        id="inputDataCadastro"
                        disabled
                        />
                </div>
            }
            <div className='columns'>
                <Input label='SKU: *' value={sku} onChange={setSku} id='inputSku' columnClasses='is-half' placeholder='Digite o SKU do produto' error={errors.sku}></Input>
                <Input label='Preço: *' value={preco} onChange={setPreco} id='inputPreco' columnClasses='is-half' placeholder='Digite o preço do produto' currency maxLength={16} error={errors.preco}></Input>
            </div>
            <div className='columns'>
                <Input label='Nome: *' value={nome} onChange={setNome} id='inputNome' placeholder='Digite o nome do produto' error={errors.nome}></Input>
            </div>
            <div className='columns'>
                <div className='field column'>
                    <label className='label' htmlFor='inputDescricao'>Descrição: *</label>
                    <div className='control'>
                        <textarea className='textarea'
                            id='inputDescricao'
                            placeholder='Digite a descrição do produto'
                            value={descricao}
                            onChange={evt => setDescricao(evt.target.value)}>
                        </textarea>
                        {errors.descricao &&
                        <p className="help is-danger">{errors.descricao}</p>
                        }       
                    </div>

                </div>
            </div>
            <div className='columns'>
                <div className='field is-grouped column'>
                    <div className='control'>
                        <button className='button is-link' onClick={submit}>{ id ? 'Atualizar': 'Salvar'}</button>
                    </div>
                    <div className='control'>
                        <Link href="/consultas/produtos">
                        <button className='button is-link is-light'>Voltar</button>
                        </Link>
                    </div>
                </div>
            </div>
        </Layout>
    )
}