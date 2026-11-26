import { useState } from 'react'
import './verification.css'

export function VerificationGraphic() {
  const [paused, setPaused] = useState(false)

  return (
    <figure className="verification" data-paused={paused}>
      <div className="verification-flow" aria-hidden="true">
        <div className="verification-node">
          <span className="verification-icon">✦</span>
          <span>AI output</span>
        </div>
        <div className="verification-track" />
        <div className="verification-center">
          <div className="verification-orbit" />
          <div className="verification-core">✓</div>
        </div>
        <div className="verification-track verification-track-reverse" />
        <div className="verification-node">
          <span className="verification-icon">▤</span>
          <span>Source</span>
        </div>
      </div>
      <figcaption className="verification-caption">
        <span><span className="verification-dot" aria-hidden="true" />Evidence-backed verification</span>
        <button type="button" onClick={() => setPaused((value) => !value)}>
          {paused ? 'Play animation' : 'Pause animation'}
        </button>
      </figcaption>
    </figure>
  )
}
