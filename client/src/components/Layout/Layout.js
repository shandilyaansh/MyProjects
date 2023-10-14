import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Helmet } from "react-helmet"



const Layout = ({ children, title, description, keywords, author }) => {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="author" content={author} />
                <title>{title}</title>
                <script src="https://kit.fontawesome.com/ba64c4f071.js" crossorigin="anonymous"></script>
            </Helmet>
            <Header />
            <main style={{ minHeight: "80vh" }}>
                {children}
            </main>
            <Footer />
        </div >
    )
}
Layout.defaultProps = {
    title: 'E-Commerce App',
    description: 'Mern Stack project',
    author: 'Anshu Kumar',
    keywords: 'Welcome'
}

export default Layout