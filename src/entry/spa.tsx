import { ErrorBoundary, render } from 'solid-js/web'
import App from '../app'
import { ayncRouters } from '../routes'

(async () => {
  const routes = await ayncRouters()

  render(() => (
    <ErrorBoundary fallback={<span>error</span>}>

      <App routes={routes} />

    </ErrorBoundary>

  ), document.getElementById('root')!)
})()
