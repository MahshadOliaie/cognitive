


function FileInput({ modalData , setImage , image}) {



    function handleChange() {
        setImage(event.target.files[0].name)
        console.log(event.target.files[0].name)
    }

    return (
        <>
            <div className="flex flex-col flex-1 items-center justify-center bg-sand py-3 rounded-md shadow-inner max-w-52">
                {(image) ?
                    <label htmlFor="image" > <img src={image} className="w-20 cursor-pointer" /></label>
                    :
                    <label htmlFor="image" className="cursor-pointer opacity-70 text-sm p-5">انتخاب عکس</label>
                }
                <input type="file" name="image" id="image" accept="image/png, image/jpeg, image/jpg" style={{ display: "none" }} defaultValue={(modalData.id) && modalData.original.coverImage} onChange={handleChange} />
            </div>

        </>
    )
}

export default FileInput