import React from 'react'

export default function Header({ connected }) {
  return (
    <header className="header">
      <div className="brand">
        <div className="logo">CC</div>
        <div>
          <h1 className="title">CoalChat</h1>
          <p className="subtitle">Conexões temporárias — mensagens desaparecem em 24h</p>
        </div>
      </div>

      <div className="status">
        <span className={connected ? 'status-pill online' : 'status-pill offline'}>
          {connected ? 'Conectado' : 'Desconectado'}
        </span>
      </div>
    </header>
  )
}
