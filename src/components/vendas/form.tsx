import { Venda } from "app/models/vendas"
import { useFormik } from "formik"

interface VendasFormProps {
    onSubmit: (venda: Venda) => void;
}

const formSchema: Venda = {
    cliente: {},
    produtos: [],
    total: 0,
    formaPagamento: ''
}

export const VendasForm: React.FC<VendasFormProps> = ({onSubmit}) => {

    const formik = useFormik<Venda>({
        onSubmit,
        initialValues: formSchema
    })

    return (<form></form>)
}