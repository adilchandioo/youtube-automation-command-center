import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return

    let x = window.innerWidth / 2, y = window.innerHeight / 2
    let rx = x, ry = y

    const move = (e) => {
      x = e.clientX; y = e.clientY
      if (dot.current) {
        dot.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`
      }
    }
    const loop = () => {
      rx += (x - rx) * 0.18
      ry += (y - ry) * 0.18
      if (ring.current) {
        ring.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`
      }
      requestAnimationFrame(loop)
    }
    window.addEventListener('mousemove', move)
    const raf = requestAnimationFrame(loop)

    const hoverables = document.querySelectorAll('a, button, .project-card, .skill-item')
    const on = () => { dot.current?.classList.add('hover'); ring.current?.classList.add('hover') }
    const off = () => { dot.current?.classList.remove('hover'); ring.current?.classList.remove('hover') }
    hoverables.forEach((el) => {
      el.addEventListener('mouseenter', on)
      el.addEventListener('mouseleave', off)
    })

    return () => {
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(raf)
      hoverables.forEach((el) => {
        el.removeEventListener('mouseenter', on)
        el.removeEventListener('mouseleave', off)
      })
    }
  }, [])

  return (
    <>
      <div ref={dot} className="cursor" />
      <div ref={ring} className="cursor-ring" />
    </>
  )
}
