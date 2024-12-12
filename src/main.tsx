import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import SavingInvestForm from './pages/SavingInvestment'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SavingInvestForm />
  </StrictMode>,
)
