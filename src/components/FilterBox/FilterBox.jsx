
import FilterItem from "./FilterItem"


function FilterBox({ filterList, setIsFilterOpen }) {

    let newFilterList = []

    filterList.map(item => {
        if(!newFilterList.includes(item)){
            newFilterList.push(item)
        }
    })

    return (
        <div className="absolute" style={{ right: "30%" }}>
        <div className="bg-sand mt-4 rounded-lg flex flex-col w-full text-right h-60 gap-1 overflow-scroll shadow-xl" >
            <p className="text-base font-normal hover:bg-linen p-6 py-2 cursor-pointer" onClick={() => { setIsFilterOpen(false) }}>انتخاب همه</p>
            {newFilterList.map((item , index) => {
                return <FilterItem item={item} key={index} />
            })}
        </div>
        <div className="bg-ocean text-base font-normal rounded-lg shadow-lg p-2 mt-1 cursor-pointer hover:scale-105 duration-150">اعمال فیلتر</div>
        </div>
    )
}

export default FilterBox