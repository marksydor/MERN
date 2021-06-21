import React, {useState, useEffect} from 'react';
import s from './Article.module.css';


const ArticleSection = (props) => {

	if (!props.img && !props.title && !props.text)
		return (null);
	return(<div className={`${s.SectionDiv}`}>
		{ (props.title && props.titlePosition == 'Top') && <h5 className="display-6 text-center">{props.title}</h5> }
		{ (props.img && props.imgType == 'Left') && <img src={props.img} className={`rounded ${s.intextImg} ${s.fLeft}`} alt="..."/> }
		{ (props.img && props.imgType == 'Right') && <img src={props.img} className={`rounded ${s.intextImg} ${s.fRight}`} alt="..."/> }
		{ (props.img && props.imgType == 'Wrapper') && <img src={props.img} className={`rounded ${s.wideImg}`} alt="..."/> }
		{ (props.title && props.titlePosition == 'Text') && <h5 className="display-6 text-center">{props.title}</h5> }
	<p>
		{ props.text && props.text }
	</p></div>)
}


const ArticleProcessor = (props) => {
	const Sections = props.sections.map(s => <ArticleSection {...s} />)

	return (
		<section className={'container-md mt-1'}>
			<div className="card border-dark m-1 w-100">
				<div className="card-header">{`${props.name} ${props.author}`}</div>
				<div className="card-body text-dark">
					{ props.wrapper.img &&
					<div className="card bg-dark text-white">
						<div className={`${s.crap}`}><img src={props.wrapper.img} className={`card-img ${s.wrapperImg}`} alt="..."/></div>
						<div className="card-img-overlay scroll">
						  <h4 className="card-title display-4">{props.wrapper.title}</h4>
						  <p className="card-text fs-5">{props.wrapper.description}</p>
						</div>
					</div>
					}
				</div>
				<div className="card-body text-dark">
					<h5 className="display-5 ms-4">{props.firstTitle}</h5>
					<p className="fst-italic fs-5 m-3">{props.firstDescription}</p>
					{ Sections }
				</div>
			</div>
		</section>)
}

const InitialArticleData = {
	name: '',
	author: '',
	wrapper: {img: '', title: '', description: ''},
	firstTitle: '',
	firstDescription: '',
	sections: [
		{img: null, imgType: 'Left', title: '', titlePosition: 'Top', text: ''}
	],
	file: undefined
}

