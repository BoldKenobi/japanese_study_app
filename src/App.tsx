import { Link, Outlet, useLocation, useRouter } from "@tanstack/react-router"
import IconButton from "./components/IconButton/IconButton"
import { MdChevronLeft, MdHome } from "react-icons/md"
import { useEffect } from "react"

const App = () => {

    const router = useRouter()
    const location = useLocation()

    useEffect(() => console.log(router.history.location), [router])

    return <div className="h-screen w-screen bg-zinc-500 flex flex-col fixed top-0 left-0">
        <div className="min-h-15 bg-zinc-600 flex items-center justify-between px-5">
            {location.pathname !== "/" && <IconButton onClick={router.history.back}>
                <MdChevronLeft color="white" size={40} />
            </IconButton>}
            <Link to="/">
                <IconButton>
                    <MdHome color="white" size={40} />
                </IconButton>
            </Link>
            {/* <IconButton>
                <MdDehaze color="white" size={40} />
            </IconButton> */}
        </div>
        <div className="grow overflow-scroll">
            <Outlet />
        </div>
    </div>
}

export default App