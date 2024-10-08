


function Header({title}){
    return(
        <>
        <div className="fixed flex items-center justify-between right-0 bg-sand top-0 w-full h-16 ps-64 pe-8 shadow-sm z-30" id="myHeader">
            <h1 className="text-2xl font-semibold text-dark">{title}</h1>
        </div>
        </>
    )
}

export default Header