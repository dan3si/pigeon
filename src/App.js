import { BrowserRouter, Routes as BrowserRoutes, Route } from 'react-router-dom'
import Main from './pages/Main'
import Routes from './pages/Routes'
import AddRoute from './pages/AddRoute'

import Header from './components/Header'
import Footer from './components/Footer'

import styles from './App.module.scss'

function App() {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Header />

        <BrowserRoutes>
          <Route index element={<Main />} />
          <Route path="/routes" element={<Routes />} />
          <Route path="/add_route" element={<AddRoute />} />
        </BrowserRoutes>

        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
