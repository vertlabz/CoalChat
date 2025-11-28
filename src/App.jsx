import React, { useState } from 'react'
import Header from './components/Header.jsx'
import MessageList from './components/MessageList.jsx'
import Composer from './components/Composer.jsx'
import Sidebar from './components/Sidebar.jsx'
import { useSocket } from './hooks/useSocket.js'
import './styles/index.css'

export default function App() {
  const { connected, messages, sendMessage, joinRoom } = useSocket()
  const [roomId, setRoomId] = useState('')
  const [nickname, setNickname] = useState('')
  const [text, setText] = useState('')

  function handleJoin() {
    if (!roomId || !nickname) return alert('Preencha Room e Nickname')
    joinRoom(roomId, nickname)
  }

  function handleSend() {
    if (!text.trim()) return
    sendMessage(roomId, text)
    setText('')
  }

  return (
    <div className="premium-app">
      <div className="layout">
        <main className="main-panel">
          <Header connected={connected} />
          <div className="controls">
            <input value={roomId} onChange={e => setRoomId(e.target.value)} placeholder="Room ID" className="input" />
            <input value={nickname} onChange={e => setNickname(e.target.value)} placeholder="Nickname" className="input small" />
            <button className="btn btn-primary" onClick={handleJoin}>Entrar</button>
            <button className="btn btn-ghost" onClick={() => { fetch(`${import.meta.env.VITE_SERVER_URL || 'http://177.71.225.166:4000'}/rooms`, {method: 'POST'}).then(r => r.json()).then(d => setRoomId(d.roomId))}}>Criar sala</button>
          </div>

          <section className="chat-card">
            <MessageList messages={messages} nickname={nickname} />
          </section>

          <div className="composer-wrapper">
            <Composer onSend={text => { sendMessage(roomId, text); }} />
          </div>
        </main>

        <aside className="side-panel">
          <Sidebar server={import.meta.env.VITE_SERVER_URL || 'http://177.71.225.166:4000'} />
        </aside>
      </div>
    </div>
  )
}
