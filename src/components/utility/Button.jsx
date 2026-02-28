import { useEffect } from "react"
import { useTranslation } from "react-i18next"

function Button({ name, icon, color, type, action, wd, size }) {
    const { t } = useTranslation()
    let textClass = ''

    useEffect(() => {
        if (type === 'main' && !color) textClass = 'default-text'
        if (type === 'secondary') textClass = 'secondary-text'
        if (type === 'main' && color) textClass = 'white-text'
    }, [])

    return (
        <button
            className={`button-${type} ${color ? color : ''}`}
            style={{ width: wd ? '100%' : 'fit-content' }}
            onClick={action}>
            {icon && icon}
            <span className={textClass} style={{ fontSize: size ? size : 16 }}>{name}</span>
        </button>
    )
}

export default Button