import { Cliente } from "app/models/clientes"
import { Page } from "app/models/common/page"
import { ItemVenda, Venda } from "app/models/vendas"
import { useClienteService, useProdutoService } from "app/services"
import { useFormik } from "formik"
import { AutoComplete, AutoCompleteChangeEvent, AutoCompleteCompleteEvent } from "primereact/autocomplete"
import { useState } from "react"
import { InputText } from "primereact/inputtext"
import { Produto } from "app/models/produtos"
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"

interface VendasFormProps {
    onSubmit: (venda: Venda) => void;
}

const formSchema: Venda = {
    cliente: null,
    itens: [],
    total: 0,
    formaPagamento: ''
}

export const VendasForm: React.FC<VendasFormProps> = ({ onSubmit }) => {

    const clienteService = useClienteService()
    const produtoService = useProdutoService()

    const [codigoProduto, setCodigoProduto] = useState('')
    const [produto, setProduto] = useState<Produto>()
    const [mensagem, setMensagem] =  useState('')
    const [quantidadeProduto, setQuantidadeProduto] = useState<number>(0)

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
        if(clienteSelecionado){
            formik.setFieldValue("cliente",clienteSelecionado)
        }
    }

    const handleCodigoProdutoSelect = (e) => {
        if(codigoProduto){
            produtoService.carregarProduto(e.target.value)
            .then(produtoEncontrado => setProduto(produtoEncontrado))
            .catch(error => {setMensagem('Produto não encontrado')})
        }
    }

    const handleAddProduto = (e) => {
        const itensAdicionados = formik.values.itens

        const jaExisteItemNaVenda = itensAdicionados.some((iv: ItemVenda)=>{
            return iv.produto.id === produto.id
        })

        if(jaExisteItemNaVenda){
            itensAdicionados?.forEach((iv: ItemVenda)=>{
                if(iv.produto.id === produto?.id){
                    iv.quantidade = iv.quantidade + quantidadeProduto
                }
            })
        }
        else {
            itensAdicionados?.push({produto, quantidade: quantidadeProduto})
        }
        setProduto(null)
        setCodigoProduto('')
        setQuantidadeProduto(0)
    }

    const dialogMensagemFooter = () => {
        return (
            <div>
                <Button label="OK" type="button" onClick={handleFecharDialogProdutoNaoEncontrado}/>
            </div>
        )
    }

    const handleFecharDialogProdutoNaoEncontrado = () => {
        setMensagem('')
        setCodigoProduto('')
        setProduto(null)
        setQuantidadeProduto(0)
    }

    const disableAddProdutoButton = () => {
        return !produto || !quantidadeProduto
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
                    value={produto} field="nome"/>
                </div>
                <div className="p-col-2">
                        <span className="p-float-label">
                            <InputText id="qtdProduto" 
                            value={quantidadeProduto?.toString()}
                            onChange={e=>setQuantidadeProduto(parseInt(e.target.value))}/>
                            <label htmlFor="qtdProduto">QTD</label>
                        </span>
                    </div>

                    <div className="p-col-2">
                        <Button type="button" 
                                onClick={handleAddProduto}
                                label="Adicionar"
                                disabled={disableAddProdutoButton()} 
                                />
                    </div>
                    <div className="p-col-12">
                        <DataTable value={formik.values.itens} emptyMessage="Nenhum produto adicionado.">
                            <Column header="Código" field="produto.id"></Column>
                            <Column header="SKU" field="produto.sku"></Column>
                            <Column header="Produto" field="produto.nome"></Column>
                            <Column header="Preço Unitário" field="produto.preco"></Column>
                            <Column header="Qtd" field="quantidade"></Column>
                            <Column header="Total" body={(iv: ItemVenda)=>{
                                return (<div>{iv.produto.preco * iv.quantidade}</div>)
                            }}></Column>
                        </DataTable>
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