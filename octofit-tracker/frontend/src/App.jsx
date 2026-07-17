import React from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import Users from './components/Users.jsx'
import Teams from './components/Teams.jsx'
import Activities from './components/Activities.jsx'
import Workouts from './components/Workouts.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import './App.css'

function Nav() {
  return (
    <nav className="nav">
      <NavLink to="/" end>Home</NavLink>
      <NavLink to="/users">Users</NavLink>
      <NavLink to="/teams">Teams</NavLink>
      <NavLink to="/activities">Activities</NavLink>
      <NavLink to="/workouts">Workouts</NavLink>
      <NavLink to="/leaderboard">Leaderboard</NavLink>
    </nav>
  )
}

export default function App() {
  return (
    <div className="app-root">
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<div>Welcome to OctoFit Tracker</div>} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </main>
    </div>
  )
}
