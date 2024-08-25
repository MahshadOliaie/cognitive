import { useEffect, useState } from "react";
import TOKEN from "../../public/token";



function useFetch(url) {
    const [data, setData] = useState([])


    useEffect(() => {
        fetch(url,
            
            {
                headers: {
                    'accept': '*/*',
                    'Authorization': TOKEN,
                    'scope': [
                        "SUPER_ADMIN"
                    ],
                    "expiresIn": 1724266116069,
                    "refreshToken": "3eb183b8-340f-4452-af97-55015dd105b8",

                }

            })
            .then(res => res.json())
            .then(data => setData(data))

    }, [])

    return data;
}


export default useFetch


