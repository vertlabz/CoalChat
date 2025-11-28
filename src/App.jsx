import React, { useState, useEffect } from 'react'
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
  const [notice, setNotice] = useState('') // small user-facing notice

  // clear notices after a few seconds
  useEffect(() => {
    if (!notice) return
    const t = setTimeout(() => setNotice(''), 4000)
    return () => clearTimeout(t)
  }, [notice])

  async function handleCreateRoom(autoJoin = false) {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL || 'http://177.71.225.166:4000'}/rooms`, { method: 'POST' })
      const data = await res.json()
      setRoomId(data.roomId)
      setNotice(`Sala criada: ${data.roomId}`)
      if (autoJoin && nickname) {
        joinRoom(data.roomId, nickname)
        setNotice(`Entrou na sala ${data.roomId} como ${nickname}`)
      }
    } catch (err) {
      console.error(err)
      setNotice('Erro ao criar sala')
    }
  }

  function handleJoin() {
    if (!roomId || !nickname) {
      setNotice('Coloque Room ID e Nickname para entrar')
      return
    }
    joinRoom(roomId, nickname)
    setNotice(`Entrando na sala ${roomId} como ${nickname}`)
  }

  function handleSend() {
    if (!text.trim()) return
    sendMessage(roomId, text.trim())
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
            <button className="btn btn-ghost" onClick={() => handleCreateRoom(true)}>Criar e entrar</button>
            <button className="btn btn-ghost" onClick={() => handleCreateRoom(false)}>Criar apenas</button>
          </div>

          {notice && <div className="notice">{notice}</div>}

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
