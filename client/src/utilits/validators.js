export const required = (value) => {
	if (value)
		return (undefined);
	return "Поле не може залишатись пустим";
}

export const maxLengthCreator = (maxLength) => (value) => {
	if (value && value.length > maxLength)
		return (`Макисимальна довжина поля ${maxLength}`);
	return (undefined);
}

export const minLengthCreator = (minLength) => (value) => {
	if (value && value.length < minLength)
		return (`Мінімальна довжина поля ${minLength}`);
	return (undefined);
}