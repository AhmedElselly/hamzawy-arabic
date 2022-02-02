import Link from 'next/link';
import styles from '../styles/Card.module.css';
import { Markup } from 'react-render-markup';

const Card = ({_id, title, desc, image,  price}) => {
	const allowed = ['p'];
	return(
		<Link href={`/products/${_id}`}>
		<div className={styles.container}>
			<img src={image} style={{cursor: 'pointer', objectFit: 'cover'}}  />			
			<h1 className={styles.title}>{title}</h1>
			<span className={styles.price}>${price}</span>
			<div className={styles.desc}>
				<Markup allowed={allowed} markup={`${desc}...`} />
			</div>
		</div>
		</Link>
	)
}

export default Card;