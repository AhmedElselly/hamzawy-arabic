import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Card.module.css';
import { Markup } from 'react-render-markup';

const Card = ({_id, title, subtitle, image,  price}) => {
	const allowed = ['p'];
	return(
		<Link href={`/products/${_id}`}>
		
			<div className={styles.card}>
				<div className={styles.cardHeader}>
					<img src={image} alt={title} />
				</div>
				<div className={styles.cardBody}>
					<span className={styles.tag}>{price} جـ.م</span>
					<h4>{title}</h4>
					<p>
						{subtitle}
					</p>			
				</div>
			</div>
		</Link>
	)
}

export default Card;