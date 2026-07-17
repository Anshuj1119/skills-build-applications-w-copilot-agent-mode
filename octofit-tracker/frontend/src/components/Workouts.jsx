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

export default function Workouts() {
  const [workouts, setWorkouts] = useState([])

  useEffect(() => {
    const api = getApiBase()
    fetch(`${api}/workouts`)
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
