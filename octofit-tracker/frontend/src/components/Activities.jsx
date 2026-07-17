import React, { useEffect, useState } from 'react'

const getApiBase = (path) => {
  const name = import.meta.env.VITE_CODESPACE_NAME
  const route = `/api/${path}/`
  return name ? `https://${name}-8000.app.github.dev${route}` : `http://localhost:8000${route}`
}

function normalize(responseBody, key) {
  if (Array.isArray(responseBody)) return responseBody
  if (responseBody && Array.isArray(responseBody[key])) return responseBody[key]
  for (const v of Object.values(responseBody || {})) {
    if (Array.isArray(v)) return v
  }
  return []
}

export default function Activities() {
  const [activities, setActivities] = useState([])

  useEffect(() => {
    const api = getApiBase('activities')
    fetch(api)
      .then((r) => r.json())
      .then((body) => setActivities(normalize(body, 'activities')))
      .catch(() => setActivities([]))
  }, [])

  return (
    <section>
      <h2>Activities</h2>
      <ul>
        {activities.map((a) => (
          <li key={a._id}>{a.type} — {a.durationMinutes} mins — {a.caloriesBurned} kcal</li>
        ))}
      </ul>
      {!activities.length && <p>No activities yet.</p>}
    </section>
  )
}
