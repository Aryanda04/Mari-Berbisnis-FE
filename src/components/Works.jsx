import { Tilt } from "react-tilt"
import { motion } from 'framer-motion'
import styled from 'styled-components';
import { styles } from "../styles"
import { github } from "../assets"
import { SectionWrapper } from "../hoc"
import { projects } from "../constants"
import { fadeIn, textVariant } from "../utils/motion"
import axios from "axios"
import { useEffect, useState } from "react"
import moment from 'moment';
import Sheet from 'react-modal-sheet';
import DetailCard from "./DetailCard";



const ProjectCard = ({ index, title, description, image, url, tags, news_summary, news_portal, news_timestamp, news_mentioned }) => {
  const news_mentioned_arr = news_mentioned.split("_")
  const yourDate = moment((moment.unix(news_timestamp)).format('YYY-MM-DD HH:mm:ss'), 'YYYY-MM-DD HH:mm:ss');
  const currentDate = moment();

  const daysAgo = currentDate.diff(yourDate, 'days');
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
        <div className="mt-4 flex flex-wrap gap-4">
          {news_mentioned_arr.slice(0, 4).map((tag) => (
            tag !== "-" && tag && (
              <p key={tag} className={`text-[14px] bg-secondary p-[2px] rounded-[5px]`}>
                #{tag}
              </p>
            )
          ))}
        </div>
        <button onClick={() => setOpen(true)}>Open sheet</button>

        <Sheet isOpen={isOpen} onClose={() => setOpen(false)}>
          <Sheet.Container>
            <Sheet.Header />
            <Sheet.Content><DetailCard /></Sheet.Content>
          </Sheet.Container>
          <Sheet.Backdrop />
        </Sheet>
      </div>

    </motion.div >
  )
}

const Works = () => {
  const [shippingCompanies, setShippingCompanies] = useState([]);
  async function fetchShippingCompanies() {
    try {
      const response = await axios.get('https://mari-berbisnis.vercel.app/v1/news?sortBy=news_timestamp%3Aasc&limit=3&page=1');
      if (response.status === 200) {
        // console.log(response.data.results)
        setShippingCompanies(response.data.results);
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
  console.log('result', shippingCompanies)

  return (
    <>
      <motion.div
        variants={textVariant()}
      >
        {/* <p className={styles.sectionSubText}>My work</p> */}
        <h2 className={styles.sectionHeadText}>News.</h2>
      </motion.div>
      <div className="w-full flex">
        <motion.p
          variants={fadeIn('', '', 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab adipisci eum aliquam quasi laboriosam harum cum assumenda sit. Eius dignissimos delectus temporibus nesciunt quisquam mollitia dolorem, velit quod minima quam?
        </motion.p>
      </div>

      <div className="mt-20 flex flex-wrap gap-7">
        {shippingCompanies.map((project, index) => (
          <ProjectCard key={`project-${index}`}
            index={index} {...project} />
        ))}
      </div>
    </>
  )
}

export default SectionWrapper(Works, "")