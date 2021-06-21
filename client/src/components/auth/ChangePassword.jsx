import React from 'react';
import s from './auth.module.css';


const ChangePassword = (props) => {
	return (<section class="container-md">
		<div class= {"card border-dark mb-6 mt-5 " + s.mainform}>
			<div class="card-header">Вкажіть новий пароль</div>
			<div class="card-body text-dark">
				<div class="mb-3">
					<label for="exampleFormControlInput1" class="form-label  text-primary">Вкажіть ваш емейл</label>
					<input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
					 <p class="card-text">Який ви вказували при реєстрації</p>
				</div>
				<div class="mb-3">
					<label for="exampleFormControlInput1" class="form-label  text-primary">Придумайте новий пароль</label>
					<input type="password" class="form-control" id="exampleFormControlInput1" placeholder="пароль"/>
					<p class="card-text">Пароль має бути надійним</p>
				</div>
				<div class="mb-3">
					<label for="exampleFormControlInput1" class="form-label">Підтвердіть пароль</label>
					<input type="password" class="form-control" id="exampleFormControlInput1" placeholder="підтвердження паролю"/>
				</div>
				<div class="row justify-content-around">
					<div class="col-5">
						<button type="button" class="btn btn-primary w-100">Підтвердити</button>
					</div>
				</div>
			</div>
		</div>
	</section>)
}

export default ChangePassword;