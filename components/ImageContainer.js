import styles from '../styles/ImageContainer.module.css';


const ImageContainer = ({image, title}) => {
	return(
		<div className={styles.container}>
			<img className={styles.img} src={image} alt={title} />
		</div>
	)
}

export default ImageContainer;