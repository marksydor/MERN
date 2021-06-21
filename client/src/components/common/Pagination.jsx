import React from 'react';
import { BiLeftArrowCircle, BiRightArrowCircle } from 'react-icons/bi'

const Pagination = (props) => {
	console.log(props);

	let pagesItems = props.pages.map(p => {
		if (props.currentPage === p)
			return (<li className="page-item active text-dark" onClick={ (e) => { props.onPageChange(p); }}><span className={'page-link'}>{p}</span></li>)
		return (<li className="page-item page-link text-dark" onClick={ (e) => { props.onPageChange(p); }}>{p}</li>)
	})


	return (<nav className="mt-3">
				<ul className="pagination justify-content-center">
					{ props.currentPage > 1 &&
					<li className="page-item ">
						<span 
						className={"page-link text-dark true"}
						onClick={(e) => { props.onPageChange(props.currentPage-1)} }
						><BiLeftArrowCircle /></span>
					</li>
					}
					{ props.currentPage > 3 && pagesItems[props.currentPage-4] }
					{ props.currentPage > 1 && pagesItems[props.currentPage-2] }
					{ pagesItems[props.currentPage-1] }
					{ props.currentPage < pagesItems.length && pagesItems[props.currentPage] }
					{ props.currentPage + 2 < pagesItems.length && pagesItems[props.currentPage+2] }
					{ props.currentPage < pagesItems.length &&
					<li className="page-item ">
						<span 
						className={"page-link text-dark true"}
						onClick={(e) => { props.onPageChange(props.currentPage+1)} }
						><BiRightArrowCircle /></span>
					</li>
					}
				</ul>
			</nav>
			)
}

export default Pagination;
