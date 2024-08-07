

function CommentsCard({comment}) {
    
    const {postId , name , email , body} = comment

    var hue = Math.floor(Math.random() * 460);
    var pastel = 'hsl(' + hue + ', 65%, 65%)';

    return (
        <div className="bg-sand shadow-md flex items-center justify-between gap-8 border-r-4 rounded-xl w-full p-8" style={{borderColor: pastel}}>
            <div className="flex flex-2 gap-10 items-center">
                <div className="rounded-full flex-shrink-0 w-16 h-16 overflow-hidden flex justify-center" style={{backgroundColor: pastel}}>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3/4 mt-3" viewBox="0 0 448 512" fill="white" opacity={0.4}><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"/></svg>
                </div>
                <div className="flex flex-col gap-4 max-w-xl">
                    <p className="text-lg font-semibold">{name}</p>
                    <p><span className="font-medium">ایمیل: </span>{email}</p>
                    <p><span className="font-medium">کامنت: </span>{body}</p>
                </div>

            </div>

            <div className="flex-shrink-0">
                <p className="opacity-60"><span className="font-medium">شماره پست: </span>{postId}</p>
            </div>

            <div className="flex-shrink-0 py-2 px-6 rounded-full cursor-pointer hover:scale-105 duration-300" style={{backgroundColor: pastel}}>
                <p className="text-white font-medium">حذف کامنت</p>
            </div>
        </div>
    )
}

export default CommentsCard