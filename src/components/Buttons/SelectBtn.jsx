import { useEffect } from "react"
import checkSvg from '/check.svg'

function SelectBtn({ setSelectedItems, selectedItems, bookData }) {

    useEffect(() => {
        console.log(selectedItems)
    }, [selectedItems])

    function handleSelect() {
        console.log(bookData)
        if (selectedItems.includes(bookData)) {
            setSelectedItems(selectedItems.filter(item => item.id != bookData.id))
        }
        else
            setSelectedItems(prev => [...prev, bookData])
    }
    
    return (
        <>
            <div className="w-4 h-4 cursor-pointer rounded-full border border-dark m-auto flex items-center justify-center" onClick={handleSelect} style={{ backgroundColor: (selectedItems.includes(bookData)) ? "black" : "transparent" }}>
                {(selectedItems.includes(bookData)) &&
                    <img src={checkSvg} alt="" className="w-2.5" />
                }
            </div>
        </>
    )
}

export default SelectBtn