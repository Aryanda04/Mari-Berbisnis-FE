import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import { styles } from '../styles'
import axios from "axios"
import { fadeIn } from "../utils/motion"

import Sheet from 'react-modal-sheet';
import DetailCard from "./DetailCard";
import moment from 'moment';




const Card = ({ index, title, description, image, url, tags, news_summary, news_portal, news_timestamp, news_mentioned }) => {
  const news_mentioned_arr = news_mentioned.split("_")

  const [isOpen, setOpen] = useState(false);

  return (
    <motion.div
      variants={fadeIn('up', 'spring', index * 0.5, 0.75)}
    >
      <div
        className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full h-[400px]"
      >
        <div className="relative w-full h-[200px]">
          <img src={image} alt={title}
            className="w-full h-full object-cover rounded-2xl" />
        </div>
        <div className="mt-5 overflow-elipsis">
          <p>{news_portal} • <span>{(moment.unix(news_timestamp)).format('YYYY-MM-DD')}
            {/* {`${daysAgo} day${daysAgo !== 1 ? 's' : ''} ago`} */}
          </span> </p>
          <h3 title={title} className="text-white font-bold text-[20px]  text-left line-clamp-2 text-ellipsis mt-2">{title}</h3>
        </div>
        <div className="mt-4 flex flex-wrap gap-4">
          {news_mentioned_arr.slice(0, 4).map((tag) => (
            tag !== "-" && tag && (
              <p key={tag} className={`text-[14px] bg-secondary p-[2px] rounded-[5px]`}>
                #{tag}
              </p>
            )
          ))}
        </div>
        {/* <button onClick={() => setOpen(true)}>Open sheet</button> */}

        {/* <Sheet isOpen={isOpen} onClose={() => setOpen(false)}>
          <Sheet.Container>
            <Sheet.Header />
            <Sheet.Content><DetailCard /></Sheet.Content>
          </Sheet.Container>
          <Sheet.Backdrop />
        </Sheet> */}
      </div>

    </motion.div >
  )
}


const Hero = () => {
  const [news, setNews] = useState([]);
  async function fetchShippingCompanies() {
    try {
      const response = await axios.get('https://mari-berbisnis.vercel.app/v1/news?sortBy=news_timestamp%3Aasc&limit=3&page=1');
      if (response.status === 200) {
        // console.log(response.data.results)
        setNews(response.data.results);
      } else {
        console.log('error')
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchShippingCompanies()

  }, []);
  // console.log('result', news)
  return (
    <section className='relative w-full h-screen mx-auto'>
      <div className={`${styles.paddingX} absolute inset-0 top-[120px] max-w-7xl mx-auto `}>
        <div className='flex flex-row items-start gap-5'>
          <div>

            <h1 className={`${styles.heroHeadText} blue-violet-text-gradient`}>This is tagline</h1>
            <h1 className={`${styles.heroHeadText2} text-white`}>Bawahnya Tagline</h1>
            <p className={`${styles.heroSubText} mt-2 text-white-100`}> Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur <br className='sm:block hidden' />enim laboriosam explicabo laudantium quae? </p>
            <div className='w-2/4 blue-violet-gradient p-[2px] rounded-[20px] my-5 shadow-card'>

              <input type="text" name="NAME_SEARCH" id="ID_SEARCH" className="w-full p-4 bg-[#121139] rounded-[20px] text-lg " placeholder="Search" />
            </div>
          </div>
          <div className='flex flex-col justify-center items-center mt-5'>
            <div className='w-5 h-5 rounded-full bg-[#915eff]'></div>
            <div className='w-1 sm:h-80 h-40 violet-gradient'></div>
          </div>
        </div>

        <div className={`max-w-7xl mx-auto flex flex-row items-start gap-5`}>
          {news.map((project, index) => (
            <Card key={`project-${index}`}
              index={index} {...project} />
          ))}
        </div>
      </div >

    </section >
  )
}

export default Hero