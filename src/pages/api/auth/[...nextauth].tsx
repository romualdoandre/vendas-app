import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
    providers: [
        Providers.GitHub({
            clientId: 'Iv23li5GgrgXReRUpXUq',
            clientSecret: '556c0e6d07495bf8fccde5233a8da2a7ebddb35b'
        })
    ]
})