import { Cliente } from "app/models/clientes"
import { Layout } from "components"
import { Input, InputCPF } from "components"
import { useFormik } from "formik"
import { DataTable, DataTablePageParams  } from 'primereact/datatable'
import { Column } from "primereact/column"
import { useState } from "react"
import { Page } from "app/models/common/page"
import { useClienteService } from "app/services"
import { Button } from 'primereact/button'
import Router from "next/router"
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog'

interface ConsultaClientesForm{
    nome?: string;
    cpf?: string;
}

export const ListagemClientes: React.FC = () => {
    const service = useClienteService()
    const handleSubmit = (filtro: ConsultaClientesForm) =>{
        handlePage(null)
    }
    const formik = useFormik<ConsultaClientesForm>({
        onSubmit: handleSubmit,
        initialValues: {nome:'', cpf: ''}
    })

    const [clientes, setClientes] = useState<Page<Cliente>>({content:[], first: 0, number: 0, size: 10, totalElements: 0})
    const [ loading, setLoading ] = useState<boolean>(false) 

    const handlePage = (event?: DataTablePageParams) => {
        service.find(formik.values.nome, formik.values.cpf, event?.page, event?.rows)
        .then(result => {
            setClientes({...result, first: event?.first })
        })
        .finally(()=>{setLoading(false)})
    }

    const deletar = (registro: Cliente) => {
        service.deletar(registro.id).then(()=>{
            console.log('Deletado com sucesso')
            handlePage(null)
        })
    }

    const actionTemplate = (registro: Cliente) => {
        const url = `/cadastros/clientes?id=${registro.id}`
        return (<div>
            <Button label="Editar" className="p-button-rounded p-button-info"
            onClick={e => Router.push(url)}/>
             <Button label="Deletar" onClick={() => {
                    confirmDialog({
                        message: "Confirma a exclusão deste registro?",
                        acceptLabel: "Sim",
                        rejectLabel: "Não",
                        accept: () => deletar(registro),
                        header: "Confirmação"
                    });
                }
            } className="p-button-rounded p-button-danger"/>
        </div>)
    }

    return (
        <Layout titulo="Clientes">
            <ConfirmDialog />
            <form onSubmit={formik.handleSubmit}>
                <div className="columns">
                    <Input label="Nome:" id="nome" name="nome"
                     value={formik.values.nome} columnClasses="is-half"
                     autoComplete="off" onChange={formik.handleChange}></Input>
                    <InputCPF label="CPF:" id="cpf" name="cpf"
                     value={formik.values.cpf} columnClasses="is-half"
                     onChange={formik.handleChange}></InputCPF>
                </div>
                <div className="field is-grouped">
                    <div className="control is-link">
                        <button type="submit" className="button is-success">
                            Consultar
                        </button>
                    </div>
                </div>
                <div className="columns">
                    <div className="is-full">
                        <DataTable value={clientes.content}
                            totalRecords={clientes.totalElements}
                            lazy={true} paginator={true}
                            first={clientes.first}
                            rows={clientes.size} onPage={handlePage}
                             loading={loading} emptyMessage="Nenhum registro">
                            <Column field="id" header="Código"/>
                            <Column field="nome" header="Nome"/>
                            <Column field="cpf" header="CPF"/>
                            <Column field="email" header="Email"/>
                            <Column body={actionTemplate}/>
                        </DataTable>
                    </div>
                </div>
            </form>
        </Layout>
    )
}