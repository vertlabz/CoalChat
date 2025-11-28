import React, { useEffect, useRef } from 'react'

function Avatar({ name }) {
  return <div className="avatar">{(name||'??').slice(0,2).toUpperCase()}</div>
}

export default function MessageList({ messages, nickname }) {
  const listRef = useRef(null)

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight
  }, [messages])

  return (
    <div className="messages-container" ref={listRef}>
      {messages.length === 0 && <div className="empty">Sem mensagens — entre em uma sala</div>}
      {messages.map(m => (
        <div key={m.id} className={`message-row ${m.nickname === nickname ? 'mine' : ''}`}>
          {m.nickname !== nickname && <Avatar name={m.nickname} />}
          <div className="message-body">
            <div className="meta">{m.nickname} <span className="time">• {new Date(m.createdAt).toLocaleTimeString()}</span></div>
            <div className="text">{m.text}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
