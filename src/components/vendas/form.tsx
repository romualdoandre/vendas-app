import { Cliente } from "app/models/clientes"
import { Page } from "app/models/common/page"
import { Venda } from "app/models/vendas"
import { useClienteService, useProdutoService } from "app/services"
import { useFormik } from "formik"
import { AutoComplete, AutoCompleteChangeEvent, AutoCompleteCompleteEvent } from "primereact/autocomplete"
import { useState } from "react"
import { InputText } from "primereact/inputtext"
import { Produto } from "app/models/produtos"
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'

interface VendasFormProps {
    onSubmit: (venda: Venda) => void;
}

const formSchema: Venda = {
    cliente: null,
    produtos: [],
    total: 0,
    formaPagamento: ''
}

export const VendasForm: React.FC<VendasFormProps> = ({ onSubmit }) => {

    const clienteService = useClienteService()
    const produtoService = useProdutoService()

    const [codigoProduto, setCodigoProduto] = useState('')
    const [produto, setProduto] = useState<Produto>()
    const [mensagem, setMensagem] =  useState('')

    const formik = useFormik<Venda>({
        onSubmit,
        initialValues: formSchema
    })

    const [listaClientes, setListaClientes] = useState<Page<Cliente>>({
        content:[],
        first: 0,
        number: 0,
        size: 0,
        totalElements: 0
    });

    const handleClienteAutocomplete = (e: AutoCompleteCompleteEvent) => {
        const nome = e.query
        clienteService.find(nome, '', 0, 20)
        .then(clientes => setListaClientes(clientes))
    }

    const handleClienteChange = (e: AutoCompleteChangeEvent) => {
        const clienteSelecionado = e.value
        formik.setFieldValue("cliente",clienteSelecionado)
        console.log(clienteSelecionado)
    }

    const handleCodigoProdutoSelect = (e) => {
        if(codigoProduto){
            produtoService.carregarProduto(e.target.value)
            .then(produtoEncontrado => setProduto(produtoEncontrado))
            .catch(error => {setMensagem('Produto não encontrado')})
        }
    }

    const handleAddProduto = (e) => {
        console.log(produto)
        const produtosAdicionados = formik.values.produtos
        produtosAdicionados?.push(produto)
        setProduto(null)
        setCodigoProduto('')
    }

    const dialogMensagemFooter = () => {
        return (
            <div>
                <Button label="OK" onClick={handleFecharDialogProdutoNaoEncontrado}/>
            </div>
        )
    }

    const handleFecharDialogProdutoNaoEncontrado = () => {
        setMensagem('')
        setCodigoProduto('')
        setProduto(null)
    }

    return (<form onSubmit={formik.handleSubmit}>
        <div className="p-fluid">
            <div className="p-field">
                <label htmlFor="cliente">Cliente: *</label>
                <AutoComplete id="cliente"
                 name="cliente"
                 suggestions={listaClientes.content}
                 onChange={handleClienteChange}
                 completeMethod={handleClienteAutocomplete}
                 value={formik.values.cliente}
                 field="nome"/>
            </div>
            <div className="p-grid">
                <div className="p-col-2">
                    <span className="p-float-label">
                        <InputText id="codigoProduto" name="codigoProduto"
                        onChange={e=>setCodigoProduto(e.target.value)}
                        onBlur={handleCodigoProdutoSelect}
                        value={codigoProduto}/>
                        <label htmlFor="codigoProduto">Código</label>
                    </span>
                </div>
                <div className="p-col-6">
                <AutoComplete 
                    value={produto} field="nome"                />
                </div>
                <div className="p-col-2">
                        <span className="p-float-label">
                            <InputText id="qtdProduto" 
                                       
                                       />
                            <label htmlFor="qtdProduto">QTD</label>
                        </span>
                    </div>

                    <div className="p-col-2">
                        <Button type="button" 
                                onClick={handleAddProduto}
                                label="Adicionar" 
                                />
                    </div>
            </div>
            <Button type="submit" label="Finalizar"/>
        </div>
        <Dialog position="top"
         header="Atenção"
          visible={!!mensagem}
           onHide={handleFecharDialogProdutoNaoEncontrado}
           footer={dialogMensagemFooter}>
        {mensagem}
        </Dialog>
    </form>)
}