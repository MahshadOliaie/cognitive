import { useState } from 'react'
import plus from '/plus.svg'


function AddBtn({ onClick }) {
    const [hover, setHover] = useState(false)
    return (
        <div className="fixed bottom-10 left-16 z-50">
            <div className="w-12 h-12 p-3 flex items-center justify-center rounded-full shadow-lg cursor-pointer hover:scale-105 duration-150 bg-dark" style={{boxShadow: "2px 2px 7px gray"}} onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                <img src={plus} alt="" />
            </div>
            {(hover) &&
                <div className='absolute bg-dark text-white p-2 left-full top-4 ml-2 w-max rounded-lg'>افزودن کتاب</div>
            }
        </div>
    )
}

export default AddBtn