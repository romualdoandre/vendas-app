import { Layout } from 'components'
import { useState } from 'react'
import { Input } from 'components'
import { useProdutoService } from 'app/services'
import { Produto } from 'app/models/produtos'
import { converterEmBigDecimal } from 'app/util/money'

export const CadastroProdutos: React.FC = () => {

    const [sku, setSku] = useState('')
    const [preco, setPreco] = useState('')
    const [nome, setNome] = useState('')
    const [descricao, setDescricao] = useState('')
    const [id, setId] = useState('')
    const [cadastro, setCadastro] = useState('')
    const service = useProdutoService()

    const submit = () => {
        const produto: Produto = {
            id,
            sku,
            preco: converterEmBigDecimal(preco),
            nome,
            descricao
        }
        if(id){
            service.atualizar(produto).then(response =>{
                console.log("atualizado")
            })
        }
        else{
            service.salvar(produto).then((produtoResposta)=>{
                setId(produtoResposta.id)
                setCadastro(produtoResposta.cadastro)    
            }
            )
        }
    }

    return (
        <Layout titulo='Produtos'>
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
                <Input label='SKU: *' value={sku} onChange={setSku} id='inputSku' columnClasses='is-half' placeholder='Digite o SKU do produto'></Input>
                <Input label='Preço: *' value={preco} onChange={setPreco} id='inputPreco' columnClasses='is-half' placeholder='Digite o preço do produto' currency maxLength={16}></Input>
            </div>
            <div className='columns'>
                <Input label='Nome: *' value={nome} onChange={setNome} id='inputNome' placeholder='Digite o nome do produto'></Input>
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
                    </div>

                </div>
            </div>
            <div className='columns'>
                <div className='field is-grouped column'>
                    <div className='control'>
                        <button className='button is-link' onClick={submit}>{ id ? 'Atualizar': 'Salvar'}</button>
                    </div>
                    <div className='control'>
                        <button className='button is-link is-light'>Cancelar</button>
                    </div>
                </div>
            </div>
        </Layout>
    )
}