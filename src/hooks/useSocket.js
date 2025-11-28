import { useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'

const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://177.71.225.166:4000'

export function useSocket() {
  const socketRef = useRef(null)
  const [connected, setConnected] = useState(false)
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const s = io(SERVER_URL, { transports: ['websocket'] })
    socketRef.current = s

    s.on('connect', () => setConnected(true))
    s.on('disconnect', () => setConnected(false))
    s.on('history', msgs => setMessages(msgs || []))
    s.on('new_message', msg => setMessages(prev => [...prev, msg]))
    s.on('connect_error', err => console.error('socket error', err))

    return () => s.disconnect()
  }, [])

  function sendMessage(roomId, text) {
    socketRef.current?.emit('send_message', { roomId, text })
  }

  function joinRoom(roomId, nickname) {
    socketRef.current?.emit('join_room', { roomId, nickname })
  }

  return { connected, messages, sendMessage, joinRoom }
}
