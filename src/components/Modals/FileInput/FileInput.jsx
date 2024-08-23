


function FileInput({setImage , image}) {



    function handleChange() {
        setImage(event.target.files[0].name)
        console.log(event.target.files[0].name)
    }

    return (
        <>
            <div className="flex flex-col flex-1 items-center justify-center bg-sand py-3 rounded-md shadow-inner max-w-52">
                {(image) ?
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