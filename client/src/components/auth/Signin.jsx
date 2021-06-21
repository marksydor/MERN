import React from 'react';
import s from './auth.module.css';
import {reduxForm, Field} from 'redux-form';
import {required, maxLengthCreator, minLengthCreator} from '../../utilits/validators.js';
import {Input} from '../../common/Input.js';
import {NavLink, Redirect} from 'react-router-dom';
import {ErrorDiv} from '../common/error.jsx'

const maxLength32 = maxLengthCreator(32);
const minLength8 = minLengthCreator(8);

const LoadingButton = (props) => {
	return (
		<button type={'submit'} className={'btn btn-success w-100'}>
			<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
			{props.text}
		</button>)
}

const SigninForm = (props) => {
	return (
		<form onSubmit={props.handleSubmit}>
			<div className={'mb-3'}>
				<label for={'exampleFormControlInput1'} className={'form-label  text-primary'}>Your Mail</label>
				<Field name={'email'} component={Input} 
						type={'email'} className={'form-control'}
						id={'FormControlInput1'} placeholder={'name@example.com'} 
						validate={[required, maxLength32]}/>
				<p className={'card-text'}>Only confirmed</p>
			</div>
			<div className={'mb-3'}>
				<label for={'exampleFormControlInput1'} className={'form-label  text-primary'}>Your Password</label>
				<Field name={'password'} component={Input}
						type={'password'} className={'form-control'}
						id={'FormControlInput2'} placeholder={'пароль'}
						validate={[required, maxLength32, minLength8]} />
				<p className={'card-text'}>specified at registration</p>
			</div>
			<div className={'row justify-content-around'}>
				<div className={'col-8 mb-2'}>
					{ props.isFetching ? <LoadingButton text='Загрузка...'/> : <button type={'submit'} className={'btn btn-success w-100'}>ОК</button>}
						
				</div>
			</div>
			<div className={'row justify-content-around'}>
				<div className={'col-6'}>
					<NavLink to="/forgot" className={'btn btn-outline-danger w-100'}>Forgot your password?</NavLink>
				</div>
				<div className={'col-6'}>
					<NavLink to="/signup" className={'btn btn-primary w-100'}>No account?</NavLink>
				</div>
			</div>		
		</form>
		)
}

const SigninFormRedux = reduxForm({ form: 'signin' })(SigninForm);

const Signin = (props) => {
	const onSubmit = (formData) => {
		props.OnSubmit(formData);
	}

	if (props.isAuth) {
		return <Redirect to='/home' />
	}

	return (
	<section className={'container-md'}>
		{props.error && <ErrorDiv text={props.error} />}
		<div className= {'card border-dark mb-6 mt-5 ' + s.mainform}>
			<div className={'card-header'}>Signin</div>
			<div className={'card-body text-dark'}>
				<SigninFormRedux onSubmit={onSubmit} isFetching={props.isFetching}/>
			</div>
		</div>
	</section>)
}

export default Signin;