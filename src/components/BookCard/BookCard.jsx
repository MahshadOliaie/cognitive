


function BookCard({ data }) {

    const { coverImage, name, category, authors, publisher, publicationYear, pageNumber, feedbackStats, updateAt, publish } = data

    return (
        <div className="flex justify-between relative p-11 pr-16 bg-sand rounded-xl shadow-md items-center">
            <div className="w-52 -mr-10" style={{ transform: "skew(-20deg)", overflow: "hidden", rotate: '3deg' }}>
                <img src={coverImage} className="w-36 border-r-8 border-t-8 " alt="" style={{ borderTopColor: "whitesmoke", transform: "skew(20deg)", marginRight: "30px", boxShadow: "36px 180px 4rem gray" }} />
            </div>
            <div className="flex-1 mr-5 gap-4 flex flex-col">
                <p className="text-xl font-bold mb-3">{name}</p>
                <p><span className="opacity-50 text-sm">ژانر: </span>{category.title}</p>
                <p className="flex items-center gap-1"><span className="opacity-50 text-sm">نویسنده‌ها: </span>
                    <span className="flex gap-4">{authors.map(author => {
                        return <p>{author.firstName + author.lastName}</p>
                    })}
                    </span>
                </p>
                <div className="flex gap-16">
                    <p><span className="opacity-50 text-sm">ناشر:‌</span>{publisher.name}</p>
                    <p><span className="opacity-50 text-sm">سال انتشار‌: </span>{publicationYear}</p>
                </div>
                <p><span className="opacity-50 text-sm">تعداد صفحات: </span>{pageNumber}</p>
            </div>
            <div className="gap-6 flex flex-col items-center">
                <p className="flex items-center gap-2 text-sm">
                    <svg className="w-6 opacity-80 mb-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#96d35f" d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2l144 0c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48l-97.5 0c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3l0-38.3 0-48 0-24.9c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192l64 0c17.7 0 32 14.3 32 32l0 224c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32L0 224c0-17.7 14.3-32 32-32z" /></svg>
                    {feedbackStats.reaction.LIKE.count}
                </p>
                <p className="flex items-center gap-2 text-sm">
                    <svg className="w-6 opacity-80" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#e32400" d="M313.4 479.1c26-5.2 42.9-30.5 37.7-56.5l-2.3-11.4c-5.3-26.7-15.1-52.1-28.8-75.2l144 0c26.5 0 48-21.5 48-48c0-18.5-10.5-34.6-25.9-42.6C497 236.6 504 223.1 504 208c0-23.4-16.8-42.9-38.9-47.1c4.4-7.3 6.9-15.8 6.9-24.9c0-21.3-13.9-39.4-33.1-45.6c.7-3.3 1.1-6.8 1.1-10.4c0-26.5-21.5-48-48-48l-97.5 0c-19 0-37.5 5.6-53.3 16.1L202.7 73.8C176 91.6 160 121.6 160 153.7l0 38.3 0 48 0 24.9c0 29.2 13.3 56.7 36 75l7.4 5.9c26.5 21.2 44.6 51 51.2 84.2l2.3 11.4c5.2 26 30.5 42.9 56.5 37.7zM32 384l64 0c17.7 0 32-14.3 32-32l0-224c0-17.7-14.3-32-32-32L32 96C14.3 96 0 110.3 0 128L0 352c0 17.7 14.3 32 32 32z" /></svg>
                    {feedbackStats.reaction.DISLIKE.count}
                </p>
                <p className="flex flex-col items-center">{feedbackStats.comment.count} <span className="opacity-50 text-sm">تعداد کامنت‌ها</span></p>
                <p className="text-sm opacity-70"><span className="opacity-50 text-sm">آخرین آپدیت: </span>{new Date(updateAt).toLocaleDateString()}</p>
            </div>

            {(publish) &&
                <div className="absolute -left-0.5 top-1 text-white py-1 px-3 shadow-lg" style={{ backgroundColor: "green" }}>منتشر شده</div>
            }

        </div>
    )
}

export default BookCard