import { Outlet } from "@tanstack/react-router"

const App = () => <div className="h-screen w-screen bg-gray-700 overflow-scroll">
    <Outlet />
</div>

export default App