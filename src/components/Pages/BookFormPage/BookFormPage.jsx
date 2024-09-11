import { useLocation } from "react-router-dom";

function BookFormPage() {
    const location = useLocation();
    const { state:modalData } = location;

    return (
        <>
        <p>{modalData.id}</p>
        </>
    )
}

export default BookFormPage