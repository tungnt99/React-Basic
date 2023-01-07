import React, { useState, useEffect } from 'react'

export default function DashBoard(props) {
  const [title] = useState('Dashboard');
  useEffect(() => {
    document.title = title;
  })
  return (
    <div>DashBoard</div>
  )
}