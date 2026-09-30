import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, createRoute } from "@tanstack/react-router";
import App from "../App";
import MainPage from "./MainPage";
import Spinner from "../components/Spinner";
import KanjiPage from "./KanjiPage";
import VocabPage from "./VocabPage";

export const AppRoute = createRootRouteWithContext<{ client: QueryClient }>()({
    component: App
})

export const MainPageRoute = createRoute({
    getParentRoute: () => AppRoute,
    path: '/',
    component: MainPage,
    pendingComponent: () => <div className="h-full w-full flex justify-center items-center"><Spinner /></div>,
    errorComponent: () => <div>Error</div>,
    //   loader: async ({ context: { client } }) => {
    //     await client.prefetchQuery(pipelineQuery)
    //   }
})

export const KanjiPageRoute = createRoute({
    getParentRoute: () => AppRoute,
    path: "/kanji/$id",
    component: KanjiPage,
    pendingComponent: () => <div className="h-full w-full flex justify-center items-center"><Spinner /></div>,
    errorComponent: () => <div>Error</div>,
})

export const VocabPageRoute = createRoute({
    getParentRoute: () => AppRoute,
    path: "/vocab/$id",
    component: VocabPage,
    pendingComponent: () => <div className="h-full w-full flex justify-center items-center"><Spinner /></div>,
    errorComponent: () => <div>Error</div>,
})