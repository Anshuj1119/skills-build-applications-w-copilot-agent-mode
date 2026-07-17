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

export default function Teams() {
  const [teams, setTeams] = useState([])

  useEffect(() => {
    const api = getApiBase()
    fetch(`${api}/teams`)
      .then((r) => r.json())
      .then((body) => setTeams(normalize(body, 'teams')))
      .catch(() => setTeams([]))
  }, [])

  return (
    <section>
      <h2>Teams</h2>
      <ul>
        {teams.map((t) => (
          <li key={t._id}>{t.name} — {t.description}</li>
        ))}
      </ul>
      {!teams.length && <p>No teams yet.</p>}
    </section>
  )
}
