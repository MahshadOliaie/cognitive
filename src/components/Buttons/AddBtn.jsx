import plus from '/plus.svg'


function AddBtn(){
    return(
        <div className="w-12 h-12 p-3 flex items-center justify-center rounded-full shadow-lg cursor-pointer hover:scale-105 duration-150 bg-dark">
            <img src={plus} alt="" />
        </div>
    )
}

export default AddBtn