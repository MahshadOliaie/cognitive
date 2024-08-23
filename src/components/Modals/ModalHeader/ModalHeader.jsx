

function ModalHeader({ title, id }) {
    return (
        <>
            <div className="flex items-center justify-between py-5 mb-4" style={{ borderBottom: "0.5px solid gray" }}>
                <p className="text-xl font-bold text-dark">{title}</p>
                {(id) &&
                    <p className="text-lg font-bold text-dark"><span className="text-base font-normal">ID: </span>{id}</p>}
            </div>
        </>
    )
}

export default ModalHeader