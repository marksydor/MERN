import React from 'react';
import s from './auth.module.css';
import {reduxForm, Field} from 'redux-form';
import {required, maxLengthCreator, minLengthCreator} from '../../utilits/validators.js';
import {Input} from '../../common/Input.js'
import {NavLink} from 'react-router-dom'
import {ErrorDiv} from '../common/error.jsx'

const maxLength32 = maxLengthCreator(32);
const minLength8 = minLengthCreator(8);

const SignupForm = (props) => {
	return (
		<form onSubmit={props.handleSubmit}>
			<div className={'mb-3'}>
				<label htmlFor={'FormControlInput4'} className={'form-label  text-primary'}>Вашe ім'я</label>
				<Field name={'firstName'} component={Input} 
						type={'text'} className={'form-control'}
						id={'FormControlInput4'} placeholder={'ім\'я'} 
						validate={[required, maxLength32]}/>
				<label htmlFor={'FormControlInput5'} className={'form-label  text-primary'}>Ваше прізвище</label>
				<Field name={'lastName'} component={Input} 
						type={'text'} className={'form-control'}
						id={'FormControlInput5'} placeholder={'прізвище'} 
						validate={[required, maxLength32]}/>
				<label htmlFor={'FormControlInput1'} className={'form-label  text-primary'}>Ваш емейл</label>
				<Field name={'email'} component={Input} 
						type={'email'} className={'form-control'}
						id={'FormControlInput1'} placeholder={'name@example.com'} 
						validate={[required, maxLength32]}/>
				 <p className={'card-text'}>Ми надішлемо на нього лист для підтвердження вашої почти</p>
			</div>
			<div className={'mb-3'}>
				<label htmlFor={'FormControlInput2'} className={'form-label  text-primary'}>Придумайте пароль</label>
				<Field name={'password'} component={Input}
						type={'password'} className={'form-control'}
						id={'FormControlInput2'} placeholder={'пароль'}
						validate={[required, maxLength32, minLength8]} />
				<p className={'card-text'}>Пароль має бути надійним</p>
			</div>
			<div className={'mb-3'}>
				<label htmlFor={'FormControlInput3'} className={'form-label text-primary'}>Підтвердіть пароль</label>
				<Field name={'confirmPassword'} component={Input}
						type={'password'} className={'form-control'}
						id={'FormControlInput3'} placeholder={'підтвердження паролю'}
						validate={[required, maxLength32, minLength8]} />
			</div>
			<div className={'row justify-content-around'}>
				<div className={'col-6'}>
					<NavLink to="/signin" className={'btn btn-outline-danger w-100'}>У мене вже є аккаунт</NavLink>
				</div>
				<div className={'col-6'}>
					<button type='submit' className={'btn btn-success w-100'}>Зараєструватись</button>
				</div>
			</div>
		</form>)
}

const SignupFormRedux = reduxForm({ form: 'signup' })(SignupForm);

const Signup = (props) => {
	
	const onSubmit = (formData) => {
		props.OnSubmit(formData);
	}

	return (<section className={'container-md'}>
		<div className={'alert alert-danger mt-1 mb-0'} role={'alert'}>
			A simple danger alert—check it out!
		</div>
		<div className= {'card border-dark mb-6 mt-2 ' + s.mainform}>
			<div className={'card-header'}>Реєстрація</div>
			<div className={'card-body text-dark'}>
				<SignupFormRedux onSubmit={onSubmit}/>
			</div>
		</div>
	</section>)
}

export default Signup;