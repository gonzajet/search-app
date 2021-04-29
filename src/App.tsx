import React from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { ToastProvider } from 'react-toast-notifications'
import { ServiceContextProvider } from './services/context/ServiceContext'

import NewsContent from './components/News/NewsContent'

import './App.scss'

const App = () => {
  return (
    <>
      <ServiceContextProvider>
        <ToastProvider>
          <Navbar collapseOnSelect expand="lg" bg="dark">
            <Navbar.Brand className="text-white">React app search!</Navbar.Brand>
          </Navbar>
          <Container>
            <NewsContent />
          </Container>
        </ToastProvider>
      </ServiceContextProvider>
    </>
  )
}

export default App
