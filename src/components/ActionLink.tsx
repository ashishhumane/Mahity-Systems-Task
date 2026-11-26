import { Link } from 'react-router-dom'

export function ActionLink({ to, children }: { to: string; children: string }) {
  return <Link className="button" to={to}>{children}</Link>
}
