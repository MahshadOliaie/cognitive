
import ReplyBtn from "../Buttons/ReplyBtn";
import SettingBtn from "../Buttons/SettingBtn";
import PublishTag from "./PublishTag";


function CommentsCard({ comment, onClick , reply }) {

    const { id, userName, text, userImage, modelType, reaction, publishAt, updatedAt, publish } = comment

    var hue = Math.floor(Math.random() * 460);
    var pastel = 'hsl(' + hue + ', 65%, 65%)';


    return (
        <div className="bg-sand shadow-md flex items-center justify-between gap-8 border-r-4 rounded-xl w-full p-8 py-5 relative" style={{ borderColor: pastel }}>
            <div className="flex flex-2 gap-10 items-center">
                <div className="rounded-full flex-shrink-0 w-16 h-16 overflow-hidden flex justify-center" style={{ backgroundColor: pastel }}>
                    {(userImage) ?
                        <img src={userImage} alt="" />
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3/4 mt-3" viewBox="0 0 448 512" fill="white" opacity={0.4}><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" /></svg>
                    }
                </div>
                <div className="flex flex-col gap-4 max-w-xl">
                    <p className="text-lg font-semibold">{userName}</p>
                    <p><span className="font-medium">کامنت: </span>{text}</p>
                </div>

            </div>

            <div className="flex-shrink-0 flex flex-col gap-3">
                <p className="opacity-60"><span className="font-medium">شماره پست: </span>{modelType.id}</p>
                <p className="opacity-60"><span className="font-medium">تاریخ انتشار: </span>{new Date(publishAt).toLocaleDateString()}</p>
                <p className="opacity-60"><span className="font-medium">آخرین آپدیت: </span>{(updatedAt) ? new Date(updatedAt).toLocaleDateString() : "-"}</p>
            </div>

            <div className="flex gap-4 flex-col">
                <p className="flex items-center gap-2 text-sm">
                    <svg className="w-5 opacity-80 mb-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#96d35f" d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2l144 0c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48l-97.5 0c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3l0-38.3 0-48 0-24.9c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192l64 0c17.7 0 32 14.3 32 32l0 224c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32L0 224c0-17.7 14.3-32 32-32z" /></svg>
                    {(reaction.LIKE) ? reaction.LIKE.count : 0}</p>
                <p className="flex items-center gap-2 text-sm">
                    <svg className="w-5 opacity-80" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#e32400" d="M313.4 479.1c26-5.2 42.9-30.5 37.7-56.5l-2.3-11.4c-5.3-26.7-15.1-52.1-28.8-75.2l144 0c26.5 0 48-21.5 48-48c0-18.5-10.5-34.6-25.9-42.6C497 236.6 504 223.1 504 208c0-23.4-16.8-42.9-38.9-47.1c4.4-7.3 6.9-15.8 6.9-24.9c0-21.3-13.9-39.4-33.1-45.6c.7-3.3 1.1-6.8 1.1-10.4c0-26.5-21.5-48-48-48l-97.5 0c-19 0-37.5 5.6-53.3 16.1L202.7 73.8C176 91.6 160 121.6 160 153.7l0 38.3 0 48 0 24.9c0 29.2 13.3 56.7 36 75l7.4 5.9c26.5 21.2 44.6 51 51.2 84.2l2.3 11.4c5.2 26 30.5 42.9 56.5 37.7zM32 384l64 0c17.7 0 32-14.3 32-32l0-224c0-17.7-14.3-32-32-32L32 96C14.3 96 0 110.3 0 128L0 352c0 17.7 14.3 32 32 32z" /></svg>
                    {(reaction.DISLIKE) ? reaction.DISLIKE.count : 0}</p>
            </div>

            <div className="flex flex-col gap-3">
                <SettingBtn bgColor={pastel} onClick={onClick} />
                <ReplyBtn bgColor={pastel} onClick={reply} />
            </div>

            {(!publish) && <PublishTag />}
        </div>
    )
}

export default CommentsCard