import React, { useEffect, useState } from 'react'

const getApiBase = () => {
  const name = import.meta.env.VITE_CODESPACE_NAME
  return name ? `https://${name}-8000.app.github.dev/api` : 'http://localhost:8000/api'
}

function normalize(responseBody, key) {
  if (Array.isArray(responseBody)) return responseBody
  if (responseBody && Array.isArray(responseBody[key])) return responseBody[key]
  for (const v of Object.values(responseBody || {})) {
    if (Array.isArray(v)) return v
  }
  return []
}

export default function Leaderboard() {
  const [entries, setEntries] = useState([])

  useEffect(() => {
    const api = getApiBase()
    fetch(`${api}/leaderboard`)
      .then((r) => r.json())
      .then((body) => setEntries(normalize(body, 'leaderboard')))
      .catch(() => setEntries([]))
  }, [])

  return (
    <section>
      <h2>Leaderboard</h2>
      <ol>
        {entries.map((e) => (
          <li key={e._id}>{e.rank}. {e.user?.name || 'Unknown'} — {e.score}</li>
        ))}
      </ol>
      {!entries.length && <p>No leaderboard entries yet.</p>}
    </section>
  )
}
