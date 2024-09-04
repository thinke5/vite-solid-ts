import { ErrorBoundary, render } from 'solid-js/web'
import App from '../app'
import { ayncRouters } from '../routes'

(async () => {
  const routes = await ayncRouters()

  render(() => (
    <ErrorBoundary fallback={(error) => {
      // eslint-disable-next-line no-console
      console.log('ErrorBoundary =>\n', error)
      return <span class="text-red">{error.message || 'error'}</span>
    }}
    >
      <App routes={routes} />
    </ErrorBoundary>

  ), document.getElementById('root')!)
})()
