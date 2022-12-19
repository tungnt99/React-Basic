import React, { useEffect, useState } from 'react'

export default function User() {
  const [title] = useState("Test Quiz")
  useEffect(() => {
    document.title = title
  }, [title])
  return (
    <div>User</div>
  )
}
