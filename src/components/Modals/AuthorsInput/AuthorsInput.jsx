import { useEffect, useState } from "react"
import useFetch from "../../../hooks/useFetch"


function AuthorsInput({ modalData }) {
    const [data, setData] = useState([])
    const authors = useFetch('/authors.json')

console.log(modalData)
    useEffect(() => {
        setData(authors)

        return () => {

        }

    }, [authors])

    return (
        <>
            <div className="flex flex-col">
                <label htmlFor="authors" className="opacity-70 text-sm mb-1">نویسندگان</label>
                <select className="p-2 rounded-md shadow-inner focus-visible:border-2 border-dark outline-none" name="authors" id="authors">
                    {(modalData.id) ?
                        <option value={modalData.original.authors[0].id}>{modalData.original.authors[0].firstName + " " + modalData.original.authors[0].lastName}</option>

                        :
                        <option value="default">انتخاب کنید</option>
                    }
                    {data.map(author => {
                        return <option value={author.id} key={author.id}>{author.firstName + " " + author.lastName}</option>
                    })}
                </select>
            </div>

        </>
    )
}

export default AuthorsInput