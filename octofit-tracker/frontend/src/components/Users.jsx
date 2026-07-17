import React, { useEffect, useState } from 'react'

const getApiBase = () => {
  const name = import.meta.env.VITE_CODESPACE_NAME
  return name ? `https://${name}-8000.app.github.dev/api` : 'http://localhost:8000/api'
}

function normalize(responseBody, key) {
  if (Array.isArray(responseBody)) return responseBody
  if (responseBody && Array.isArray(responseBody[key])) return responseBody[key]
  // fallback: find first array
  for (const v of Object.values(responseBody || {})) {
    if (Array.isArray(v)) return v
  }
  return []
}

export default function Users() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const api = getApiBase()
    fetch(`${api}/users`)
      .then((r) => r.json())
      .then((body) => setUsers(normalize(body, 'users')))
      .catch(() => setUsers([]))
  }, [])

  return (
    <section>
      <h2>Users</h2>
      <ul>
        {users.map((u) => (
          <li key={u._id}>{u.name} — {u.email}</li>
        ))}
      </ul>
      {!users.length && <p>No users yet.</p>}
    </section>
  )
}
