import React from 'react';

import PostItem from '../common/PostItem.jsx';

import AddPost from '../common/AddPost.js';
import Pagination from '../common/Pagination.jsx';
import Preloader from '../common/Preloader';


const News = (props) => {

	// return <div>1</div>

	let pagesCount = Math.ceil(props.totalPostsCount / props.pageSize);

	let pages = [];
	for(let i = 0; i < pagesCount; i++) {
		pages.push(i+1);
	}

	let PostsItems = props.posts.map((p, i) => {
		console.log(p);
		return <PostItem avatar={p.avatar} img={p.photoURL} userName={p.userName} 
			text={p.text} date={p.date} commetnsCount={0} likesCount={0}/>
	})

	return (<section className={'container-md mt-3'}>
			<AddPost newsItemImg={'https://tv.ua/i/94/28/77/942877/91a8a7c63306682ae8946c451b265330-quality_50Xresize_crop_1Xallow_enlarge_0Xw_500Xh_500.jpg'}/>
			<Pagination pages={pages} onPageChange={props.onPageChange} currentPage={props.currentPage}/>
			{ props.isFetching && pagesCount < 1 ? <Preloader /> : null}
			{ PostsItems }
		</section>)
}

export default News;
