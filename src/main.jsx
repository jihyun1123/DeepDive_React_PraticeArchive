import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './components/ThemeContext.jsx'

createRoot(document.getElementById('root')).render(

  <StrictMode>
    {/* ThemeProvider로 App 컴포넌트를 감싸서 
        테마 상태와 토글 함수를 하위 컴포넌트에서 사용할 수 있도록 함 */}
    <BrowserRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
