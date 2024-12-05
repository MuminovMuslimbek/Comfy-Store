import React from 'react'
import Header from '../components/Header.jsx'

function MainLayout({ children }) {
    return (
        <div>
            <Header />
            {children}
        </div>
    )
}

export default MainLayout
