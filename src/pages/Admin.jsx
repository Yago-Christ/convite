import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Admin = () => {
  const [payments, setPayments] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const checkAuth = () => {
      const session = localStorage.getItem('adminSession')
      if (!session) {
        navigate('/login')
        return false
      }
      return true
    }

    const loadPayments = () => {
      const storedPayments = JSON.parse(localStorage.getItem('pagamentos') || '[]')
      // Ordenar por timestamp (mais recentes primeiro)
      const sortedPayments = storedPayments.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0))
      setPayments(sortedPayments)
    }

    if (checkAuth()) {
      loadPayments()
      
      const interval = setInterval(loadPayments, 3000) // Reduzir para 3 segundos
      
      // Listener para mudanças em outras abas/janelas
      const handleStorageChange = (e) => {
        if (e.key === 'pagamentos') {
          loadPayments()
        }
      }
      
      window.addEventListener('storage', handleStorageChange)
      
      return () => {
        clearInterval(interval)
        window.removeEventListener('storage', handleStorageChange)
      }
    }
  }, [navigate])

  const confirmPayment = (index) => {
    const updatedPayments = [...payments]
    updatedPayments[index].status = 'confirmado'
    setPayments(updatedPayments)
    localStorage.setItem('pagamentos', JSON.stringify(updatedPayments))
    
    // Forçar evento storage para notificar outras abas/janelas
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'pagamentos',
      newValue: JSON.stringify(updatedPayments)
    }))
  }

  const removePayment = (index) => {
    if (window.confirm('Tem certeza que deseja remover este pagamento?')) {
      const updatedPayments = payments.filter((_, i) => i !== index)
      setPayments(updatedPayments)
      localStorage.setItem('pagamentos', JSON.stringify(updatedPayments))
      
      // Forçar evento storage para notificar outras abas/janelas
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'pagamentos',
        newValue: JSON.stringify(updatedPayments)
      }))
    }
  }

  const clearAllPayments = () => {
    if (window.confirm('Tem certeza que deseja limpar TODOS os registros? Esta ação não pode ser desfeita.')) {
      setPayments([])
      localStorage.setItem('pagamentos', JSON.stringify([]))
      
      // Forçar evento storage para notificar outras abas/janelas
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'pagamentos',
        newValue: JSON.stringify([])
      }))
    }
  }

  const logout = () => {
    localStorage.removeItem('adminSession')
    navigate('/login')
  }

  return (
    <div className="container">
      <div className="glass-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1 className="title" style={{ fontSize: '2rem', margin: 0 }}>
            Painel Admin
          </h1>
          <button className="btn btn-secondary" onClick={logout} style={{ background: 'linear-gradient(45deg, #2d2d2d, #1a1a1a)' }}>
            Sair
          </button>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ margin: 0 }}>
            Total de Pagamentos: {payments.length}
          </h3>
          <button 
            className="btn btn-danger" 
            onClick={clearAllPayments}
            disabled={payments.length === 0}
          >
            Limpar todos os registros
          </button>
        </div>

        {payments.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', opacity: 0.7 }}>
            <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
              Nenhum pagamento registrado ainda
            </p>
            <a href="/" style={{ color: '#667eea', textDecoration: 'none' }}>
              Ver site
            </a>
          </div>
        ) : (
          <div className="payment-list">
            {payments.map((payment, index) => (
              <div key={index} className="payment-item">
                <div className="payment-info">
                  <h4>{payment.name}</h4>
                  <p>📅 {payment.date}</p>
                  <p>🕐 {payment.time}</p>
                  <span className={`status-badge status-${payment.status}`}>
                    {payment.status}
                  </span>
                </div>
                <div className="payment-actions">
                  {payment.status === 'pendente' && (
                    <button 
                      className="btn btn-success" 
                      onClick={() => confirmPayment(index)}
                      style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                    >
                      Confirmar
                    </button>
                  )}
                  <button 
                    className="btn btn-danger" 
                    onClick={() => removePayment(index)}
                    style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        
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

export default Admin
