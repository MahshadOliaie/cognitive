import settingSvg from '/setting.svg'

function SettingBtn({ bgColor, onClick }) {
    return (
        <>
            <p onClick={onClick} className="flex items-center justify-center shadow-md w-8 h-8 rounded-full p-1.5 cursor-pointer hover:scale-105 duration-150" style={(bgColor) ? { backgroundColor: bgColor } : { backgroundColor: "#cf3535" }}>
                <img src={settingSvg} alt="" />
            </p>
        </>
    )
}

export default SettingBtn