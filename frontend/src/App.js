import './App.css'
import { BrowserRouter, Routes as BrowserRoutes, Route, Link } from 'react-router-dom'
import Main from './pages/Main'
import Routes from './pages/Routes'
import AddRoute from './pages/AddRoute'

function App() {
  return (
    <BrowserRouter>
      <Link to='/'>На главную</Link>

      <BrowserRoutes>
        <Route index element={<Main />} />
        <Route path="/routes" element={<Routes />} />
        <Route path="/add_route" element={<AddRoute />} />
      </BrowserRoutes>
    </BrowserRouter>
  )
}

export default App
