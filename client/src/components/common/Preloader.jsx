import React from 'react';
import preloaderSVG from '../../assets/images/preloader.svg';

const Preloader = () => {
	
	return (<div className={'text-center'}>
		<img src={preloaderSVG} alt="loading"/>
		</div>);
}

export default Preloader;