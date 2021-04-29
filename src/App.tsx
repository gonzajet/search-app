import React from 'react'
import { Container, Navbar } from 'react-bootstrap';
import { ToastProvider } from 'react-toast-notifications';
import { SeearchServiceContextProvider } from './services/context/SearchServiceContext';

import NewsContent from './components/News/NewsContent';

import './App.scss'

const App = () => {
  return (
    <>
      <SeearchServiceContextProvider>
        <ToastProvider>
          <Navbar collapseOnSelect expand="lg" bg="dark">
            <Navbar.Brand className="text-white">
              News search Page!
            </Navbar.Brand>
          </Navbar>
          <Container>
            <NewsContent />
          </Container>
        </ToastProvider>
      </SeearchServiceContextProvider>
    </>
  )
}

export default App
