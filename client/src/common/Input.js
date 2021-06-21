import React from 'react';

export const Input = ({input, meta, ...props}) => {
	const hasError = meta.touched && meta.error;
	return (<div>
			<input {...input} {...props} className={hasError ? props.className + ' is-invalid' : props.className} />
			{hasError && <p className={'card-text text-danger'}>{meta.error}</p>}
		</div>)
}