import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { createHashHistory, createRouter, RouterProvider } from "@tanstack/react-router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { AppRoute, KanjiPageRoute, MainPageRoute, RadicalPageRoute, ReviewPageRoute, VocabPageRoute } from "./pages/routes"

const client = new QueryClient()

const router = createRouter({
  routeTree: AppRoute.addChildren([
    MainPageRoute,
    KanjiPageRoute,
    VocabPageRoute,
    ReviewPageRoute,
    RadicalPageRoute
  ]),
  context: { client },
  history: createHashHistory()
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
)
