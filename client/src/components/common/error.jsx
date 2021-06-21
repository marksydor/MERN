import React from 'react';

export const ErrorDiv = (props) => {
	return (<div className={'alert alert-danger mt-1 mb-0'} role={'alert'}>
			{props.text}
		</div>);
}