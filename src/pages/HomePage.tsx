import { Link } from 'react-router-dom'
import { ActionLink } from '../components/ActionLink'
import { VerificationGraphic } from '../features/evaluation/VerificationGraphic'
import { GridBackground, hideGridLight, moveGridLight } from '../components/GridBackground'

const capabilities = [
  { symbol: '◫', title: 'Compare models', description: 'See how different models respond to the same task and weigh the trade-offs that matter to your team.' },
  { symbol: '◎', title: 'Evaluate with evidence', description: 'Trace an answer back to its source and see where it drops a condition or adds an unsupported claim.' },
  { symbol: '◇', title: 'Govern AI', description: 'Give teams clear criteria for deciding which AI outputs meet their requirements.' },
]

export function HomePage() {
  return (
    <>
      <section
        className="hero"
        aria-labelledby="hero-title"
        onPointerMove={moveGridLight}
        onPointerLeave={hideGridLight}
        onPointerCancel={hideGridLight}
      >
        <GridBackground />
        <div className="shell hero-inner">
          <div className="hero-copy">
            <p className="eyebrow">Enterprise AI governance</p>
            <h1 id="hero-title">AI should earn<br />your <em>trust.</em></h1>
            <p className="intro">Compare, evaluate, and govern AI with evidence.</p>
            <div className="hero-actions"><ActionLink to="/contact">Get in touch</ActionLink><Link className="text-link" to="/#platform">Explore the platform</Link></div>
          </div>
          <VerificationGraphic />
        </div>
      </section>
      <section className="shell page-section" id="platform" aria-labelledby="platform-title" tabIndex={-1}>
        <h2 id="platform-title">Make AI decisions with evidence.</h2>
        <div className="capability-grid">
          {capabilities.map(({ symbol, title, description }) => (
            <article className="capability" key={title}>
              <span className="capability-icon" aria-hidden="true">{symbol}</span>
              <h3>{title}</h3><p>{description}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="closing"><div className="shell closing-inner"><h2>What does trustworthy AI look like for your team?</h2><ActionLink to="/contact">Get in touch</ActionLink></div></section>
    </>
  )
}
