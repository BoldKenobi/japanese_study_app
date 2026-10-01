import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, createRoute } from "@tanstack/react-router";
import App from "../App";
import MainPage from "./MainPage";
import KanjiPage from "./KanjiPage";
import VocabPage from "./VocabPage";
import ReviewPage from "./ReviewPage";
import RadicalPage from "./RadicalPage";

export const AppRoute = createRootRouteWithContext<{ client: QueryClient }>()({
    component: App
})

export const MainPageRoute = createRoute({
    getParentRoute: () => AppRoute,
    path: '/',
    component: MainPage,
    errorComponent: () => <div>Error</div>,
})

export const RadicalPageRoute = createRoute({
    getParentRoute: () => AppRoute,
    path: "/radical/$id",
    component: RadicalPage,
    errorComponent: () => <div>Error</div>
})

export const KanjiPageRoute = createRoute({
    getParentRoute: () => AppRoute,
    path: "/kanji/$id",
    component: KanjiPage,
    errorComponent: () => <div>Error</div>,
})

export const VocabPageRoute = createRoute({
    getParentRoute: () => AppRoute,
    path: "/vocab/$id",
    component: VocabPage,
    errorComponent: () => <div>Error</div>,
})

export const ReviewPageRoute = createRoute({
    getParentRoute: () => AppRoute,
    path: "/reviews",
    component: ReviewPage,
    errorComponent: () => <div>Error</div>,
})