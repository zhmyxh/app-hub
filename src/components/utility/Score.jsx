import IconStar from '../../assets/icons/icon-star.svg?react'

function Score({ value, unfilled, color }) {
    return (
        <div className="score" style={{ background: unfilled && 'none' }}>
            <IconStar width={20} height={20} />
            <span className={color === 'white' ? 'white-text' : 'default-text'} style={{ fontWeight: 700 }}>{value}</span>
        </div>
    )
}

export default Score