import { useEffect, useState } from "react";



function useFetch(url) {
    const [data, setData] = useState([])


    useEffect(() => {
        fetch(url, {
            mode: 'no-cors',
            headers: {
                'accept': '*/*'
            }
        })
            .then(res => res.json())
            .then(data => setData(data))

    }, [])

    return data;
}


export default useFetch