const ArticleEditor = (props) => {
	const [articleState, setAticleState] = useState(InitialArticleData);

	const [wrapperImg, setWrapperImg] = useState();
	const [preview, setPreview] = useState();

	const [articaleName, setArticaleName] = useState();
	const [articaleWrapperTitle, setArticaleWrapperTitle] =  useState();
	const [articaleWrapperDecription, setArticaleWrapperDecription] =  useState();
	const [articaleMainTitle, setArticaleMainTitle] =  useState();
	const [articaleMainDecription, setArticaleMainDecription] =  useState();

	const [addSection, setAddSection] = useState();
	const [addSectionMode, setAddSectionMode] = useState(false);
	const [sectionTitle, setSectionTitle] = useState();
	const [sectionText, setSectionText] = useState();
	const [sectionImg, setSectionImg] = useState();
	const [sectionImgPreview, setSectionImgpPeview] = useState();

	
	const [sectionTitlePosition, setSectionTitlePosition] = useState('Top');
	const [sectionImgPosition, setSectionImgPosition] = useState('Left');


	const articaleNameChangeHandler = (e) => {
		setArticaleName(e.currentTarget.value);
		setAticleState({...articleState, name: articaleName});
	}

	const articaleWrapperTitleChangeHandler = (e) => {
		setArticaleWrapperTitle(e.currentTarget.value);
		setAticleState({...articleState, wrapper: {...articleState.wrapper, title: articaleWrapperTitle}});
	}

	const articaleWrapperDecriptionChangeHandler = (e) => {
		setArticaleWrapperDecription(e.currentTarget.value);
		setAticleState({...articleState, wrapper: {...articleState.wrapper, description: articaleWrapperDecription}});
	}

	const articaleMainTitleChangeHandler = (e) => {
		setArticaleMainTitle(e.currentTarget.value);
		setAticleState({...articleState, firstTitle: articaleMainTitle});
	}

	const articaleMainDecriptionChangeHandler = (e) => {
		setArticaleMainDecription(e.currentTarget.value);
		setAticleState({...articleState, firstDescription: articaleMainDecription});
	}

	const sectionImgPositionChangeHandler = (e) => {
		console.log(articleState);
		console.log('---');
		setSectionImgPosition(e.currentTarget.value);
		const copy1 = {...articleState};
		const copy2 = [...copy1.sections];
		copy2[copy2.length-1] = {...copy2[copy2.length-1], imgType: sectionImgPosition};
		setAticleState({...articleState, sections: copy2});
		console.log(articleState);
	}

	const sectionTitlePositionChangeHandler = (e) => {
		setSectionTitlePosition(e.currentTarget.value);
		const copy1 = {...articleState};
		const copy2 = [...copy1.sections];
		copy2[copy2.length-1] = {...copy2[copy2.length-1], titlePosition: sectionTitlePosition};
		setAticleState({...articleState, sections: copy2});
	}

	const sectionTitleChangeHandler = (e) => {
		setSectionTitle(e.currentTarget.value);
		const copy1 = {...articleState};
		const copy2 = [...copy1.sections];
		copy2[copy2.length-1] = {...copy2[copy2.length-1], title: sectionTitle};
		setAticleState({...articleState, sections: copy2});
	}

	const sectionTextChangeHandler = (e) => {
		setSectionText(e.currentTarget.value);
		const copy1 = {...articleState};
		const copy2 = [...copy1.sections];
		copy2[copy2.length-1] = {...copy2[copy2.length-1], text: sectionText};
		setAticleState({...articleState, sections: copy2});
	}

	useEffect(() => {
		 if (!wrapperImg) {
		 	setPreview(undefined)
		 	return
		 }

		 const objectUrl = URL.createObjectURL(wrapperImg)
		 setPreview(objectUrl)
		 setAticleState({...articleState, wrapper: {...articleState.wrapper, img:objectUrl}});
		 // free memory when ever this component is unmounted
		 return () => URL.revokeObjectURL(objectUrl)
    }, [wrapperImg])

	const changeHandler = (e) => {
		setWrapperImg(e.target.files[0]);
		setAticleState({...articleState, file: e.target.files[0]});
	}

	useEffect(() => {
		if (!sectionImg) {
			setPreview(undefined)
			return
		}

		const objectUrl = URL.createObjectURL(sectionImg)
		setSectionImgpPeview(objectUrl)
		const copy1 = {...articleState};
		const copy2 = [...copy1.sections];
		copy2[copy2.length-1] = {...copy2[copy2.length-1], img: objectUrl};
		setAticleState({...articleState, sections: copy2});
		// free memory when ever this component is unmounted
		return () => URL.revokeObjectURL(objectUrl)
    }, [sectionImg])

	const SectionImgChangeHandler = (e) => {
		setSectionImg(e.target.files[0]);
		const copy1 = {...articleState};
		const copy2 = [...copy1.sections];
		copy2[copy2.length-1] = {...copy2[copy2.length-1], file: e.target.files[0]};
		setAticleState({...articleState, sections: copy2});
	}

	const ActivateaddSectionMode = () => {
		setAddSectionMode(true);
	}

	const options1 = [
		{value: 'Left', label: 'Зліва'}, 
		{value: 'Right', label: 'Зправа'}, 
		{value: 'Wrapper', label: 'Розгорнуто'}];
	const options2 = [
		{value: 'Text', label: 'У Тексті'}, 
		{value: 'Top', label: 'Зверху'}];

	return (
		<div>
			<section className={'container-md mt-1 w720'}>
			<div className="card border-dark m-1">
				<div className="card-header bg-secondary">Редактор Статтей</div>
				<div className="card-body text-dark"></div>
					<div className="mbt-3 p-3">
						<label htmlFor="inputPassword5" className="form-label">Назва Статті</label>
						<input value={articaleName} type="text" id="inputPassword5" className="form-control" aria-describedby="passwordHelpBlock"
						onChange={articaleNameChangeHandler}/>
						<label htmlFor="formFile" className="form-label">Виберіть файл для Обгортки</label>
						<input className="form-control" type="file" id="formFile" onChange={changeHandler}/>
						<label htmlFor="inputPassword5" className="form-label">Заголовок На обгортці</label>
						<input value={articaleWrapperTitle} type="text" id="inputPassword5" className="form-control" aria-describedby="passwordHelpBlock"
						onChange={articaleWrapperTitleChangeHandler}/>
  						<label htmlFor="floatingTextarea2">Опис На обгортці</label>
						<textarea value={articaleWrapperDecription} className="form-control" placeholder="Leave a comment here" id="floatingTextarea2"
						onChange={articaleWrapperDecriptionChangeHandler}/>
						<label htmlFor="inputPassword5" className="form-label">Головний Заголовок</label>
						<input value={articaleMainTitle} type="text" id="inputPassword5" className="form-control" aria-describedby="passwordHelpBlock"
						onChange={articaleMainTitleChangeHandler}/>
  						<label htmlFor="floatingTextarea2">Передмова до тексту</label>
						<textarea value={articaleMainDecription} className="form-control mb-3" placeholder="Leave a comment here" id="floatingTextarea2"
						onChange={articaleMainDecriptionChangeHandler}/>
						{ !addSectionMode &&
							<button type="button" onClick={ActivateaddSectionMode} className="btn btn-secondary mb-3">Додати Секцію</button>
						}
						{ addSectionMode &&
							<h4>Редактор Розділів</h4>
						}
						{ addSectionMode &&
							<div>
								<div className="row g-2 mb-3">
									<div className="col-md">
										<label htmlFor="formFile" className="form-label">Додайте фото</label>
										<input className="form-control" type="file" id="formFile" onChange={SectionImgChangeHandler}/>
									</div>
									<div className="col-md">
										<div className="form-floating">
											<select defaultValue='Left' className="form-select" id="floatingSelectGrid" aria-label="Floating label select example" value={sectionImgPosition} onChange={sectionImgPositionChangeHandler}>
												{options1.map((option) => (
			 										<option value={option.value}>{option.label}</option>
												))}
											</select>
											<label htmlFor="floatingSelectGrid">Розміщення</label>
										</div>
									</div>
								</div>
								<div className="row g-2 mb-3">
									<div className="col-md">
										<div className="form-floating">
											<input type="text" className="form-control" id="floatingInputGrid" onChange={sectionTitleChangeHandler} value={sectionTitle}/>
											<label htmlFor="floatingInputGrid">Заголовок Розділу</label>
										</div>
									</div>
									<div className="col-md">
										<div className="form-floating">
											<select defaultValue='Top' className="form-select" id="floatingSelectGrid" aria-label="Floating label select example" value={sectionTitlePosition} onChange={sectionTitlePositionChangeHandler}>
												{options2.map((option) => (
			 										<option value={option.value}>{option.label}</option>
												))}
											</select>
											<label htmlFor="floatingSelectGrid">Розміщення</label>
										</div>
									</div>
								</div>
								<label htmlFor="floatingTextarea2">Текст розділу</label>
								<textarea value={sectionText} className="form-control mb-3" placeholder="Leave a comment here" id="floatingTextarea22" onChange={sectionTextChangeHandler}/>
								<div className="btn-group p-1 w-100" role="group">
									<button type="button" className={"btn btn-success"}>Зберегти</button>
									<button type="button" className={"btn btn-danger"}>Відмінити</button>
								</div>
							</div>
						}
					</div>
				</div>
			</section>
			<ArticleProcessor {...articleState} />
		</div>
		)
}

