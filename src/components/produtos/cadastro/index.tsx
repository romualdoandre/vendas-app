import { Layout } from 'components'
import {useState} from 'react'

export const CadastroProdutos: React.FC = () => {

    const [sku, setSku] = useState('')
    const [preco, setPreco] = useState('')
    const [nome, setNome] = useState('')
    const [descricao, setDescricao] = useState('')

    const submit = () =>{
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
                <div className='column is-half'>
                    <div className='field'>
                        <label className='label' htmlFor='inputSku'>SKU: *</label>
                        <div className='control'>
                            <input className='input'
                                id='inputSku'
                                placeholder='Digite o SKU do produto'
                                value={sku}
                                onChange={evt=>setSku(evt.target.value)}>
                            </input>
                        </div>

                    </div>
                </div>
                <div className='column is-half'>
                    <div className='field'>
                        <label className='label' htmlFor='inputPreco'>Preço: *</label>
                        <div className='control'>
                            <input className='input'
                                id='inputPreco'
                                placeholder='Digite o preço do produto'
                                value={preco}
                                onChange={evt=>setPreco(evt.target.value)}>
                            </input>
                        </div>

                    </div>
                </div>
            </div>
            <div className='columns'>
                <div className='field column'>
                    <label className='label' htmlFor='inputNome'>Nome: *</label>
                    <div className='control'>
                        <input className='input'
                            id='inputNome'
                            placeholder='Digite o nome do produto'
                            value={nome}
                            onChange={evt=>setNome(evt.target.value)}>
                        </input>
                    </div>

                </div>
            </div>
            <div className='columns'>
                <div className='field column'>
                    <label className='label' htmlFor='inputDescricao'>Descrição: *</label>
                    <div className='control'>
                        <textarea className='textarea'
                            id='inputDescricao'
                            placeholder='Digite a descrição do produto'
                            value={descricao}
                            onChange={evt=>setDescricao(evt.target.value)}>
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