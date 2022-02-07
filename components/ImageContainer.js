import styles from '../styles/ImageContainer.module.css';
import Image from 'next/image';

const ImageContainer = ({image, title}) => {
	return(
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<Image layout='responsive' width={50} height={50} src={image} alt={title} />
			</div>
		</div>
	)
}

export default ImageContainer;