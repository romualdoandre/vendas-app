import { Produto } from "app/models/produtos"

interface TabelaProdutosProps {
    produtos: Array<Produto>;
    onEdit: (produto: Produto) => void;
    onDelete: (produto: Produto) => void;
}

export const TabelaProdutos: React.FC<TabelaProdutosProps> = ({produtos, onEdit, onDelete}) =>{
    return (<table className="table is-striped is-hoverable">
        <thead>
            <tr>
                <th>Código</th>
                <th>SKU</th>
                <th>Nome</th>
                <th>Preço</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {
                produtos.map(produto => <ProdutoRow key={produto.id} produto={produto} onEdit={onEdit} onDelete={onDelete}></ProdutoRow>)
            }
        </tbody>
    </table>)
}

interface ProdutoRowProps {
    produto: Produto;
    onEdit: (produto: Produto) => void;
    onDelete: (produto: Produto) => void;
}

const ProdutoRow: React.FC<ProdutoRowProps> = ({produto, onEdit, onDelete}) => {
    return (<tr>
        <td>{produto.id}</td>
        <td>{produto.sku}</td>
        <td>{produto.nome}</td>
        <td>{produto.preco}</td>
        <td>
            <button className="button is-success is-rounded is-small" onClick={(evt) => onEdit(produto)}>Editar</button>
            <button className="button is-danger is-rounded is-small" onClick={(evt) => onDelete(produto)}>Apagar</button>
        </td>
    </tr>)
}