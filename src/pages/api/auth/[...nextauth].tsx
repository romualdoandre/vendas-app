import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { useUsuarioService } from 'app/services/usuario.service'

export default NextAuth({
    callbacks: {
        // Getting the JWT token from API response
        async jwt(token, user) {
            if (user) {
                token.accessToken = user.token
            }

            return token
        },

        async session(session, token) {
            session.accessToken = token.accessToken
            return session
        }
    }
    ,
    providers: [
        /*Providers.GitHub({
            clientId: 'Iv23li5GgrgXReRUpXUq',
            clientSecret: '556c0e6d07495bf8fccde5233a8da2a7ebddb35b'
        }),*/
        Providers.Credentials({
            credentials: {
                username: { label: "E-mail", type: "text", placeholder: "e-mail" },
                password: { label: "Senha", type: "password" }
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                try {
                    const user = await useUsuarioService().autenticar(credentials)
                    if (user) {
                        // Any object returned will be saved in `user` property of the JWT
                        return user
                    } else {
                        // If you return null then an error will be displayed advising the user to check their details.
                        return null

                        // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                    }
                }
                catch (e) {
                    console.log(e)
                    return null
                }

            }
        })
    ]
})