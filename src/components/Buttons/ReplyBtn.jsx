
import { useState } from 'react'
import replySvg from '/reply.svg'

function ReplyBtn({ onClick }) {
    const [hover, setHover] = useState(false)
    return (
        <div className='relative'>
            <p onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className="flex items-center justify-center shadow-md w-8 h-8 rounded-full p-1.5 cursor-pointer hover:scale-105 duration-150 bg-dark">
                <img src={replySvg} alt="" />
            </p>
            {
                (hover) && <p className="absolute w-max top-full -left-full bg-dark mt-2 text-white p-1 rounded-md shadow-md z-50">ریپلای‌</p>
            }
        </div>
    )
}

export default ReplyBtn