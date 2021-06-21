import React from 'react';
import s from './auth.module.css';
import {reduxForm, Field} from 'redux-form';
import {required, maxLengthCreator, minLengthCreator} from '../../utilits/validators.js';
import {Input} from '../../common/Input.js'
import {NavLink} from 'react-router-dom'

const maxLength32 = maxLengthCreator(32);
const minLength8 = minLengthCreator(8);

const ForgotForm = (props) => {
	return (
		<form>
			<div class="card-header">Відновлення паролю</div>
			<div class="card-body text-dark">
				<div class="mb-3">
					<label for="exampleFormControlInput1" class="form-label  text-primary">Вкажіть ваш емейл</label>
					<input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
					 <p class="card-text">Ми надішлемо на нього лист з інструкцією щодо відновлення</p>
				</div>
				<div className={'row justify-content-around'}>
					<div className={'col-8 mb-2'}>
							<button type={'submit'} className={'btn btn-success w-100'}>Підтвердити</button>
					</div>
				</div>
				<div className={'row justify-content-around'}>
					<div className={'col-6'}>
						<NavLink to="/signin" className={'btn btn-outline-danger w-100'}>На сторінку входу</NavLink>
					</div>
					<div className={'col-6'}>
						<NavLink to="/signup" className={'btn btn-primary w-100'}>Немає аккаунту?</NavLink>
					</div>
				</div>
			</div>
		</form>
		)
}

const ForgotFormRedux = reduxForm({ form: 'forgot' })(ForgotForm);

const Forgot = (props) => {
	return (<section class="container-md">
		<div class= {"card border-dark mb-6 mt-5 " + s.mainform}>
			<ForgotFormRedux />
		</div>
	</section>)
}

export default Forgot;