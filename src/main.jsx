import './index.css'

const root = document.getElementById('root')
const prerendered = !!root.firstElementChild

// The entry stays tiny: React and the app load in a separate chunk. On prerendered pages we wait
// for the first frame so the static HTML paints before ~300 ms of JS evaluation + hydration.
async function boot() {
  const [{ StrictMode }, { createRoot, hydrateRoot }, { BrowserRouter }, { default: App }] = await Promise.all([
    import('react'),
    import('react-dom/client'),
    import('react-router'),
    import('./App.jsx'),
  ])
  const app = (
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  )
  if (prerendered) hydrateRoot(root, app)
  else createRoot(root).render(app)
}

if (prerendered) requestAnimationFrame(() => setTimeout(boot, 0))
else boot()
