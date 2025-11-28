import React from 'react'

export default function Sidebar({ server }) {
  return (
    <div className="sidebar">
      <div className="panel">
        <h3>Informações</h3>
        <p className="mono">Servidor: <span className="muted">{server}</span></p>
        <p className="muted">Sem login • Mensagens em memória</p>
      </div>

      <div className="panel">
        <h3>Ações</h3>
        <button className="btn btn-ghost" onClick={() => navigator.clipboard?.writeText('')}>Copiar Room ID</button>
        <button className="btn btn-ghost" onClick={() => window.location.reload()}>Recarregar</button>
      </div>
    </div>
  )
}
