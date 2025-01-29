import { Cliente } from "app/models/clientes";
import { Layout } from "components"
import { Input, InputCPF } from "components"
import { useFormik } from "formik"
import { DataTable  } from 'primereact/datatable'
import { Column } from "primereact/column";
import { useState } from "react";

interface ConsultaClientesForm{
    nome?: string;
    cpf?: string;
}

export const ListagemClientes: React.FC = () => {
    const handleSubmit = (filtro: ConsultaClientesForm) =>{
        console.log(filtro)
    }
    const formik = useFormik<ConsultaClientesForm>({
        onSubmit: handleSubmit,
        initialValues: {nome:'', cpf: ''}
    })

    const [clientes, setClientes] = useState<Cliente[]>([{id:'1',nome:'fulano',cpf:'1234567890',email:'email@email.com'}])

    return (
        <Layout titulo="Clientes">
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
                        <DataTable value={clientes}>
                            <Column field="id" header="Código"/>
                            <Column field="nome" header="Nome"/>
                            <Column field="cpf" header="CPF"/>
                            <Column field="email" header="Email"/>
                        </DataTable>
                    </div>
                </div>
            </form>
        </Layout>
    )
}