/* eslint-disable react-refresh/only-export-components */
import { MdCheck, MdError, MdInfo, MdWarning } from "react-icons/md"
import {
    Button,
    Text,
    UNSTABLE_Toast as Toast,
    UNSTABLE_ToastContent as ToastContent,
    UNSTABLE_ToastQueue as ToastQueue,
    UNSTABLE_ToastRegion as ToastRegion
} from "react-aria-components"

type AlertType = "info" | "success" | "warning" | "error"

type Alert = {
    message: string
    type: AlertType
}

const alertQueue = new ToastQueue<Alert>()

const getIcon = (type: AlertType) => {
    switch (type) {
        case "info":
            return <MdInfo />
        case "success":
            return <MdCheck />
        case "warning":
            return <MdWarning />
        case "error":
            return <MdError />
    }
}

const getColor = (type: AlertType) => {
    switch (type) {
        case "info":
            return "bg-blue-500"
        case "success":
            return "bg-green-500"
        case "warning":
            return "bg-orange-500"
        case "error":
            return "bg-red-500"
    }
}

export const addAlert = (alert: Alert) => alertQueue.add(alert, { timeout: 5000 })
export const clearAlerts = () => alertQueue.clear()

const Alerts = () => <ToastRegion className="alert-region" queue={alertQueue}>
    {({ toast }) => <Toast toast={toast}>
        <ToastContent>
            <Button slot="close" className={`alert ${getColor(toast.content.type)}`}>
                {getIcon(toast.content.type)}
                <div className="vertical-line"></div>
                <Text slot="title">{toast.content.message}</Text>
            </Button>
        </ToastContent>
    </Toast>}
</ToastRegion>

export default Alerts