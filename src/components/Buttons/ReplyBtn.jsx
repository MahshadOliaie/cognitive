
import replySvg from '/reply.svg'

function ReplyBtn({onClick }) {
    return (
        <>
            <p onClick={onClick} className="flex items-center justify-center shadow-md w-8 h-8 rounded-full p-1.5 cursor-pointer hover:scale-105 duration-150 bg-dark">
                <img src={replySvg} alt="" />
            </p>
        </>
    )
}

export default ReplyBtn