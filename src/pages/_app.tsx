import { AppProps } from "next/app";
import 'bulma/css/bulma.css'
import 'components/common/loader/loader.css'
import 'primereact/resources/primereact.min.css'
import 'primereact/resources/themes/md-light-indigo/theme.css'
import 'primeflex/primeflex.css'
import { Provider } from 'next-auth/client'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider session={pageProps.session}>
            <Component {...pageProps} />
        </Provider>
    )
}

export default MyApp;