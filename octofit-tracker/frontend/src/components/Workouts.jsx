import React, { useEffect, useState } from 'react'

const getApiBase = (path) => {
  const name = import.meta.env.VITE_CODESPACE_NAME

  if (path === 'workouts') {
    return name
      ? `https://${name}-8000.app.github.dev/api/workouts`
      : 'http://localhost:8000/api/workouts'
  }

  return name
    ? `https://${name}-8000.app.github.dev/api/${path}`
    : `http://localhost:8000/api/${path}`
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
