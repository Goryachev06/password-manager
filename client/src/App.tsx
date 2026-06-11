import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { BasePage } from './pages/BasePage';
import { CheckPasswordPage } from './pages/CheckPasswordPage';

const App = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<BasePage />} />
        <Route path='/checkpasswords' element={<CheckPasswordPage />} />
      </Routes>
  </BrowserRouter>
  )
}

export default App