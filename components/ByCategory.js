import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import Card from './Card';
import styles from '../styles/ByCategory.module.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


const url = 'http://localhost:3000/api/products';
const ByCategory = ({category}) => {

	const responsive = {
		superLargeDesktop: {
			// the naming can be any, depends on you.
			breakpoint: { max: 4000, min: 3000 },
			items: 5
		},
		desktop: {
			breakpoint: { max: 3000, min: 1024 },
			items: 3
		},
		tablet: {
			breakpoint: { max: 1024, min: 680 },
			items: 2
		},
		mobile: {
			breakpoint: { max: 680, min: 0 },
			items: 1
		}
	};

	const listRef = useRef();

	const [slideNumber, setSlideNumber] = useState(0);
	const [posts, setPosts] = useState([]);
	
	useEffect(() => {
		async function fetchData(){
			const res = await axios.get(`${url}/category/${category}`)
			setPosts(res.data);
		}
		fetchData()
	}, []);

	const handleClick = direction => {
		let distance = listRef.current.getBoundingClientRect().x - 5;
		if(direction === 'left' && slideNumber > 0){
			setSlideNumber(slideNumber - 1);
			listRef.current.style.transform = `translateX(${230 + distance}px)`;
		} 
		if(direction === 'right' && slideNumber < posts.length) {
			setSlideNumber(slideNumber + 1)
			listRef.current.style.transform = `translateX(${-230 + distance}px)`;
		}
		console.log(slideNumber)
		if(slideNumber < 0) setSlideNumber(0)
	}

	const listingPosts = () => {
		return posts.map((product, i) => 
			<Card style={{marginLeft: 15}} key={product._id} _id={product._id} title={product.title} category={product.category} image={product.image} subtitle={product.subtitle} price={product.price} />
		)
	}
	
	return(
		<div className={styles.container}>
			<h3 className={styles.title}>{category}</h3>
		
			<div className={styles.carouselContainer}>
				<Carousel
					// partialVisible={true} 
					swipeable={true}
					draggable={true}
					// showDots={true}
					responsive={responsive}
					ssr={true} // means to render carousel on server-side.
					infinite={true}
					autoPlaySpeed={1000}
					keyBoardControl={true}
					customTransition="all .5s ease-in-out"
					transitionDuration={500}
					containerClass='carousel-container'
					// removeArrowOnDeviceType={["tablet", "mobile"]}
					dotListClass="custom-dot-list-style"
					// itemClass="carousel-item-padding-40-px"
					itemClass={styles.item}
					focusOnSelect={true}
				>
					{listingPosts()}
				</Carousel>
			</div>
		</div>
	)
}

// console.log(cat)

// export const getServerSideProps = async ctx => {
// 	const res = await axios.get(`${url}/category/${cat}`);

// 	return {
// 		props: {
// 			posts: res.data
// 		}
// 	}
// }

export default ByCategory;