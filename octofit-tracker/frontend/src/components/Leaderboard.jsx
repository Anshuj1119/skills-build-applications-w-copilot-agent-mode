import React, { useEffect, useState } from 'react'

const getApiBase = (path) => {
  const name = import.meta.env.VITE_CODESPACE_NAME
  const routes = {
    activities: '/api/activities/',
    leaderboard: '/api/leaderboard/',
    teams: '/api/teams/',
    users: '/api/users/',
    workouts: '/api/workouts/',
  }
  const route = routes[path]
  return route ? (name ? `https://${name}-8000.app.github.dev${route}` : `http://localhost:8000${route}`) : ''
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
    const api = getApiBase('leaderboard')
    fetch(api)
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
