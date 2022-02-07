import { useState, useEffect, useRef } from 'react';
// import Map from 'react-map-gl';
import mapboxgl from '!mapbox-gl'; 
import styles from '../styles/OurMap.module.css';

const OurMap = props => {
	// const [viewPort, setViewPort] = useState([30.07945934911026, 31.19682703749743]);
	const mapContainer = useRef();
	const map = useRef(null);

	const [lat, setLat] = useState(30.07945934911026);
	const [lng, setLng] = useState(31.19682703749743);
	const [zoom, setZoom] = useState(15);
	mapboxgl.accessToken = 'pk.eyJ1IjoiYWhtZWRlbHNlbGx5IiwiYSI6ImNremNpaHFuajBjdnMyc3JzZ3NmMHJ5MXYifQ.WBFKO6gqPbc3I9DRYnNVRg';

	useEffect(() => {
		if (map.current) return; // initialize map only once
		map.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: 'mapbox://styles/mapbox/streets-v11',
			center: [lng, lat],
			zoom: zoom
		});
		const marker = new mapboxgl.Marker()
			.setLngLat([lng, lat])
			.addTo(map.current);
	});

	return(
		<div>
			<div ref={mapContainer} className={styles.mapContainer} />
		</div>
	)
}

export default OurMap;