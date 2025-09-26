import React from 'react'

export default function Button({ text, handleClick, disabled = false }) {
  const onClick = (e) => {
    e.preventDefault()
    if (disabled) return
    if (typeof handleClick === 'function') handleClick(e)
  }

  const base = "f5 no-underline bg-animate inline-flex items-center pa3 ba border-box mr4"
  const enabled = "black hover-bg-black hover-white pointer"
  const disabledCls = "black-40 o-50"

  return (
    <a
      href="#"
      role="button"
      aria-disabled={disabled}
      className={`${base} ${disabled ? disabledCls : enabled}`}
      onClick={onClick}
    >
      <span className="pl1">{text}</span>
    </a>
  )
}
