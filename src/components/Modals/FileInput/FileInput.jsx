import TOKEN from "../../../../public/token"



function FileInput({ setImage, image, modalData }) {
    let fileKey = (modalData.id) ? modalData.original.fileKey : ""




    async function handleChange() {
        const formData = new FormData();
        formData.append("modelTypeId", 6);
        formData.append("scopeId", 0);
        formData.append("file", event.target.files[0]);

        await fetch("https://cogcenter.ir/api/fs/v1/files", {
            method: "POST",
            headers: {
                'accept': '*/*',
                'Authorization': TOKEN,
                'scope': [
                    "SUPER_ADMIN"
                ],
                "expiresIn": 1724266116069,
                "refreshToken": "3eb183b8-340f-4452-af97-55015dd105b8",
            },
            body: formData
        })
            .then(res => res.json())
            .then(data => setImage(data.fileName))

    }


    return (
        <>
            <div className="flex flex-col flex-1 border items-center justify-center bg-sand py-3.5 rounded-md shadow-inner max-w-52.5" style={{ borderColor: "lightgray" }}>
                {(image) ?
                    (modalData.original?.coverImage) ?
                        <label htmlFor="image" ><img src={`http://cogcenter.ir/api/fs/v1/files/download/${image}?key=${fileKey}`} alt="" className=" max-h-52" /></label>
                        :
                        <label htmlFor="image" ><img src={`http://cogcenter.ir/api/fs/v1/files/download/${image}?key=${fileKey}`} alt="" className=" max-h-52" /></label>

                    :
                    <label htmlFor="image" className="cursor-pointer opacity-70 text-sm p-5">انتخاب عکس</label>
                }
                <input type="file" name="image" id="image" accept="image/png, image/jpeg, image/jpg" style={{ display: "none" }} onChange={handleChange} />
            </div>

        </>
    )
}

export default FileInput