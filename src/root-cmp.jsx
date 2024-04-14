import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'

import './assets/style/main.scss'
import { AppHeader } from './cmps/AppHeader'
import { HomePage } from './pages/HomePage'
import { AboutUs } from './pages/About.jsx'
import { toyService } from './services/toy.service'
import { ToyIndex } from './pages/ToyIndex.jsx'
import { LoginPage } from './pages/LoginPage.jsx'
import { RegisterPage } from './pages/RegisterPage.jsx'
import { store } from './store/store'
import { ToysDetails } from './cmps/ToysDetails.jsx'

export function App() {

  return (
    <Provider store={store}>
      <Router>
        <section className="main-layout app">
          <AppHeader />
          <main>
            <Routes>
              <Route element={<HomePage />} path="/" />
              <Route element={<AboutUs />} path="/about" />
              <Route element={<ToyIndex />} path="/toy" />
              <Route element={<LoginPage />} path="/login" />
              <Route element={<RegisterPage />} path="/register" />
              <Route element={<ToysDetails />} path="/toy/:toyId" />
              {/* <Route element={<ToyEdit />} path="/toy/edit/:toyId" /> */}
              {/* <Route element={<ToyEdit />} path="/toy/edit/" /> יצירה של צעצוע חדש */}
              {/* <Route element={<DashboardIndex />} path="/dashboard" /> */}
            </Routes>
          </main>

          {/* <AppFooter /> */}
        </section>
      </Router>
    </Provider>
  )
}

