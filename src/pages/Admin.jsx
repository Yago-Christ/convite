import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { db, collection, getDocs, updateDoc, deleteDoc, doc, query, orderBy, onSnapshot } from '../firebase'

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

    if (checkAuth()) {
      const q = query(collection(db, 'pagamentos'), orderBy('timestamp', 'desc'))
      
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const paymentsData = []
        querySnapshot.forEach((doc) => {
          paymentsData.push({ id: doc.id, ...doc.data() })
        })
        setPayments(paymentsData)
      })

      return () => unsubscribe()
    }
  }, [navigate])

  const confirmPayment = async (paymentId) => {
    try {
      const paymentRef = doc(db, 'pagamentos', paymentId)
      await updateDoc(paymentRef, { status: 'confirmado' })
    } catch (error) {
      console.error('Erro ao confirmar pagamento:', error)
      alert('Erro ao confirmar pagamento. Tente novamente.')
    }
  }

  const removePayment = async (paymentId) => {
    if (window.confirm('Tem certeza que deseja remover este pagamento?')) {
      try {
        await deleteDoc(doc(db, 'pagamentos', paymentId))
      } catch (error) {
        console.error('Erro ao remover pagamento:', error)
        alert('Erro ao remover pagamento. Tente novamente.')
      }
    }
  }

  const clearAllPayments = async () => {
    if (window.confirm('Tem certeza que deseja limpar TODOS os registros? Esta ação não pode ser desfeita.')) {
      try {
        const querySnapshot = await getDocs(collection(db, 'pagamentos'))
        const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref))
        await Promise.all(deletePromises)
      } catch (error) {
        console.error('Erro ao limpar pagamentos:', error)
        alert('Erro ao limpar pagamentos. Tente novamente.')
      }
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
            {payments.map((payment) => (
              <div key={payment.id} className="payment-item">
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
                      onClick={() => confirmPayment(payment.id)}
                      style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                    >
                      Confirmar
                    </button>
                  )}
                  <button 
                    className="btn btn-danger" 
                    onClick={() => removePayment(payment.id)}
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
