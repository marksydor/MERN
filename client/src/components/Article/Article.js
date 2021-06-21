import React from 'react';
import s from './Article.module.css';


const ArticleSection = (props) => {
	if (!props.img && !props.title && !props.text)
		return (null);

	return(<div className={`${s.SectionDiv}`}><p>
		{ (props.title && props.titlePosition == 'Top') && <h5 className="display-6 text-center">{props.title}</h5> }
		{ (props.img && props.imgType == 'Left') && <img src={props.img} className={`rounded ${s.intextImg} ${s.fLeft}`} alt="..."/> }
		{ (props.img && props.imgType == 'Right') && <img src={props.img} className={`rounded ${s.intextImg} ${s.fRight}`} alt="..."/> }
		{ (props.img && props.imgType == 'Wrapper') && <img src={props.img} className={`rounded ${s.wideImg}`} alt="..."/> }
		{ (props.title && props.titlePosition == 'Text') && <h5 className="display-6 text-center">{props.title}</h5> }
		{ props.text && props.text }
	</p></div>)
}


const ArticleProcessor = (props) => {
	const Sections = props.sections.map(s => <ArticleSection {...s} />)

	return (
		<section className={'container-md mt-1 w720'}>
			<div className="card border-dark m-1 ">
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
		{img: null, imgType: '', title: '', titlePosition: '', text: ''}
	]
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

	return (<ArticleProcessor {...ArticleData} />)
}

export default Article;