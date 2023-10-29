import { SectionWrapper } from "../hoc"
import { useState } from 'react';

const DetailCard = () => {

    return (
        <>
            <h1 className="text-black">Test Po</h1>
            <div
                className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full h-[400px]"
            >
                <div className="relative w-full h-[200px]">
                    <img src={image} alt={title}
                        className="w-full h-full object-cover rounded-2xl" />
                    <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
                        {/* <div
              onClick={()=> window.open(url, "_blank")}
              className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
            >
              <img src={github} alt="github" className="w-1/2 h-1/2 object-contain"/>
            </div> */}
                    </div>
                </div>
                <div className="mt-5 overflow-elipsis">
                    <p>{news_portal} • <span>{(moment.unix(news_timestamp)).format('YYYY-MM-DD • HH:mm:ss')}
                        {/* {`${daysAgo} day${daysAgo !== 1 ? 's' : ''} ago`} */}
                    </span> </p>
                    <h3 title={title} className="text-white font-bold text-[20px]  text-left line-clamp-2 text-ellipsis mt-2">{title}</h3>
                </div>
                {/* <div className="mt-4 flex flex-wrap gap-4">
          {news_mentioned_arr.slice(0, 4).map((tag) => (
            tag !== "-" && tag && (
              <p key={tag} className={`text-[14px] bg-secondary p-[2px] rounded-[5px]`}>
                #{tag}
              </p>
            )
          ))}
        </div> */}
            </div>
        </>
    )
}



export default SectionWrapper(DetailCard, "")