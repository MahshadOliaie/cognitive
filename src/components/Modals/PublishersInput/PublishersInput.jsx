import { useEffect, useState } from "react"
import useFetch from "../../../hooks/useFetch"


function PublishersInput({ modalData, setPublisherValue }) {
    const [data, setData] = useState([])
    const publishers = useFetch('/publishers.json')

    useEffect(() => {
        setData(publishers)

        return () => {

        }

    }, [publishers])


    function handleChange() {
        setPublisherValue(event.target.value)
    }

    return (
        <>
            <div className="flex flex-col flex-1">
                <label htmlFor="publisher" className="opacity-70 text-sm mb-1">ناشر</label>
                <select className="p-2 rounded-md shadow-inner focus-visible:border-2 border-dark outline-none" name="publisher" id="publisher" onChange={handleChange}>
                    {(modalData.id) ?
                        <option value={modalData.original.publisher.id}>{modalData.original.publisher.name}</option>
                        :
                        <option value="default">انتخاب کنید</option>
                    }
                    {data.map(publisher => {
                        return <option value={publisher.id} key={publisher.id}>{publisher.name}</option>
                    })}
                </select>
            </div>
        </>
    )
}

export default PublishersInput