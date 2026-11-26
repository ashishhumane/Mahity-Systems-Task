import { GridBackground, hideGridLight, moveGridLight } from '../components/GridBackground'
import { ContactForm } from '../features/contact/ContactForm'

const topics = [
  { icon: '◫', title: 'Model selection', description: 'Compare models on the tasks your team needs them to do.' },
  { icon: '◎', title: 'Evidence checks', description: 'Verify whether AI answers are supported by your sources.' },
  { icon: '◇', title: 'AI governance', description: 'Define what an AI system needs to pass before rollout.' },
]

export function ContactPage() {
  return (
    <section
      className="contact-page"
      aria-labelledby="contact-title"
      onPointerMove={moveGridLight}
      onPointerLeave={hideGridLight}
      onPointerCancel={hideGridLight}
    >
      <GridBackground />
      <div className="shell contact-inner">
        <div className="contact-copy">
          <p className="eyebrow">Contact SourceControl</p>
          <h1 id="contact-title">Let’s talk about your <em>AI goals.</em></h1>
          <p className="intro">Tell us what you’re building and what you need to prove before putting AI to work.</p>
          <section className="contact-topics" aria-labelledby="contact-topics-title">
            <h2 id="contact-topics-title">What we can discuss</h2>
            <ul>
              {topics.map(({ icon, title, description }) => (
                <li key={title}>
                  <span className="contact-topic-icon" aria-hidden="true">{icon}</span>
                  <div><h3>{title}</h3><p>{description}</p></div>
                </li>
              ))}
            </ul>
          </section>
        </div>
        <ContactForm />
      </div>
    </section>
  )
}
