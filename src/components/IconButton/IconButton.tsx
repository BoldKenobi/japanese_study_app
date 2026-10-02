import { Button } from "react-aria-components";
import type { ReactNode } from "react";

type IconButtonProps = {
    children: ReactNode,
    onClick?: () => void,
    disabled?: boolean
}

const IconButton = ({ onClick = () => {}, children, disabled = false }: IconButtonProps) => <Button isDisabled={disabled} className="icon-button" onClick={onClick}>
    {children}
</Button>

export default IconButton