export default function Loader({ done, progress }) {
  return (
    <div className={`loader ${done ? 'done' : ''}`}>
      <div className="loader-inner">
        <div className="loader-title">INITIALIZING</div>
        <div className="loader-bar">
          <div className="loader-bar-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="loader-pct">{String(Math.floor(progress)).padStart(3, '0')} / 100</div>
      </div>
    </div>
  )
}
