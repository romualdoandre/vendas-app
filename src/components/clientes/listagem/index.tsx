import { Layout } from "components"
import { Input, InputCPF } from "components"
import { useFormik } from "formik"
import { Button  } from 'primereact/button'

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

    

    return (
        <Layout titulo="Clientes">
            <form onSubmit={formik.handleSubmit}>
                <Button label="teste"></Button>
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
            </form>
        </Layout>
    )
}