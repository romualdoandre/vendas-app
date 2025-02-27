import { Layout } from "components";
import { useFormik } from "formik";
import { AutoComplete, AutoCompleteChangeEvent, AutoCompleteCompleteEvent } from "primereact/autocomplete"
import { Page } from "app/models/common/page";
import { Cliente } from "app/models/clientes";
import { useState } from "react";
import { useClienteService } from "app/services"
import { Button } from "primereact/button";
import { InputDate } from "components";

interface RelatorioVendasForm {
    cliente?: Cliente;
    dataInicio: string;
    dataFim: string;
}


export const RelatorioVendas: React.FC = () => {
    const clienteService = useClienteService()
    const [listaClientes, setListaClientes] = useState<Page<Cliente>>({
        content: [],
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
        if (clienteSelecionado) {
            formik.setFieldValue("cliente", clienteSelecionado)
        }
    }

    const handleSubmit = (formData: RelatorioVendasForm) => {
        console.log(formData)
    }
    const formik = useFormik<RelatorioVendasForm>({
        onSubmit: handleSubmit,
        initialValues: { cliente: null, dataFim: '', dataInicio: '' }
    })

    return (<Layout titulo="Relatório de Vendas">
        <form onSubmit={formik.handleSubmit}>
            <div className="p-fluid">
                <div className="p-grid">
                    <div className="p-col-12">
                        <div className="p-field">
                            <label htmlFor="cliente">Cliente: *</label>
                            <AutoComplete id="cliente"
                                name="cliente"
                                suggestions={listaClientes.content}
                                value={formik.values.cliente}
                                field="nome"
                                completeMethod={handleClienteAutocomplete}
                                onChange={handleClienteChange} />
                            <small className="p-error p-d-block">{formik.errors.cliente}</small>
                        </div>
                    </div>
                    <div className="p-col-6">
                        <InputDate id="dataInicio" label="Data Início"
                            name="dataInicio"
                            value={formik.values.dataInicio}
                            onChange={formik.handleChange} />
                    </div>
                    <div className="p-col-6">
                        <InputDate id="dataFim" label="Data Fim"
                            name="dataFim"
                            value={formik.values.dataFim}
                            onChange={formik.handleChange} />
                    </div>
                    <div className="p-col">
                        <Button label="Gerar Relatório" type="submit" />
                    </div>
                </div>
            </div>
        </form>
    </Layout>)
}
