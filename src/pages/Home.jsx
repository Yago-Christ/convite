import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  const [name, setName] = useState('')
  const [showQR, setShowQR] = useState(false)
  const [paymentRegistered, setPaymentRegistered] = useState(false)

  const handlePayment = () => {
    if (!name.trim()) {
      alert('Por favor, digite seu nome completo')
      return
    }

    const now = new Date()
    const payment = {
      name: name.trim(),
      date: now.toLocaleDateString('pt-BR'),
      time: now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      status: 'pendente'
    }

    const existingPayments = JSON.parse(localStorage.getItem('pagamentos') || '[]')
    existingPayments.push(payment)
    localStorage.setItem('pagamentos', JSON.stringify(existingPayments))

    setShowQR(true)
    setPaymentRegistered(true)
  }

  const resetForm = () => {
    setName('')
    setShowQR(false)
    setPaymentRegistered(false)
  }

  return (
    <div className="container">
      <div className="glass-card">
        <h1 className="title">PROJETO X 1.0</h1>
        <p className="subtitle">Festa de 18 anos</p>
        
        <div className="event-info">
          <div className="event-item">
            <div className="event-icon">📍</div>
            <span>Local: Brooklyn</span>
          </div>
          <div className="event-item">
            <div className="event-icon">🍹</div>
            <span>Open bar drinks</span>
          </div>
          <div className="event-item">
            <div className="event-icon">🎵</div>
            <span>Music com DJ Maickel Eckert</span>
          </div>
          <div className="event-item">
            <div className="event-icon">🕰️</div>
            <span>Horário: 23:30 até de manhã</span>
          </div>
        </div>

        {!showQR ? (
          <div>
            <h3 style={{ marginBottom: '1rem', textAlign: 'center' }}>
              Garanta sua presença com Pix
            </h3>
            <input
              type="text"
              className="input-field"
              placeholder="Digite seu nome completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ marginBottom: '1rem' }}
            />
            <button className="btn" onClick={handlePayment} style={{ width: '100%', background: 'linear-gradient(45deg, #ff6b6b, #ee5a24)' }}>
              Pagar com Pix
            </button>
          </div>
        ) : (
          <div>
            <h3 style={{ marginBottom: '1rem', textAlign: 'center' }}>
              QR Code para Pagamento
            </h3>
            <div className="qr-code">
              <img src="/qr.png" alt="QR Code Pix" onError={(e) => {
                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OTk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5lY2Vzc8OhcmlvIGltYWdlbSBkbyBRUiBDb2RlPC90ZXh0Pgo8L3N2Zz4='
              }} />
            </div>
            {paymentRegistered && (
              <div className="success-message">
                Pagamento registrado. Após pagar o Pix aguarde confirmação.
              </div>
            )}
            <button 
              className="btn btn-secondary" 
              onClick={resetForm}
              style={{ width: '100%', marginTop: '1rem' }}
            >
              Fazer outro pagamento
            </button>
          </div>
        )}
      </div>

      <Link to="/login" className="admin-link">
        admin
      </Link>
    </div>
  )
}

export default Home
