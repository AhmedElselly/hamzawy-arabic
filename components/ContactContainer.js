import styles from '../styles/ContactContainer.module.css';
import OurMap from './OurMap';

const Container = props => {
	return(
		<div className={styles.container}>
			{/* <div className={styles.left}></div> */}
			<OurMap/>
			<div className={styles.right}>
				{props.children}
			</div>
		</div>
	)
}

export default Container;