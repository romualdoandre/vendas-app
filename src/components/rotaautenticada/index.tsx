import { signIn, useSession} from 'next-auth/client'

interface RotaAutenticadaProps{
    children: React.ReactNode
}

export const RotaAutenticada: React.FC<RotaAutenticadaProps> = ({children}) =>{

    const [session, loading] = useSession()
    if(!session){
        return (<div>
            <button onClick={()=>signIn()}>Você não está logado, clique aqui para logar.</button>
        </div>)
    }
    return (<div>{children}</div>)
} 