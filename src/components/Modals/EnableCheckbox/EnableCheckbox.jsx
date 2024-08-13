

function EnableCheckbox({enable , setEnable}){

    return(
        <div className="w-5 h-5 rounded-full p-1 cursor-pointer" style={(enable)? {backgroundColor: "#101321"} : {border: "1px solid gray" , backgroundColor: "transparent"}} onClick={()=> setEnable((prev) => !prev)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill={(enable)? "white" : "none"}><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
        </div>
    )
}

export default EnableCheckbox