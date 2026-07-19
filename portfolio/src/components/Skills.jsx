const skills = [
  { name: 'React / Next.js', cat: 'FRONTEND' },
  { name: 'Three.js / R3F', cat: '3D · WEBGL' },
  { name: 'GSAP / Framer Motion', cat: 'MOTION' },
  { name: 'TypeScript', cat: 'LANGUAGE' },
  { name: 'GLSL Shaders', cat: '3D · WEBGL' },
  { name: 'Blender', cat: '3D · MODELING' },
  { name: 'Node.js', cat: 'BACKEND' },
  { name: 'Figma', cat: 'DESIGN' },
]

export default function Skills() {
  return (
    <section className="section" id="skills">
      <div className="reveal">
        <div className="section-label">03 · Stack</div>
        <h2 className="section-title">
          The <span className="gradient-text">toolkit</span>.
        </h2>
      </div>
      <div className="skills-list">
        {skills.map((s) => (
          <div key={s.name} className="skill-item reveal">
            <div className="skill-name">{s.name}</div>
            <div className="skill-cat">{s.cat}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
