import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Card.module.css';

const Card = ({_id, title, subtitle, category, image,  price}) => {
	return(
		<Link href={`/products/${_id}`} passHref>
		
			<div className={styles.card}>
				<div className={styles.cardHeader}>
					<Image width={500} height={300} src={image} alt={title} />
				</div>
				<div className={styles.cardBody}>
					<span className={styles.tag}>{price} جـ.م</span>
					<h4>{title}</h4>
					<p>{subtitle}</p>
					<span className={styles.tagPurple}>تصنيف: {category}</span>
				</div>
			</div>
		</Link>
	)
}

export default Card;