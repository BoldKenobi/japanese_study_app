import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { createHashHistory, createRouter, RouterProvider } from "@tanstack/react-router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { AppRoute, KanjiPageRoute, LevelPageRoute, MainPageRoute, RadicalPageRoute, ReviewPageRoute, TestPageRoute, VocabPageRoute } from "./pages/routes"
import Alerts from "./components/Alerts/Alerts"

const client = new QueryClient()

const router = createRouter({
  routeTree: AppRoute.addChildren([
    MainPageRoute,
    KanjiPageRoute,
    VocabPageRoute,
    ReviewPageRoute,
    RadicalPageRoute,
    LevelPageRoute,
    TestPageRoute
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
    <Alerts />
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
)