const Article = (props) => {
	const ArticleData = {
		name: 'måneskin',
		author: 'вікторія де анджеліс',
		wrapper: {img: 'https://img07.rl0.ru/afisha/e1200x600i/daily.afisha.ru/uploads/images/2/60/2608c178a3ba9c4e1dd3e0fe44ebf6af.jpg',
			title: 'Måneskin', description: `італійський рок-гурт з Риму, до складу якого входять вокаліст Дам'яно Давід, басистка Вікторія де Анджеліс, гітарист Томас Раджі та барабанщик Ітан Торкіо[3]. Гурт здобув популярність після того, як посів друге місце в одинадцятому сезоні італійського шоу талантів «X Factor» 2017 року`},
		firstTitle: 'Історія',
		firstDescription: `Учасники гурту вперше зустрілися як учні середньої школи в Монтеверде, Рим. Вони вирішили створити колектив у 2016 році[7][8]. Назву гурту було обрано, коли їм довелося зареєструватися в місцевому музичному конкурсі для нових гуртів «Pulse»[9]. Під час мозкового штурму Де Анджеліс, яка є наполовину данкою, її колеги по гурту попросили сказати кілька датських слів, і вони домовились про «måneskin» (місячне світло), хоча його значення не пов'язане із самим колективом[10]. Конкурс «Pulse» також став поворотним пунктом у їхній кар'єрі, оскільки їм довелося почати писати власні пісні. Змагання призвели їх до виступу в музичному клубі та школі Felt, а згодом вони виграли першу нагороду`,
		sections: [
			{img: `https://upload.wikimedia.org/wikipedia/commons/8/81/Victoria_De_Angelis_2018.jpg`, imgType: 'Left', title: 'Вікторія де Анджеліс', titlePosition: 'Top', text: `Вікторія Де Анджеліс народилася 28 квітня 2000 року в Римі. Вікторія почала грати на гітарі у віці восьми років і відвідувала музичну школу в середній школі, де вона почала грати на бас-гітарі у віці одинадцяти років.[3] Вона відвідувала наукову середню школу ім. Дж. Ф. Кеннеді, де познайомилася з гітаристом Томасом Раджі; У 2015 році вони разом зі співаком Дам'яно Давідом заснували групу Måneskin. Назва групи походить з данської мови й означає «місячне сяйво». З чуток, саме Вікторія розмістила оголошення про створення групи на шкільній дошці оголошень.`},
			{img: `https://upload.wikimedia.org/wikipedia/commons/8/81/Victoria_De_Angelis_2018.jpg`, imgType: 'Right', title: 'Вікторія де Анджеліс', titlePosition: 'Text', text: `Вікторія Де Анджеліс народилася 28 квітня 2000 року в Римі. Вікторія почала грати на гітарі у віці восьми років і відвідувала музичну школу в середній школі, де вона почала грати на бас-гітарі у віці одинадцяти років.[3] Вона відвідувала наукову середню школу ім. Дж. Ф. Кеннеді, де познайомилася з гітаристом Томасом Раджі; У 2015 році вони разом зі співаком Дам'яно Давідом заснували групу Måneskin. Назва групи походить з данської мови й означає «місячне сяйво». З чуток, саме Вікторія розмістила оголошення про створення групи на шкільній дошці оголошень.`},
			{img: `https://upload.wikimedia.org/wikipedia/commons/8/81/Victoria_De_Angelis_2018.jpg`, imgType: 'Wrapper', title: 'Вікторія де Анджеліс', titlePosition: 'Top', text: `Вікторія Де Анджеліс народилася 28 квітня 2000 року в Римі. Вікторія почала грати на гітарі у віці восьми років і відвідувала музичну школу в середній школі, де вона почала грати на бас-гітарі у віці одинадцяти років.[3] Вона відвідувала наукову середню школу ім. Дж. Ф. Кеннеді, де познайомилася з гітаристом Томасом Раджі; У 2015 році вони разом зі співаком Дам'яно Давідом заснували групу Måneskin. Назва групи походить з данської мови й означає «місячне сяйво». З чуток, саме Вікторія розмістила оголошення про створення групи на шкільній дошці оголошень.`},
			{img: null, imgType: 'Wrapper', title: 'Вікторія де Анджеліс', titlePosition: 'Top', text: `Вікторія Де Анджеліс народилася 28 квітня 2000 року в Римі. Вікторія почала грати на гітарі у віці восьми років і відвідувала музичну школу в середній школі, де вона почала грати на бас-гітарі у віці одинадцяти років.[3] Вона відвідувала наукову середню школу ім. Дж. Ф. Кеннеді, де познайомилася з гітаристом Томасом Раджі; У 2015 році вони разом зі співаком Дам'яно Давідом заснували групу Måneskin. Назва групи походить з данської мови й означає «місячне сяйво». З чуток, саме Вікторія розмістила оголошення про створення групи на шкільній дошці оголошень.`},
			{img: null, imgType: 'Wrapper', title: null, titlePosition: 'Top', text: `Вікторія Де Анджеліс народилася 28 квітня 2000 року в Римі. Вікторія почала грати на гітарі у віці восьми років і відвідувала музичну школу в середній школі, де вона почала грати на бас-гітарі у віці одинадцяти років.[3] Вона відвідувала наукову середню школу ім. Дж. Ф. Кеннеді, де познайомилася з гітаристом Томасом Раджі; У 2015 році вони разом зі співаком Дам'яно Давідом заснували групу Måneskin. Назва групи походить з данської мови й означає «місячне сяйво». З чуток, саме Вікторія розмістила оголошення про створення групи на шкільній дошці оголошень.`},
			{img: null, imgType: 'Wrapper', title: null, titlePosition: 'Top', text: null}

		]
	}

	return (<ArticleEditor {...ArticleData} />)
}

export default Article;