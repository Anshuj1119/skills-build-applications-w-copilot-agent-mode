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

export default function Workouts() {
  const [workouts, setWorkouts] = useState([])

  useEffect(() => {
    const api = getApiBase('workouts')
    fetch(api)
      .then((r) => r.json())
      .then((body) => setWorkouts(normalize(body, 'workouts')))
      .catch(() => setWorkouts([]))
  }, [])

  return (
    <section>
      <h2>Workouts</h2>
      <ul>
        {workouts.map((w) => (
          <li key={w._id}>{w.title} — {w.difficulty} — {w.durationMinutes} mins</li>
        ))}
      </ul>
      {!workouts.length && <p>No workouts yet.</p>}
    </section>
  )
}
