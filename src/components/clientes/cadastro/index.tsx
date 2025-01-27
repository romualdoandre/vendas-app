import { Layout } from "components"
import { ClienteForm } from "./form"
import { useState } from "react"
import { Cliente } from "app/models/clientes"
import { useClienteService } from "app/services"
import { Alert } from "components/common/message"

export const CadastroCliente: React.FC = () => {
    const [cliente, setCliente] = useState<Cliente>({})
    const service = useClienteService()
    const [ messages, setMessages ] = useState<Array<Alert>>([])

    const handleSubmit= (cliente: Cliente) => {
        console.log(cliente)
        if(cliente.id){
            service.atualizar(cliente).then(response=>{
                setMessages([{
                    tipo: "success", texto: "Cliente atualizado com sucesso!"
                }])  
            })
        }
        else{
            service.salvar(cliente).then(clienteSalvo=>{
                setCliente(clienteSalvo)
                setMessages([{
                    tipo: "success", texto: "Cliente salvo com sucesso!"
                }])  
            })
        }
    }

    return (<Layout titulo="Clientes">
        <ClienteForm cliente={cliente} onSubmit={handleSubmit}/>
    </Layout>)
}