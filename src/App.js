import { BrowserRouter, Routes as BrowserRoutes, Route } from 'react-router-dom'
import Main from './pages/Main'
import Routes from './pages/Routes'
import AddRoute from './pages/AddRoute'
import Contacts from './pages/Contacts'

import Header from './components/Header'
import Footer from './components/Footer'

import styles from './App.module.scss'

function App() {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Header />

        <BrowserRoutes>
          <Route path="/pigeon" element={<Main />} />
          <Route path="/pigeon/routes" element={<Routes />} />
          <Route path="/pigeon/add_route" element={<AddRoute />} />
          <Route path="/pigeon/contacts" element={<Contacts />} />
        </BrowserRoutes>

        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
