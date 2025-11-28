import React, { useState } from 'react'

export default function Composer({ onSend }) {
  const [text, setText] = useState('')

  function submit() {
    if (!text.trim()) return
    onSend(text.trim())
    setText('')
  }

  return (
    <div className="composer">
      <input value={text} onChange={e => setText(e.target.value)} placeholder="Escreva sua mensagem..." className="input composer-input" onKeyDown={e => e.key === 'Enter' && submit()} />
      <button className="btn btn-primary" onClick={submit}>Enviar</button>
    </div>
  )
}
