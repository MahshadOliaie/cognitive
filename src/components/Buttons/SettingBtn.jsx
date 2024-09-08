import { useState } from 'react'
import settingSvg from '/setting.svg'

function SettingBtn({ onClick }) {
    const [hover, setHover] = useState(false)

    return (
        <div className='relative'>
            <p onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className="flex items-center justify-center shadow-md w-8 h-8 rounded-full p-1.5 cursor-pointer hover:scale-105 duration-150 bg-ocean" >
                <img src={settingSvg} alt="" />
            </p>
            {
                (hover) && <p className="absolute w-max top-full -left-full bg-ocean mt-2 text-white p-1 rounded-md shadow-md z-50">تنظیمات</p>
            }
        </div>
    )
}

export default SettingBtn