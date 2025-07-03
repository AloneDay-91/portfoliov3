import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import './index.js'
import {ThemeProvider} from "./context/ThemeContext.tsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './context/AuthContext'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter basename="/">
            <ThemeProvider>
                <AuthProvider>
                    <App />
                </AuthProvider>
            </ThemeProvider>
        </BrowserRouter>
    </StrictMode>,
)