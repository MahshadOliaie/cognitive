


function FileInput({ setImage, image, modalData }) {
    let fileKey = (modalData.id)? modalData.original.fileKey : ""


    function handleChange() {
        setImage(event.target.files[0].name)
        console.log(event.target.files[0])
    }

    return (
        <>
            <div className="flex flex-col flex-1 border items-center justify-center bg-sand py-3.5 rounded-md shadow-inner max-w-52.5" style={{ borderColor: "lightgray" }}>
                {(image) ?
                    (modalData.original.coverImage) ?
                        <label htmlFor="image" ><img src={`http://cogcenter.ir/api/fs/v1/files/download/${image}?key=${fileKey}`} alt="" className="max-w-48" /></label>
                        :
                        <label htmlFor="image" >{image}</label>

                    :
                    <label htmlFor="image" className="cursor-pointer opacity-70 text-sm p-5">انتخاب عکس</label>
                }
                <input type="file" name="image" id="image" accept="image/png, image/jpeg, image/jpg" style={{ display: "none" }} onChange={handleChange} />
            </div>

        </>
    )
}

export default FileInput