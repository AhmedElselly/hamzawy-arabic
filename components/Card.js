import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Card.module.css';
import { Markup } from 'react-render-markup';

const Card = ({_id, title, subtitle, image,  price}) => {
	const allowed = ['p'];
	return(
		<Link href={`/products/${_id}`}>
		<div className={styles.container}>
			<img className={styles.img} src={image} alt={title}  />			
			<h1 className={styles.title}>{title}</h1>
			<span className={styles.price}>${price}</span>
			<div className={styles.desc}>
				{subtitle}
			</div>
		</div>
		</Link>
	)
}

export default Card;