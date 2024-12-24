import {Layout} from 'components'

export const CadastroProdutos: React.FC = ()=>{
    return (
        <Layout titulo='Produtos'>
            <div className='field'>
                <label className='label' htmlFor='inputSku'>SKU: *</label>
                <div className='control'>
                    <input className='input'
                    id='inputSku'
                    placeholder='Digite o SKU do produto'>
                    </input>
                </div>

            </div>
            <div className='field'>
                <label className='label' htmlFor='inputPreco'>Preço: *</label>
                <div className='control'>
                    <input className='input'
                    id='inputPreco'
                    placeholder='Digite o preço do produto'>
                    </input>
                </div>

            </div>
            <div className='field'>
                <label className='label' htmlFor='inputNome'>Nome: *</label>
                <div className='control'>
                    <input className='input'
                    id='inputNome'
                    placeholder='Digite o nome do produto'>
                    </input>
                </div>

            </div>
            <div className='field'>
                <label className='label' htmlFor='inputDescricao'>Descrição: *</label>
                <div className='control'>
                    <textarea className='textarea'
                    id='inputDescricao'
                    placeholder='Digite a descrição do produto'>
                    </textarea>
                </div>

            </div>
            <div className='field is-grouped'>
                <div className='control'>
                    <button className='button is-link'>Salvar</button>
                </div>
                <div className='control'>
                    <button className='button is-link is-light'>Cancelar</button>
                </div>
            </div>
        </Layout>
    )
}