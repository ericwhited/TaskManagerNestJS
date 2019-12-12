import Head from 'next/head'
import Nav from '../components/nav'

const Layout = ({children}) => {
    return (
        <div>
            <Head>
                <title>Home</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Nav />
            {children}
        </div>
    )
}

export default Layout