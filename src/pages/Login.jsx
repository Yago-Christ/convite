import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    
    if (password === 'admin123') {
      localStorage.setItem('adminSession', 'true')
      navigate('/admin')
    } else {
      setError('Senha incorreta')
      setTimeout(() => setError(''), 3000)
    }
  }

  return (
    <div className="container">
      <div className="glass-card" style={{ maxWidth: '400px', margin: '0 auto' }}>
        <h1 className="title" style={{ fontSize: '2rem', marginBottom: '2rem' }}>
          Acesso Admin
        </h1>
        
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', opacity: 0.9 }}>
              Senha
            </label>
            <input
              type="password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite a senha"
              required
            />
          </div>
          
          {error && (
            <div style={{ 
              background: 'rgba(245, 101, 101, 0.1)', 
              border: '1px solid rgba(245, 101, 101, 0.3)', 
              borderRadius: '12px', 
              padding: '0.75rem', 
              marginBottom: '1rem', 
              color: '#fc8181',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}
          
          <button type="submit" className="btn" style={{ width: '100%' }}>
            Entrar
          </button>
        </form>
        
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <a 
            href="/" 
            style={{ 
              color: 'rgba(255, 255, 255, 0.6)', 
              textDecoration: 'none',
              fontSize: '0.9rem'
            }}
          >
            ← Voltar para o site
          </a>
        </div>
      </div>
    </div>
  )
}

export default Login
