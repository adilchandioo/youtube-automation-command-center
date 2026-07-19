import { useEffect } from 'react'

const projects = [
  {
    n: '01',
    title: 'Project One',
    desc: 'A brief, punchy description of what makes this project special and the problem it solves.',
    tags: ['React', 'Three.js', 'GSAP'],
  },
  {
    n: '02',
    title: 'Project Two',
    desc: 'Talk about the impact — metrics, users, revenue, or the creative breakthrough.',
    tags: ['Next.js', 'WebGL', 'Framer'],
  },
  {
    n: '03',
    title: 'Project Three',
    desc: 'Highlight your role, the stack, and one thing that surprised you along the way.',
    tags: ['TypeScript', 'R3F', 'Shader'],
  },
  {
    n: '04',
    title: 'Project Four',
    desc: 'A short teaser that makes the reader want to click through and see more.',
    tags: ['Node', 'AI', 'Automation'],
  },
]

export default function Projects() {
  useEffect(() => {
    const cards = document.querySelectorAll('.project-card')
    const onMove = (e) => {
      const r = e.currentTarget.getBoundingClientRect()
      e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
      e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
    }
    cards.forEach((c) => c.addEventListener('mousemove', onMove))
    return () => cards.forEach((c) => c.removeEventListener('mousemove', onMove))
  }, [])

  return (
    <section className="section" id="projects">
      <div className="reveal">
        <div className="section-label">02 · Selected Work</div>
        <h2 className="section-title">
          Recent <span className="gradient-text">projects</span>.
        </h2>
      </div>
      <div className="projects-grid">
        {projects.map((p) => (
          <a key={p.n} href="#" className="project-card reveal">
            <div className="project-num">{p.n} / {String(projects.length).padStart(2, '0')}</div>
            <div className="project-title">{p.title}</div>
            <p className="project-desc">{p.desc}</p>
            <div className="project-tags">
              {p.tags.map((t) => (
                <span key={t} className="project-tag">{t}</span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
