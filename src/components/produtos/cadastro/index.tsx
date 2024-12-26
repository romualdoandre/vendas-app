import { Layout } from 'components'
import { useState } from 'react'
import { Input } from 'components'

export const CadastroProdutos: React.FC = () => {

    const [sku, setSku] = useState('')
    const [preco, setPreco] = useState('')
    const [nome, setNome] = useState('')
    const [descricao, setDescricao] = useState('')

    const submit = () => {
        const produto = {
            sku,
            preco,
            nome,
            descricao
        }
        console.log(produto)
    }

    return (
        <Layout titulo='Produtos'>
            <div className='columns'>
                <Input label='SKU: *' value={sku} onChange={setSku} id='inputSku' columnClasses='is-half' placeholder='Digite o SKU do produto'></Input>
                <Input label='Preço: *' value={preco} onChange={setPreco} id='inputPreco' columnClasses='is-half' placeholder='Digite o preço do produto'></Input>
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
                        <button className='button is-link' onClick={submit}>Salvar</button>
                    </div>
                    <div className='control'>
                        <button className='button is-link is-light'>Cancelar</button>
                    </div>
                </div>
            </div>
        </Layout>
    )
}