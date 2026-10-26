/* =====================================================================================
   ISA ACADEMY (ISA International) — адаптивный сайт языковой школы в Оше
   ===================================================================================== */

import React, { useState, useEffect, useMemo, useRef, useCallback, useId, createContext, useContext } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

/* ============================== ИКОНКИ ============================== */
const Svg = ({ children, size = 20, filled = false, ...rest }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    aria-hidden="true" focusable="false" {...rest}>{children}</svg>
);
const IcSearch = (p: any) => <Svg {...p}><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></Svg>;
const IcMenu = (p: any) => <Svg {...p}><path d="M4 7h16M4 12h16M4 17h16" /></Svg>;
const IcX = (p: any) => <Svg {...p}><path d="M18 6 6 18M6 6l12 12" /></Svg>;
const IcPhone = (p: any) => <Svg {...p}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.1 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.6 1.9Z" /></Svg>;
const IcPin = (p: any) => <Svg {...p}><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></Svg>;
const IcClock = (p: any) => <Svg {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Svg>;
const IcStar = (p: any) => <Svg filled {...p}><path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1Z" /></Svg>;
const IcCheck = (p: any) => <Svg {...p}><path d="m4 12.5 5 5L20 6.5" /></Svg>;
const IcChevron = (p: any) => <Svg {...p}><path d="m6 9 6 6 6-6" /></Svg>;
const IcArrow = (p: any) => <Svg {...p}><path d="M5 12h14M13 6l6 6-6 6" /></Svg>;
const IcBack = (p: any) => <Svg {...p}><path d="M19 12H5M11 18l-6-6 6-6" /></Svg>;
const IcCopy = (p: any) => <Svg {...p}><rect x="9" y="9" width="12" height="12" rx="2" /><path d="M5 15V5a2 2 0 0 1 2-2h10" /></Svg>;
const IcLink = (p: any) => <Svg {...p}><path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7" /><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7" /></Svg>;
const IcFilter = (p: any) => <Svg {...p}><path d="M4 6h16M7 12h10M10 18h4" /></Svg>;
const IcSun = (p: any) => <Svg {...p}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></Svg>;
const IcMoon = (p: any) => <Svg {...p}><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" /></Svg>;
const IcUsers = (p: any) => <Svg {...p}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" /></Svg>;
const IcAward = (p: any) => <Svg {...p}><circle cx="12" cy="8" r="6" /><path d="M15.5 13 17 22l-5-3-5 3 1.5-9" /></Svg>;
const IcWallet = (p: any) => <Svg {...p}><path d="M20 7H4a2 2 0 0 1 0-4h14v4" /><path d="M4 7v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2" /><path d="M17 13h.01" /></Svg>;
const IcChat = (p: any) => <Svg {...p}><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-3.8-.8L3 20l1-4.9A8.4 8.4 0 1 1 21 11.5Z" /></Svg>;
const IcInsta = (p: any) => <Svg {...p}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></Svg>;
const IcSend = (p: any) => <Svg {...p}><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></Svg>;
const IcGlobe = (p: any) => <Svg {...p}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18Z" /></Svg>;
const IcSpark = (p: any) => <Svg {...p}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" /></Svg>;
const IcInfo = (p: any) => <Svg {...p}><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></Svg>;
const IcQuote = (p: any) => <Svg filled {...p}><path d="M10 8c-3 0-5 2.2-5 5.3 0 2 1.4 3.7 3.4 3.7 1.8 0 3.1-1.3 3.1-3 0-1.6-1.1-2.8-2.7-2.9.3-1 1.2-1.7 2.2-1.9Zm9 0c-3 0-5 2.2-5 5.3 0 2 1.4 3.7 3.4 3.7 1.8 0 3.1-1.3 3.1-3 0-1.6-1.1-2.8-2.7-2.9.3-1 1.2-1.7 2.2-1.9Z" /></Svg>;

/* ============================== КОНФИГ ============================== */
const SITE = {
  name: 'Isa Academy', brand: 'ISA International', tagline: 'Образовательный центр в Оше',
  city: 'Ош, Кыргызстан', address: 'г. Ош, ул. Ташкентская, 28/1, 2 этаж',
  phone: '+996 707-18-20-03', phoneHref: 'tel:+996707182003',
  whatsapp: 'https://wa.me/996707182003',
  instagram: 'https://instagram.com/isa__academy', instagramHandle: '@isa__academy',
  gis: 'https://2gis.kg/osh/search/Isa%20Academy',
  rating: 5.0, ratingsCount: 30, reviewsCount: 25,
  hours: 'Пн–Сб: 9:00–19:00, Вс — выходной (демо-данные)',
  payments: ['Банковская карта', 'Наличные', 'Банковский перевод', 'Перевод с карты', 'QR-код'],
  landmarks: [
    'Сквер имени Барпы Алыкулова — около 300 м',
    'Пересечение ул. Насирдина Исанова и Ташкентской — около 350 м',
    'Школа-гимназия №2 им. Салижана Жигитова — около 600 м',
  ],
};

/* ============================== ИСТОЧНИКИ ============================== */
const SOURCES = [
  {
    id: 'src-01', slug: 'english-adults', title: 'Английский для взрослых: уровни A0–C1',
    description: 'Программа английского для взрослых: уровни с A0 до C1, малые группы, речь с первого занятия.',
    category: 'Курсы', tags: ['английский', 'взрослые', 'уровни', 'говорение'], type: 'md', date: '2025-05-12', featured: true,
    content: `Английский для взрослых — основная программа школы. Берём с нуля (A0) и доводим до уверенного C1: каждый уровень — отдельный модуль длительностью 3 месяца (демо-данные).

Занятия проходят 2 раза в неделю по 90 академических минут (демо). Около 70% времени урока — разговорная практика: парная работа, дискуссии, ситуативные диалоги. Грамматика даётся не как отдельный предмет, а как инструмент для речи (демо-методика).

Уровни: A0 (с нуля), A1 (начальный), A2 (базовый), B1 (средний), B2 (выше среднего), C1 (продвинутый). Перед зачислением — бесплатный тест и собеседование на 15 минут, чтобы попасть в группу своего уровня (демо).

После каждого модуля — контрольный тест и отчёт преподавателя. По окончании курса школа выдаёт сертификат с указанием уровня и количества академических часов (демо).

Группы — до 8 человек (демо). Стоимость — 2 500 сомов в месяц (демо). Оплата: карта, наличные, банковский перевод, перевод с карты, QR-код.`,
  },
  {
    id: 'src-02', slug: 'english-kids', title: 'Английский для детей 7–11 лет',
    description: 'Игровой английский для детей: первые слова, чтение, произношение и любовь к языку.',
    category: 'Курсы', tags: ['английский', 'дети', 'игры'], type: 'md', date: '2025-05-10', featured: true,
    content: `Для детей 7–11 лет (демо) английский идёт в игровом формате: песни, карточки, подвижные игры, мини-спектакли. Ребёнок не боится ошибаться и привыкает звучать на языке с первого занятия.

За первый год дети осваивают правила чтения, 400–600 активных слов (демо) и простые диалоги. На втором году переходим к чтению коротких книг вслух и пересказу.

Занятия 2 раза в неделю по 60 минут (демо), группы до 8 детей (демо) — преподаватель успевает поработать с каждым.

Раз в месяц преподаватель присылает родителям короткий отчёт: что прошли, что закрепить дома (демо).

Стоимость — 2 200 сомов в месяц (демо). Оплата картой, наличными, переводом или по QR-коду.`,
  },
  {
    id: 'src-03', slug: 'english-teens', title: 'Английский для подростков 12–16 лет',
    description: 'Английский для школьников: школьная программа, подготовка к экзаменам, проектная работа.',
    category: 'Курсы', tags: ['английский', 'подростки', 'экзамены'], type: 'md', date: '2025-05-10', featured: false,
    content: `Программа для подростков 12–16 лет (демо). Совмещаем поддержку школьной программы и живой язык: лексика и грамматика по школьным темам плюс разговорная практика.

Отдельный модуль — подготовка к школьным экзаменам по английскому и тестированию ОРТ (демо): формат заданий, тайминг, типовые ошибки, пробные варианты с разбором.

Подростки делают проекты: короткие видео, презентации, дебаты на английском. Это снимает языковой барьер и учит отстаивать мнение (демо).

Занятия 2 раза в неделю по 90 минут (демо), группы до 8 человек (демо). Стоимость — 2 500 сомов в месяц (демо).`,
  },
  {
    id: 'src-04', slug: 'ielts-prep', title: 'Подготовка к IELTS и международным экзаменам',
    description: 'Отдельный модуль подготовки к IELTS: пробные тесты, разбор Writing, разговорный клуб.',
    category: 'Курсы', tags: ['английский', 'ielts', 'экзамен'], type: 'md', date: '2025-04-28', featured: true,
    content: `Модуль подготовки к IELTS — 4 месяца (демо). Для тех, кто целится в балл 6.5 и выше и хочет пройти все четыре секции экзамена системно.

Программа: техники Listening и Reading, разбор шаблонов Writing Task 1 и Task 2, Speaking с оценкой по критериям экзамена. Каждый месяц — полный пробный тест в экзаменационных условиях (демо).

Каждая работа Writing возвращается с комментариями преподавателя: за что снижены баллы и как поднять оценку (демо). Speaking практикуем в парах и на разговорном клубе.

Группы до 6 человек (демо). Стоимость — 4 500 сомов в месяц (демо). Перед зачислением — бесплатный тест уровня: честно скажем, готовы ли вы к модулю или стоит сначала пройти B1/B2.`,
  },
  {
    id: 'src-05', slug: 'german-beginners', title: 'Немецкий с нуля: уровни A1–B1',
    description: 'Немецкий с нуля: модули A1, A2, B1, грамматика через практику, подготовка к экзаменам.',
    category: 'Курсы', tags: ['немецкий', 'с нуля', 'goethe'], type: 'md', date: '2025-05-08', featured: true,
    content: `Немецкий язык ведём с нуля (A0/A1) до уровня B1 (демо). Каждый уровень — модуль на 3 месяца: лексика, грамматика и речь с первого занятия.

На A1 учимся знакомиться, говорить о себе и повседневных темах, задавать простые вопросы. На A2 — времена, письма и бытовые ситуации: магазин, врач, дорога. На B1 — связная речь, аргументация и работа с текстами (демо).

Тем, кто планирует учёбу или работу в Германии, помогаем подготовиться к формату экзаменов Goethe-Institut: решаем тесты, отрабатываем письменную и устную части (демо).

Занятия 2 раза в неделю по 90 минут (демо), группы до 8 человек (демо). Стоимость — 2 700 сомов в месяц (демо). Оплата: карта, наличные, перевод, QR-код.`,
  },
  {
    id: 'src-06', slug: 'russian-course', title: 'Русский язык: речь и грамотность',
    description: 'Русский для школьников и взрослых: грамотность, устная речь, деловое общение.',
    category: 'Курсы', tags: ['русский', 'школьники', 'взрослые'], type: 'md', date: '2025-05-08', featured: false,
    content: `Программа русского языка для школьников и взрослых (демо). Школьникам — грамотность и речь: орфография, пунктуация, сочинения и изложения, уверенная устная речь.

Взрослым — русский для работы и учёбы: деловая переписка, переговоры по телефону и на встречах, документы, выступления (демо). Для кыргызоязычных групп русский ведём с уровня A0 до B2 (демо).

Занятия построены на практике: меньше заучивания правил, больше собственных текстов и речи с обратной связью преподавателя.

2 раза в неделю по 90 минут (демо), группы до 8 человек (демо). Стоимость — 2 400 сомов в месяц (демо).`,
  },
  {
    id: 'src-07', slug: 'pricing-payment', title: 'Стоимость обучения и способы оплаты',
    description: 'Таблица цен по форматам (демо) и все способы оплаты школы.',
    category: 'Цены', tags: ['цена', 'оплата', 'скидки'], type: 'json', date: '2025-06-01', featured: true,
    content: `Цены (демо-данные; актуальную стоимость подтверждает администратор):
- Групповой формат (до 8 человек), 2 раза в неделю — 2 500 сомов/мес;
- Мини-группа (4–5 человек), 2 раза в неделю — 3 800 сомов/мес;
- Индивидуальное занятие, 60 минут — 700 сомов;
- Онлайн-группа, 2 раза в неделю — 2 200 сомов/мес;
- Модуль подготовки к IELTS — 4 500 сомов/мес;
- Детская группа (7–11 лет) — 2 200 сомов/мес.

Способы оплаты: банковская карта, наличные, банковский перевод, перевод с карты, оплата по QR-коду. Подтверждение оплаты выдаётся на руки (демо).

Скидки (демо): 10% второму и следующему ребёнку из одной семьи; 10% при оплате полного модуля заранее. Скидки не суммируются.

Первое занятие — бесплатное, без обязательства зачисляться.`,
  },
  {
    id: 'src-08', slug: 'schedule', title: 'Расписание занятий по слотам',
    description: 'Расписание групп по времени (демо): утренние, дневные и вечерние слоты.',
    category: 'Организация', tags: ['расписание', 'время', 'группы'], type: 'csv', date: '2025-06-05', featured: false,
    content: `Расписание (демо-данные; точное время подтверждает администратор):
- 09:00–10:30 — английский A1, пн/ср/пт;
- 11:00–12:30 — русский язык (школьники), пн/ср/пт;
- 15:00–16:30 — английский (дети 7–11), вт/чт;
- 17:00–18:30 — английский A2, пн/ср/пт;
- 18:45–20:15 — немецкий A1, вт/чт;
- 18:45–20:15 — английский B1, пн/ср/пт;
- суббота 11:00–13:00 — разговорный клуб, бесплатно для учеников (демо).

Есть утренние, дневные и вечерние слоты, чтобы совмещать с учёбой или работой. Если слот заполнен, открываем новую группу (демо).

При пропуске занятия преподаватель присылает материалы и домашнее задание; возможна отработка в параллельной группе (демо).`,
  },
  {
    id: 'src-09', slug: 'about-school', title: 'О школе: миссия, подход и команда',
    description: 'Что такое Isa Academy, как мы преподаём и кто ведёт занятия. Факты и демо-данные.',
    category: 'Организация', tags: ['о школе', 'миссия', 'методика', 'преподаватели'], type: 'md', date: '2025-06-10', featured: true,
    content: `Isa Academy (ISA International) — образовательный центр в Оше: учим английскому, немецкому и русскому языку. Рейтинг школы в 2ГИС — 5.0 из 5 по 30 оценкам, в карточке 25 отзывов.

Миссия (демо): сделать иностранный язык рабочим инструментом, а не школьным предметом. Поэтому большую часть урока говорим, а прогресс измеряем тестами и реальными навыками, а не оценкой в журнале.

Подход (демо): коммуникативная методика — язык осваивается в диалоге; малые группы до 8 человек; прозрачные уровни A0–C1; контрольные тесты и отчёты после каждого модуля.

Команда (демо-данные): Айгерим — английский язык, 6 лет практики, ведёт модули B1–C1 и подготовку к IELTS; Нурзат — немецкий язык, профильное образование, курсы A1–B1; Гульнара — русский язык, филолог, группы школьников и взрослых.

Школа находится в центре Оша: ул. Ташкентская, 28/1, 2 этаж, в 300 метрах от сквера имени Барпы Алыкулова.`,
  },
  {
    id: 'src-10', slug: 'faq-source', title: 'Частые вопросы: запись, оплата, уровни',
    description: 'Ответы на частые вопросы: запись, первое занятие, оплата, уровни, сертификаты.',
    category: 'FAQ', tags: ['faq', 'запись', 'оплата', 'уровни'], type: 'json', date: '2025-06-12', featured: false,
    content: `Как записаться на бесплатное занятие? Позвоните по номеру +996 707-18-20-03, напишите в WhatsApp или Instagram @isa__academy, либо оставьте заявку на сайте — администратор свяжется в рабочее время.

Первое занятие действительно бесплатное? Да. Вы приходите на урок, смотрите формат и задаёте вопросы преподавателю. Обязательства зачисляться нет.

Как определить уровень? Тест и собеседование на 15 минут (демо). Если начинаете с нуля — сразу в группу A0.

Сколько человек в группе? До 8 человек, в мини-группе 4–5 (демо).

Можно ли заниматься онлайн? Да, онлайн-группы идут по той же программе, что и офлайн (демо).

С какого возраста берут детей? Детские группы с 7 лет, подросткам 12–16 лет — отдельная программа (демо).

Выдают ли сертификат? Да, по окончании курса — сертификат с уровнем и количеством часов (демо).

Чем можно оплатить? Банковская карта, наличные, банковский перевод, перевод с карты, QR-код.`,
  },
  {
    id: 'src-11', slug: 'reviews-2gis', title: 'Отзывы и рейтинг 2ГИС',
    description: 'Репутация школы: рейтинг 5.0, 30 оценок и 25 отзывов в 2ГИС, избранные отзывы учеников.',
    category: 'Отзывы', tags: ['отзывы', 'рейтинг', '2гис'], type: 'txt', date: '2025-06-15', featured: true,
    content: `Рейтинг Isa Academy в 2ГИС — 5.0 из 5 по 30 оценкам. В карточке организации 25 текстовых отзывов.

Отзыв из 2ГИС (перевод с кыргызского): «Спасибо „Иса Академия“! Здесь получаешь не просто знания — здесь получаешь поддержку, внимание и мотивацию учиться дальше».

Отзыв (демо): «Пришла на английский с нуля после 30 лет. Через полгода спокойно говорю в командировках и переписываюсь с партнёрами без переводчика». — Айгерим, взрослая группа.

Отзыв (демо): «Дочка ходит в детскую группу с удовольствием. Впервые не заставляем учиться — сама просит не пропускать». — Нуржан, родитель ученицы.

Отзыв (демо): «Готовился к IELTS здесь и сдал на 7.0 с первой попытки. Больше всего помогли пробные тесты и разбор Writing». — Бектур, модуль подготовки.

Мы читаем каждый отзыв: они помогают улучшать программы, расписание и формат занятий.`,
  },
  {
    id: 'src-12', slug: 'contacts-route', title: 'Контакты и как добраться',
    description: 'Адрес, телефон, WhatsApp, Instagram, часы работы и ориентиры для навигации.',
    category: 'Контакты', tags: ['адрес', 'телефон', 'whatsapp', 'instagram', 'часы'], type: 'md', date: '2025-06-18', featured: true,
    content: `Адрес: город Ош, улица Ташкентская, 28/1, 2 этаж. Вход со стороны улицы, подъём на второй этаж.

Телефон: +996 707-18-20-03 — звонки и WhatsApp. Instagram: @isa__academy — жизнь школы, анонсы расписания и новых групп.

Часы работы (демо): понедельник–суббота с 9:00 до 19:00, воскресенье — выходной.

Как добраться: школа в центре Оша. Ориентиры: сквер имени Барпы Алыкулова — около 300 метров; пересечение улиц Насирдина Исанова и Ташкентской — около 350 метров; школа-гимназия №2 имени Салижана Жигитова — около 600 метров.

Оплата на месте: банковская карта, наличные, банковский перевод, перевод с карты, QR-код.

Запись на бесплатное занятие — по телефону, в WhatsApp или через форму на сайте.`,
  },
];

/* ============================== ДАННЫЕ ЛЕНДИНГА ============================== */
const STEPS = [
  { t: 'Бесплатное первое занятие', d: 'Приходите на урок, смотрите формат изнутри и задаёте вопросы преподавателю. Обязательства зачисляться нет.' },
  { t: 'Тест уровня за 15 минут', d: 'Тест и короткое собеседование определяют уровень — от A0 до C1. В группу «примерно по силам» не зачисляем.' },
  { t: 'Группа и удобное время', d: 'Подбираем группу до 8 человек вашего уровня и слот: утро, день или вечер — чтобы совмещать с учёбой и работой.' },
  { t: 'Видимый прогресс', d: 'Контрольные тесты после модулей, отчёты преподавателя и сертификат по финишу. Всегда понятно, что дальше.' },
];
const BENEFITS = [
  { icon: IcUsers, t: 'Группы до 8 человек', d: 'Не поток, а класс: преподаватель слышит каждого и правит речь каждого. Есть мини-группы на 4–5 человек (демо).' },
  { icon: IcChat, t: 'Речь с первого занятия', d: 'Около 70% времени урока — говорим на языке в парах и группах (демо). Языковой барьер снимаем сразу, а не «потом».' },
  { icon: IcStar, t: 'Рейтинг 5.0 в 2ГИС', d: '30 оценок и 25 отзывов — максимальный балл. Репутация, которую дают уроки, а не обещания.' },
  { icon: IcPin, t: 'Центр Оша', d: 'ул. Ташкентская, 28/1, 2 этаж. 300 м от сквера Барпы Алыкулова — удобно добираться из любого района.' },
  { icon: IcWallet, t: 'Оплата как удобно', d: 'Карта, наличные, банковский перевод, перевод с карты и QR-код. Подтверждение оплаты — на руки.' },
  { icon: IcAward, t: 'Прозрачные уровни A0–C1', d: 'Тесты после модулей, отчёты преподавателя и сертификат на финише. Вы всегда знаете свой уровень и следующий шаг (демо).' },
];
const COURSES = [
  { code: 'EN', title: 'Английский язык', who: 'дети 7–11 · подростки 12–16 · взрослые', levels: 'A0 → C1', slug: 'english-adults',
    points: ['Группы по уровню после бесплатного теста', 'Речь с первого занятия, игровые форматы для детей', 'Подготовка к IELTS и школьным экзаменам (демо)'], price: 'от 2 200 сомов/мес (демо)' },
  { code: 'DE', title: 'Немецкий язык', who: 'с нуля и с базой', levels: 'A0 → B1', slug: 'german-beginners',
    points: ['Старт с нуля без предварительной базы', 'Подготовка к формату экзаменов Goethe (демо)', 'Модули по 3 месяца с тестами и отчётами (демо)'], price: 'от 2 700 сомов/мес (демо)' },
  { code: 'RU', title: 'Русский язык', who: 'школьники · взрослые · кыргызоязычные группы', levels: 'A0 → B2', slug: 'russian-course',
    points: ['Грамотность и устная речь для школьников', 'Деловой русский для работы и учёбы (демо)', 'Группы для кыргызоязычных с нуля (демо)'], price: 'от 2 400 сомов/мес (демо)' },
];
const PRICING = [
  { name: 'Группа', desc: 'Классический формат до 8 человек', price: '2 500', unit: 'сомов/мес', cta: 'Записаться в группу',
    features: ['2 раза в неделю по 90 минут', 'Тест уровня и материалы (демо)', 'Тесты модулей и отчёты (демо)', 'Сертификат по окончании (демо)'] },
  { name: 'Мини-группа', desc: '4–5 человек, больше речи', price: '3 800', unit: 'сомов/мес', recommended: true, cta: 'Выбрать мини-группу',
    features: ['2 раза в неделю по 90 минут', 'Больше собственной речи на уроке', 'Гибкий темп под группу (демо)', 'Сертификат по окончании (демо)'] },
  { name: 'Индивидуально', desc: '1-на-1, ваш график и цель', price: '700', unit: 'сомов/занятие', cta: 'Начать индивидуально',
    features: ['60 минут в удобное время (демо)', 'Программа под вашу задачу', 'Деловой английский и немецкий (демо)', 'Отчёт прогресса каждый месяц (демо)'] },
  { name: 'Онлайн', desc: 'Та же программа из любой точки', price: '2 200', unit: 'сомов/мес', cta: 'Записаться онлайн',
    features: ['Уроки вживую, не записи (демо)', 'Те же материалы и тесты', 'Записи пропущенных уроков (демо)', 'Оплата картой или по QR'] },
];
const TESTIMONIALS = [
  { text: 'Спасибо «Иса Академия»! Здесь получаешь не просто знания — здесь получаешь поддержку, внимание и мотивацию учиться дальше.', author: 'Отзыв из 2ГИС', note: 'перевод с кыргызского', real: true },
  { text: 'Пришла на английский с нуля после 30 лет. Через полгода спокойно говорю в командировках и переписываюсь с партнёрами без переводчика.', author: 'Айгерим А.', note: 'взрослая группа', real: false },
  { text: 'Дочка ходит в детскую группу с удовольствием. Впервые не заставляем учиться — сама просит не пропускать занятия.', author: 'Нуржан Т.', note: 'родитель ученицы', real: false },
  { text: 'Готовился к IELTS здесь и сдал на 7.0 с первой попытки. Больше всего помогли пробные тесты и подробный разбор Writing.', author: 'Бектур С.', note: 'модуль подготовки', real: false },
  { text: 'Удобно, что можно оплатить по QR или переводом: никаких очередей и бумаг, всё прозрачно и быстро.', author: 'Мадина К.', note: 'ученица школы', real: false },
];
const FAQS = [
  { q: 'Как записаться на бесплатное занятие?', a: `Позвоните ${SITE.phone}, напишите в WhatsApp или в Instagram ${SITE.instagramHandle} — либо оставьте заявку на сайте. Администратор свяжется в рабочее время и подберёт удобный слот.` },
  { q: 'Где находится школа и как добраться?', a: `${SITE.address}. Ориентиры: сквер Барпы Алыкулова (~300 м), пересечение ул. Насирдина Исанова и Ташкентской (~350 м), школа-гимназия №2 (~600 м).` },
  { q: 'Как можно оплатить обучение?', a: 'Пятью способами: банковская карта, наличные, банковский перевод, перевод с карты и оплата по QR-коду. Подтверждение оплаты выдаём на руки.' },
  { q: 'Первое занятие правда бесплатное?', a: 'Да. Вы приходите на реальный урок, смотрите формат и задаёте вопросы преподавателю. Обязательства зачисляться после занятия нет.' },
  { q: 'Сколько человек в группе?', a: 'До 8 человек (демо), в формате мини-группы — 4–5. Так преподаватель слышит каждого и успевает поработать с речью каждого ученика.' },
  { q: 'С какого возраста берёте детей?', a: 'Детские группы — с 7 лет (демо), подросткам 12–16 лет — отдельная программа с подготовкой к экзаменам. Взрослым — любой уровень, включая ноль.' },
  { q: 'Можно ли заниматься онлайн?', a: 'Да, онлайн-группы идут по той же программе, что и очные (демо). Удобно, если вы уехали из города или часто в командировках.' },
  { q: 'Что делать, если группа или время не подошли?', a: 'Предложим переход в другую группу или слот. Если подходящего варианта нет — пересчитаем оплату за оставшиеся занятия (демо; условия уточняет администратор).' },
  { q: 'Выдаёте ли сертификат по окончании?', a: 'Да: сертификат с указанием уровня и количества академических часов (демо). Результаты модульных тестов прилагаются к отчёту.' },
  { q: 'Как быстро я начну говорить?', a: 'Зависит от стартового уровня и практики. В среднем при 2 занятиях в неделю путь с нуля до уверенного разговорного A2 — 6–9 месяцев (демо-оценка). На первом занятии честно скажем, чего ожидать.' },
];
const POPULAR = ['английский для детей', 'стоимость курсов', 'как оплатить', 'как добраться', 'подготовка к IELTS', 'немецкий с нуля', 'расписание занятий', 'сертификат'];
const CATEGORIES = ['Курсы', 'Цены', 'Организация', 'FAQ', 'Отзывы', 'Контакты'];
const TYPES = ['md', 'json', 'csv', 'txt'];
const TYPE_LABEL: Record<string, string> = { md: 'Markdown', json: 'JSON', csv: 'CSV', txt: 'Text' };

/* ============================== ПОИСК ============================== */
const norm = (s: string) => (s || '').toLowerCase().replace(/ё/g, 'е').replace(/[^a-zа-я0-9\s]/gi, ' ').replace(/\s+/g, ' ').trim();
const escRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
function lev(a: string, b: string) {
  if (a === b) return 0;
  if (Math.abs(a.length - b.length) > 2) return 3;
  const m = a.length, n = b.length;
  let prev = Array.from({ length: n + 1 }, (_, i) => i);
  for (let i = 1; i <= m; i++) {
    const cur = [i];
    for (let j = 1; j <= n; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    prev = cur;
  }
  return prev[n];
}
function makeSnippet(content: string, terms: string[]) {
  const low = content.toLowerCase();
  let idx = -1;
  for (const t of terms) { const i = low.indexOf(t.toLowerCase()); if (i >= 0 && (idx === -1 || i < idx)) idx = i; }
  if (idx === -1) idx = 0;
  const start = Math.max(0, idx - 60);
  const end = Math.min(content.length, idx + 190);
  let s = content.slice(start, end).replace(/\s+/g, ' ').trim();
  if (start > 0) s = '…' + s;
  if (end < content.length) s += '…';
  return s;
}
function searchSources(query: string, opts: { cats?: string[]; types?: string[]; sort?: string } = {}) {
  const { cats = [], types = [], sort = 'relevance' } = opts;
  const tokens = norm(query).split(' ').filter((t) => t.length > 1);
  if (!tokens.length) return [];
  const out: any[] = [];
  for (const src of SOURCES) {
    if (cats.length && !cats.includes(src.category)) continue;
    if (types.length && !types.includes(src.type)) continue;
    const T = norm(src.title), D = norm(src.description), G = norm(src.tags.join(' ')), C = norm(src.category), B = norm(src.content);
    const words = (T + ' ' + B).split(' ').filter((w) => w.length >= 4);
    let score = 0; const terms = new Set<string>(); let all = true;
    for (const tok of tokens) {
      let w = 0;
      if (T.includes(tok)) { w += 6; terms.add(tok); }
      if (G.includes(tok)) { w += 4; terms.add(tok); }
      if (D.includes(tok)) { w += 3; terms.add(tok); }
      if (C.includes(tok)) { w += 2; terms.add(tok); }
      const occ = (B.match(new RegExp(escRe(tok), 'g')) || []).length;
      if (occ) { w += Math.min(occ, 5); terms.add(tok); }
      if (!w) {
        const maxD = tok.length >= 7 ? 2 : 1;
        for (const wd of words) if (lev(tok, wd) <= maxD) { w += 2; terms.add(wd); break; }
      }
      if (!w) all = false; else score += w;
    }
    if (!score) continue;
    if (all) score += 3;
    const termsArr = [...terms];
    out.push({ src, score, terms: termsArr, snippet: makeSnippet(src.content, termsArr) });
  }
  if (sort === 'date') out.sort((a, b) => b.src.date.localeCompare(a.src.date));
  else if (sort === 'alpha') out.sort((a, b) => a.src.title.localeCompare(b.src.title, 'ru'));
  else out.sort((a, b) => b.score - a.score);
  return out;
}
const fmtDate = (iso: string) => {
  const [y, m, d] = iso.split('-');
  const months = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
  return `${+d} ${months[+m - 1]} ${y}`;
};

/* ============================== УТИЛИТЫ ============================== */
function useRoute() {
  const parse = () => {
    const raw = window.location.hash.replace(/^#/, '') || '/';
    const [path, qs] = raw.split('?');
    const query: Record<string, string> = {};
    if (qs) new URLSearchParams(qs).forEach((v, k) => { query[k] = v; });
    return { path: path || '/', query };
  };
  const [route, setRoute] = useState(parse);
  useEffect(() => {
    const on = () => setRoute(parse());
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return route;
}
const navigate = (to: string) => { window.location.hash = to; };
function useDebounced(value: string, ms = 250) {
  const [v, setV] = useState(value);
  useEffect(() => { const t = setTimeout(() => setV(value), ms); return () => clearTimeout(t); }, [value, ms]);
  return v;
}
const lsGet = (k: string, fb: any) => { try { const r = localStorage.getItem(k); return r ? JSON.parse(r) : fb; } catch { return fb; } };
const lsSet = (k: string, v: any) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* приватный режим */ } };
async function copyText(text: string) {
  try { await navigator.clipboard.writeText(text); return true; }
  catch {
    try {
      const ta = document.createElement('textarea');
      ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta);
      return true;
    } catch { return false; }
  }
}
let pendingScroll: string | null = null;
function scrollNow(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 76;
  window.scrollTo({ top: y, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
}
function goSection(id: string) {
  const path = (window.location.hash.replace(/^#/, '') || '/').split('?')[0];
  if (path !== '/') { pendingScroll = id; navigate('/'); } else scrollNow(id);
}

/* ============================== SVG-СЦЕНЫ ============================== */
function ReceptionScene({ label = 'Приёмная Isa Academy: вывеска ISA International, глобус и флаги' }: { label?: string }) {
  const uid = useId().replace(/:/g, '');
  return (
    <svg className="scene-svg" viewBox="0 0 600 620" preserveAspectRatio="xMidYMid slice" role="img" aria-label={label}>
      <defs>
        <radialGradient id={`${uid}halo`}>
          <stop offset="0%" stopColor="#f6cf7e" stopOpacity=".6" />
          <stop offset="55%" stopColor="#f6cf7e" stopOpacity=".28" />
          <stop offset="100%" stopColor="#f6cf7e" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="600" height="620" fill="#f1eee8" />
      <rect x="0" y="40" width="64" height="580" fill="#e6e1d8" />
      <rect x="10" y="60" width="10" height="540" fill="#d7d1c5" />
      <rect x="34" y="60" width="10" height="540" fill="#d7d1c5" />
      <rect x="524" y="20" width="76" height="600" fill="#ddd6ca" />
      {[536, 552, 568, 584].map((x) => <rect key={x} x={x} y="40" width="6" height="560" fill="#c9c1b2" />)}
      <circle cx="300" cy="212" r="188" fill={`url(#${uid}halo)`} />
      <circle cx="300" cy="212" r="148" fill="#fbfaf7" stroke="#e2dccf" strokeWidth="3" />
      <text x="300" y="228" textAnchor="middle" fontFamily="Manrope, sans-serif" fontSize="88" fontWeight="800" letterSpacing="12" fill="#8E1F28">ISA</text>
      <text x="300" y="272" textAnchor="middle" fontFamily="Manrope, sans-serif" fontSize="25" fontWeight="800" letterSpacing="7" fill="#8E1F28">INTERNATIONAL</text>
      <path d="M300 360 v66" stroke="#d8d2c4" strokeWidth="2" />
      <rect x="168" y="452" width="264" height="12" rx="5" fill="#cfe0e6" />
      <rect x="170" y="464" width="260" height="4" fill="#b9cdd4" opacity=".7" />
      <rect x="196" y="464" width="9" height="92" fill="#3b3b3b" />
      <rect x="396" y="464" width="9" height="92" fill="#3b3b3b" />
      <rect x="248" y="444" width="44" height="7" rx="2" fill="#ffffff" transform="rotate(-5 270 447)" />
      <circle cx="236" cy="410" r="30" fill="#2f7fd0" />
      <path d="M218 398 q12 -9 22 -2 q9 5 16 1 q-3 15 -17 18 q-16 3 -21 -17z" fill="#3fa060" />
      <path d="M240 428 q8 4 14 -2" stroke="#3fa060" strokeWidth="5" fill="none" strokeLinecap="round" />
      <circle cx="236" cy="410" r="30" fill="none" stroke="#1b4f86" strokeWidth="2" opacity=".45" />
      <path d="M206 396 a34 34 0 0 0 26 48" stroke="#2b2b2b" strokeWidth="3" fill="none" />
      <path d="M236 440 v12 M222 452 h28" stroke="#2b2b2b" strokeWidth="4" strokeLinecap="round" />
      <path d="M352 452 v-48 M374 452 v-42" stroke="#4a4a4a" strokeWidth="3" />
      <rect x="354" y="402" width="32" height="21" fill="#e8112d" />
      <circle cx="370" cy="412" r="5.5" fill="#ffd700" />
      <rect x="376" y="408" width="32" height="21" fill="#ffffff" />
      {[411, 417, 423].map((y) => <rect key={y} x="376" y={y} width="32" height="3" fill="#c8102e" />)}
      <rect x="376" y="408" width="13" height="10" fill="#3c3b6e" />
      <rect x="322" y="470" width="76" height="62" rx="16" fill="#2c2c2c" />
      <rect x="316" y="530" width="88" height="16" rx="8" fill="#242424" />
      <rect x="356" y="546" width="8" height="38" fill="#333" />
      <path d="M332 588 h56" stroke="#333" strokeWidth="6" strokeLinecap="round" />
      <rect x="52" y="470" width="64" height="54" rx="12" fill="#8d9297" />
      <rect x="48" y="522" width="72" height="14" rx="7" fill="#7c8186" />
      <rect x="78" y="536" width="8" height="46" fill="#6d7276" />
      <rect x="474" y="474" width="64" height="54" rx="12" fill="#8d9297" />
      <rect x="470" y="526" width="72" height="14" rx="7" fill="#7c8186" />
      <rect x="500" y="540" width="8" height="44" fill="#6d7276" />
    </svg>
  );
}
function ClassroomScene({ label = 'Занятие в классе Isa Academy: студенты за П-образными столами' }: { label?: string }) {
  return (
    <svg className="scene-svg" viewBox="0 0 900 560" preserveAspectRatio="xMidYMid slice" role="img" aria-label={label}>
      <rect width="900" height="560" fill="#f4f2ee" />
      <rect width="900" height="86" fill="#faf9f6" />
      {[140, 340, 540, 740].map((x) => (
        <g key={x}>
          <circle cx={x} cy="42" r="17" fill="#ffffff" opacity=".5" />
          <circle cx={x} cy="42" r="9" fill="#ffffff" />
        </g>
      ))}
      {[70, 210, 350, 490, 630].map((x) => (
        <rect key={x} x={x} y="86" width="128" height="200" fill="#e3e9ea" opacity=".55" stroke="#3a3a3a" strokeWidth="5" />
      ))}
      <rect x="770" y="100" width="118" height="150" fill="#8fb573" />
      <circle cx="806" cy="140" r="22" fill="#a9c98d" />
      <circle cx="846" cy="186" r="28" fill="#7aa25e" />
      <rect y="286" width="900" height="274" fill="#eceae4" />
      {[0, 1, 2, 3].map((i) => <path key={i} d={`M${-60 + i * 260} 560 L${140 + i * 260} 286`} stroke="#e0ddd5" strokeWidth="3" />)}
      <path d="M118 316 L262 296 L286 470 L152 502 Z" fill="#5b4632" />
      <path d="M782 316 L638 296 L614 470 L748 502 Z" fill="#5b4632" />
      <path d="M298 296 L602 296 L614 360 L286 360 Z" fill="#66513a" />
      <path d="M118 316 L262 296 L266 316 L124 338 Z" fill="#6d563e" />
      <path d="M782 316 L638 296 L634 316 L776 338 Z" fill="#6d563e" />
      {[
        [176, 330, -8], [214, 372, -6], [238, 424, -4],
        [352, 316, 0], [452, 316, 0], [540, 318, 0],
        [700, 336, 8], [676, 384, 6], [652, 430, 4],
      ].map(([x, y, r], i) => (
        <rect key={i} x={x} y={y} width="34" height="22" rx="2" fill="#ffffff" transform={`rotate(${r} ${x} ${y})`} />
      ))}
      <g>
        <circle cx="150" cy="286" r="15" fill="#2e2a26" /><rect x="126" y="300" width="48" height="42" rx="14" fill="#2e2a26" />
        <circle cx="206" cy="272" r="14" fill="#4a4038" /><rect x="184" y="285" width="45" height="38" rx="13" fill="#4a4038" />
        <circle cx="352" cy="262" r="14" fill="#6b5844" /><rect x="330" y="275" width="45" height="36" rx="13" fill="#d9d4cc" />
        <circle cx="452" cy="260" r="14" fill="#3d3731" /><rect x="430" y="273" width="45" height="36" rx="13" fill="#6e6a63" />
        <circle cx="548" cy="262" r="14" fill="#574f46" /><rect x="526" y="275" width="45" height="36" rx="13" fill="#8a8378" />
        <circle cx="690" cy="282" r="14" fill="#574f46" /><rect x="668" y="295" width="46" height="40" rx="13" fill="#574f46" />
        <circle cx="742" cy="300" r="15" fill="#a03a34" /><rect x="718" y="314" width="50" height="46" rx="14" fill="#6d4a2f" />
        <path d="M727 300 a15 15 0 0 1 30 0 v14 h-30 z" fill="#a03a34" />
      </g>
      <rect x="586" y="298" width="10" height="22" rx="3" fill="#7fb2d9" />
      <rect x="640" y="386" width="52" height="40" rx="8" fill="#d8cfc2" />
      <path d="M650 386 q16 -18 32 0" stroke="#b3a894" strokeWidth="5" fill="none" />
      <rect x="300" y="404" width="46" height="30" rx="4" fill="#c0392b" />
      <circle cx="323" cy="419" r="8" fill="#f1c40f" />
      <rect x="352" y="404" width="46" height="30" rx="4" fill="#e6b345" />
      <circle cx="375" cy="419" r="8" fill="#8E1F28" />
    </svg>
  );
}
const SceneBg = ({ scene: Scene, className = '' }: any) => (
  <div className={`scene-bg ${className}`} aria-hidden="true"><Scene label="" /></div>
);

/* ============================== TOAST ============================== */
const ToastCtx = createContext<(text: string) => void>(() => {});
const useToast = () => useContext(ToastCtx);
function ToastHost({ toasts }: { toasts: { id: number; text: string }[] }) {
  return (
    <div className="toast-wrap" role="status" aria-live="polite">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div key={t.id} className="toast" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}>
            <IcCheck size={16} /> {t.text}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

/* ============================== UI ============================== */
function Reveal({ children, delay = 0, className = '' }: any) {
  const reduce = useReducedMotion();
  return (
    <motion.div className={className}
      initial={reduce ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}>
      {children}
    </motion.div>
  );
}
const Btn = ({ as = 'button', variant = 'primary', size = '', block = false, className = '', children, ...rest }: any) => {
  const Tag = as;
  return <Tag className={`btn btn-${variant} ${size ? 'btn-' + size : ''} ${block ? 'btn-block' : ''} ${className}`} {...rest}>{children}</Tag>;
};
const Badge = ({ children, tone = 'brand' }: any) => <span className={`badge badge-${tone}`}>{children}</span>;
const Stars = ({ n = 5, size = 16 }: any) => (
  <span className="stars" aria-label={`Оценка ${n} из 5`}>{Array.from({ length: n }, (_, i) => <IcStar key={i} size={size} />)}</span>
);
const DemoNote = ({ children }: any) => (
  <p className="demo-note"><IcInfo size={15} /> <span>{children}</span></p>
);
function Hl({ text, terms }: { text: string; terms?: string[] }) {
  if (!terms || !terms.length) return <>{text}</>;
  const re = new RegExp(`(${terms.map(escRe).sort((a, b) => b.length - a.length).join('|')})`, 'gi');
  const parts = text.split(re);
  return (<>{parts.map((p, i) => terms.some((t) => t.toLowerCase() === p.toLowerCase()) ? <mark key={i}>{p}</mark> : <React.Fragment key={i}>{p}</React.Fragment>)}</>);
}
function SectionHead({ eyebrow, title, lead, center = false }: any) {
  return (
    <Reveal className={`sec-head ${center ? 'center' : ''}`}>
      {eyebrow && <span className="eyebrow"><IcSpark size={14} /> {eyebrow}</span>}
      <h2 className="h2">{title}</h2>
      {lead && <p className="lead">{lead}</p>}
    </Reveal>
  );
}
function SearchBox({ value, onChange, onSubmit, placeholder = 'Поиск: программы, цены, расписание, как добраться…', autoFocus = false, big = false }: any) {
  return (
    <form className={`searchbox ${big ? 'big' : ''}`} role="search" onSubmit={(e) => { e.preventDefault(); onSubmit && onSubmit(value); }}>
      <IcSearch size={big ? 20 : 18} className="search-icon-fixed" />
      <input type="search" enterKeyHint="search" autoComplete="off" autoFocus={autoFocus}
        size={1}
        aria-label="Поиск по информации школы" placeholder={placeholder}
        value={value} onChange={(e) => onChange(e.target.value)} />
      {value && (
        <button type="button" className="clear-btn" aria-label="Очистить поиск" onClick={() => onChange('')}>
          <IcX size={18} />
        </button>
      )}
      <button type="submit" className="btn btn-primary btn-sm search-submit" aria-label="Найти">Найти</button>
    </form>
  );
}

/* ============================== ШАПКА / МЕНЮ ============================== */
const NAV = [
  { label: 'Курсы', section: 'sec-courses' },
  { label: 'Цены', section: 'sec-pricing' },
  { label: 'Отзывы', section: 'sec-reviews' },
  { label: 'Вопросы', section: 'sec-faq' },
  { label: 'О школе', to: '/about' },
  { label: 'Поиск', to: '/search' },
];
function Logo() {
  return (
    <a href="#/" className="logo" aria-label="Isa Academy — на главную">
      <span className="logo-mark" aria-hidden="true">ISA</span>
      <span className="logo-text">
        <strong>Isa Academy</strong>
        <small>International · Ош</small>
      </span>
    </a>
  );
}
function Header({ route, theme, onTheme }: any) {
  const [open, setOpen] = useState(false);
  useEffect(() => { setOpen(false); }, [route.path]);
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [open]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  return (
    <>
      <header className="header">
        <div className="container header-in">
          <Logo />
          <nav className="nav" aria-label="Основная навигация">
            {NAV.map((n) => n.section
              ? <a key={n.label} href="#/" onClick={(e) => { e.preventDefault(); goSection(n.section); }}>{n.label}</a>
              : <a key={n.label} href={'#' + n.to} aria-current={route.path === n.to ? 'page' : undefined}>{n.label}</a>)}
          </nav>
          <div className="header-actions">
            <button className="icon-btn ghost" onClick={onTheme} aria-label={theme === 'dark' ? 'Включить светлую тему' : 'Включить тёмную тему'}>
              {theme === 'dark' ? <IcSun size={20} /> : <IcMoon size={20} />}
            </button>
            <Btn as="a" href="#/contact" className="header-cta">Бесплатное занятие</Btn>
            <button className="icon-btn burger" aria-label="Открыть меню" aria-expanded={open} onClick={() => setOpen(true)}>
              <IcMenu size={24} />
            </button>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div className="mmenu" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.22 }} role="dialog" aria-modal="true" aria-label="Меню">
            <div className="mmenu-top">
              <Logo />
              <button className="icon-btn" aria-label="Закрыть меню" onClick={() => setOpen(false)}><IcX size={24} /></button>
            </div>
            <nav className="mmenu-nav" aria-label="Мобильная навигация">
              {NAV.map((n) => n.section
                ? <a key={n.label} href="#/" onClick={(e) => { e.preventDefault(); setOpen(false); setTimeout(() => goSection(n.section), 60); }}>{n.label}</a>
                : <a key={n.label} href={'#' + n.to}>{n.label}</a>)}
              <a href="#/contact">Контакты</a>
              <a href="#/reviews">Отзывы</a>
            </nav>
            <div className="mmenu-foot">
              <Btn as="a" href="#/contact" block>Записаться на бесплатное занятие</Btn>
              <a className="btn btn-outline btn-block" href={SITE.phoneHref}><IcPhone size={18} /> {SITE.phone}</a>
              <p className="mmenu-meta">{SITE.address}<br />{SITE.hours}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ============================== HERO ============================== */
function Hero() {
  const reduce = useReducedMotion();
  const [q, setQ] = useState('');
  const float = reduce ? undefined : { y: [0, -6, 0] };
  const floatTr: any = { duration: 5, repeat: Infinity, ease: 'easeInOut' };
  return (
    <section className="hero" id="top">
      <SceneBg scene={ClassroomScene} className="hero-bg" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <Reveal>
            <span className="eyebrow"><IcPin size={14} /> Образовательный центр · Ош · английский, немецкий, русский</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="h1">Выучите язык до уверенного разговора — <span className="accent">за 6 месяцев</span>, а не «когда-нибудь»</h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lead">Isa Academy — образовательный центр в Оше с рейтингом 5.0 в 2ГИС. Группы до 8 человек, речь на каждом уроке и понятный прогресс по уровням и тестам — а не «по ощущениям».</p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="hero-cta">
              <Btn as="a" href="#/contact" block>Записаться на бесплатное занятие <IcArrow size={18} /></Btn>
              <Btn as="a" href="#/" variant="outline" block onClick={(e: any) => { e.preventDefault(); goSection('sec-pricing'); }}>Программы и цены</Btn>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="hero-search">
              <SearchBox value={q} onChange={setQ} onSubmit={(v: string) => navigate('/search' + (v.trim() ? '?q=' + encodeURIComponent(v) : ''))} />
              <div className="chips-row" aria-label="Популярные запросы">
                {POPULAR.slice(0, 5).map((p) => (
                  <button key={p} className="chip" onClick={() => navigate('/search?q=' + encodeURIComponent(p))}>{p}</button>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="hero-media-wrap">
          <div className="hero-media">
            <div className="hero-photo">
              <ReceptionScene />
            </div>
            <motion.div className="float-card fc-1" animate={float} transition={floatTr}>
              <span className="fc-ico gold"><IcStar size={16} /></span>
              <span><strong>5.0</strong> в 2ГИС<br /><small>30 оценок · 25 отзывов</small></span>
            </motion.div>
            <motion.div className="float-card fc-2" animate={float} transition={{ ...floatTr, delay: 1.2 }}>
              <span className="fc-ico brand"><IcGlobe size={16} /></span>
              <span><strong>3 языка</strong><br /><small>уровни A0 → C1</small></span>
            </motion.div>
            <motion.div className="float-card fc-3" animate={float} transition={{ ...floatTr, delay: 2.4 }}>
              <span className="fc-ico ok"><IcUsers size={16} /></span>
              <span><strong>до 8 человек</strong><br /><small>в группе (демо)</small></span>
            </motion.div>
          </div>
        </Reveal>
      </div>
      <div className="container">
        <Reveal delay={0.1}>
          <dl className="proof">
            <div><dt>5.0</dt><dd>рейтинг в 2ГИС</dd></div>
            <div><dt>30</dt><dd>оценок учеников</dd></div>
            <div><dt>25</dt><dd>текстовых отзывов</dd></div>
            <div><dt>3</dt><dd>языка обучения</dd></div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================== СЕКЦИИ ============================== */
function StepsSection() {
  return (
    <section className="section" id="sec-how">
      <div className="container">
        <SectionHead eyebrow="Как это работает" title="Четыре шага до первого разговора на языке" lead="Прозрачный путь без сюрпризов: вы всегда знаете, что происходит и что дальше." />
        <div className="grid grid-4">
          {STEPS.map((s, i) => (
            <Reveal key={s.t} delay={i * 0.05}>
              <article className="card step">
                <span className="step-num" aria-hidden="true">0{i + 1}</span>
                <h3 className="h3">{s.t}</h3>
                <p>{s.d}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
function BenefitsSection() {
  return (
    <section className="section tint" id="sec-benefits">
      <SceneBg scene={ClassroomScene} />
      <div className="container">
        <SectionHead eyebrow="Почему Isa Academy" title="Школа, которую рекомендуют оценкой 5.0" lead="Каждое обещание ниже — факт из карточки школы или правило нашей методики." />
        <div className="grid grid-3">
          {BENEFITS.map((b, i) => (
            <Reveal key={b.t} delay={(i % 3) * 0.05}>
              <article className="card benefit">
                <span className="icon-box"><b.icon size={20} /></span>
                <h3 className="h3">{b.t}</h3>
                <p>{b.d}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
function CoursesSection() {
  return (
    <section className="section" id="sec-courses">
      <div className="container">
        <SectionHead eyebrow="Направления" title="Три языка — одна система обучения" lead="Программы для детей, подростков и взрослых: от нуля до продвинутого уровня." />
        <div className="grid grid-3">
          {COURSES.map((c, i) => (
            <Reveal key={c.code} delay={i * 0.06}>
              <article className="card course">
                <div className="course-top">
                  <span className={`lang lang-${c.code.toLowerCase()}`} aria-hidden="true">{c.code}</span>
                  <span className="levels">{c.levels}</span>
                </div>
                <h3 className="h3">{c.title}</h3>
                <p className="muted-sm">{c.who}</p>
                <ul className="ticks">
                  {c.points.map((p) => <li key={p}><IcCheck size={16} /> {p}</li>)}
                </ul>
                <div className="course-foot">
                  <span className="price-sm">{c.price}</span>
                  <Btn as="a" href={'#/source/' + c.slug} variant="ghost" size="sm">Программа <IcArrow size={16} /></Btn>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.08}><DemoNote>Уровни, длительность модулей и цены — демо-данные для макета. Актуальные программы и стоимость подтверждает администратор по телефону или в WhatsApp.</DemoNote></Reveal>
      </div>
    </section>
  );
}
function DemoSearchSection() {
  const [q, setQ] = useState('');
  const dq = useDebounced(q, 250);
  const results = useMemo(() => (dq.trim() ? searchSources(dq).slice(0, 3) : []), [dq]);
  return (
    <section className="section tint" id="sec-demo">
      <SceneBg scene={ReceptionScene} />
      <div className="container">
        <SectionHead eyebrow="Живой поиск" title="Проверьте школу до звонка" lead="Цены, расписание, программы, оплата, как добраться — ответы находятся за секунды, прямо по базе источников школы." />
        <Reveal>
          <div className="card demo-search">
            <SearchBox big value={q} onChange={setQ} onSubmit={(v: string) => navigate('/search?q=' + encodeURIComponent(v))} placeholder="Например: сколько стоит мини-группа?" />
            <AnimatePresence mode="popLayout">
              {dq.trim() && results.length > 0 && (
                <motion.ul className="demo-results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {results.map((r) => (
                    <li key={r.src.id}>
                      <a href={'#/source/' + r.src.slug}>
                        <span className="ds-cat">{r.src.category}</span>
                        <strong><Hl text={r.src.title} terms={r.terms} /></strong>
                        <small><Hl text={r.snippet} terms={r.terms} /></small>
                      </a>
                    </li>
                  ))}
                </motion.ul>
              )}
              {dq.trim() && !results.length && (
                <motion.p className="demo-empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  Ничего не нашлось по запросу «{dq}». Попробуйте «стоимость» или «расписание» — или откройте полный поиск.
                </motion.p>
              )}
            </AnimatePresence>
            <div className="demo-foot">
              <span className="muted-sm">Источников в базе: {SOURCES.length}</span>
              <Btn as="a" href={'#/search' + (q.trim() ? '?q=' + encodeURIComponent(q) : '')} variant="ghost" size="sm">Открыть полный поиск <IcArrow size={16} /></Btn>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
function ReviewsSection() {
  return (
    <section className="section" id="sec-reviews">
      <div className="container">
        <SectionHead eyebrow="Доверие" title="5.0 из 5 — так нас оценивают ученики" lead="Максимальный рейтинг в 2ГИС по 30 оценкам и 25 отзывам. Вот что пишут о школе." />
        <div className="grid grid-3">
          {TESTIMONIALS.slice(0, 6).map((t, i) => (
            <Reveal key={t.author + i} delay={(i % 3) * 0.05}>
              <figure className="card review">
                <div className="review-top"><Stars />{t.real && <Badge tone="ok">2ГИС · факт</Badge>}</div>
                <blockquote><IcQuote size={18} /> {t.text}</blockquote>
                <figcaption><strong>{t.author}</strong> <small>· {t.note}</small></figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.08}>
          <div className="reviews-cta">
            <Btn as="a" href="#/reviews" variant="outline">Все отзывы и рейтинг</Btn>
            <Btn as="a" href={SITE.gis} target="_blank" rel="noopener noreferrer" variant="ghost" size="sm">Читать отзывы в 2ГИС <IcArrow size={16} /></Btn>
          </div>
          <DemoNote>Рейтинг 5.0, 30 оценок и 25 отзывов — реальные данные карточки 2ГИС. Отмеченные «демо» тексты отзывов — примеры для макета.</DemoNote>
        </Reveal>
      </div>
    </section>
  );
}
function PricingSection() {
  return (
    <section className="section tint" id="sec-pricing">
      <SceneBg scene={ClassroomScene} />
      <div className="container">
        <SectionHead eyebrow="Форматы и цены" title="Выберите формат под свою задачу и график" lead="Первое занятие — бесплатное в любом формате. Оплачивайте картой, наличными, переводом или по QR." />
        <div className="grid grid-4 pricing">
          {PRICING.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.05}>
              <article className={`card price-card ${p.recommended ? 'rec' : ''}`}>
                {p.recommended && <span className="rec-badge">Выбирают чаще всего</span>}
                <h3 className="h3">{p.name}</h3>
                <p className="muted-sm">{p.desc}</p>
                <p className="price"><strong>{p.price}</strong> <small>{p.unit}</small></p>
                <ul className="ticks">
                  {p.features.map((f) => <li key={f}><IcCheck size={16} /> {f}</li>)}
                </ul>
                <Btn as="a" href="#/contact" variant={p.recommended ? 'primary' : 'outline'} block>{p.cta}</Btn>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.08}>
          <div className="pay-row" aria-label="Способы оплаты">
            <span className="muted-sm">Оплата:</span>
            {SITE.payments.map((p) => <Badge key={p} tone="gold">{p}</Badge>)}
          </div>
          <DemoNote>Цены и форматы — демо-данные для макета. Актуальную стоимость подтверждает администратор: {SITE.phone} (звонок и WhatsApp).</DemoNote>
        </Reveal>
      </div>
    </section>
  );
}
function FaqSection({ limit = 6, id = 'sec-faq' }: any) {
  const [open, setOpen] = useState(0);
  const items = limit ? FAQS.slice(0, limit) : FAQS;
  return (
    <section className="section" id={id}>
      <div className="container narrow">
        <SectionHead center eyebrow="FAQ" title="Частые вопросы — коротко и по делу" lead="Не нашли ответ? Поиск по базе школы или один звонок администратору закроют вопрос." />
        <div className="acc">
          {items.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.03}>
              <div className="acc-item">
                <button className="acc-btn" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
                  <span>{f.q}</span><IcChevron size={20} className={open === i ? 'rot' : ''} />
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div className="acc-body" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: 'easeInOut' }}>
                      <p>{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================== ФОРМА ============================== */
const COURSE_OPTIONS = ['Английский', 'Немецкий', 'Русский', 'Пока не выбрал(а)'];
function LeadForm({ compact = false }: { compact?: boolean }) {
  const toast = useToast();
  const [f, setF] = useState({ name: '', phone: '', course: COURSE_OPTIONS[0], comment: '', consent: false, website: '' });
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const set = (k: string, v: any) => { setF((p) => ({ ...p, [k]: v })); setErrors((p) => ({ ...p, [k]: undefined })); };
  const validate = () => {
    const e: Record<string, string> = {};
    if (f.name.trim().length < 2) e.name = 'Напишите, как к вам обращаться';
    if (!/^[+()\-\s\d]{7,20}$/.test(f.phone.trim())) e.phone = 'Телефон в формате +996 XXX-XX-XX-XX';
    if (!f.consent) e.consent = 'Нужно согласие на обработку данных';
    return e;
  };
  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (f.website) return; // honeypot
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    setStatus('loading');
    setTimeout(() => {
      try {
        // Требование: сохранять в истории последние два диалога / обращения
        const leads = lsGet('isa_leads', []);
        const nextLeads = [...leads, { ...f, ts: new Date().toISOString() }].slice(-2);
        lsSet('isa_leads', nextLeads);
        setStatus('success');
        toast('Заявка отправлена');
      } catch {
        setStatus('error');
      }
    }, 700);
  };
  if (status === 'success') {
    return (
      <div className="form-ok" role="status">
        <span className="ok-ico"><IcCheck size={26} /></span>
        <h3 className="h3">Заявка принята!</h3>
        <p>Администратор свяжется с вами в рабочее время и подберёт группу или слот для бесплатного занятия.</p>
        <div className="form-ok-btns">
          <Btn as="a" href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" variant="outline"><IcChat size={18} /> Написать в WhatsApp</Btn>
          <Btn as="a" href="#/" variant="ghost">На главную</Btn>
        </div>
      </div>
    );
  }
  return (
    <form className="lead-form" onSubmit={submit} noValidate>
      <input className="hp" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" value={f.website} onChange={(e) => set('website', e.target.value)} placeholder="Оставьте поле пустым" />
      <div className="field">
        <label htmlFor="lf-name">Имя</label>
        <input id="lf-name" className="input" type="text" inputMode="text" autoComplete="name" maxLength={60} required placeholder="Как к вам обращаться" value={f.name} onChange={(e) => set('name', e.target.value)} aria-invalid={!!errors.name} />
        {errors.name && <p className="f-err" role="alert">{errors.name}</p>}
      </div>
      <div className="field">
        <label htmlFor="lf-phone">Телефон</label>
        <input id="lf-phone" className="input" type="tel" inputMode="tel" autoComplete="tel" maxLength={20} required placeholder="+996 ___-__-__-__" value={f.phone} onChange={(e) => set('phone', e.target.value)} aria-invalid={!!errors.phone} />
        {errors.phone && <p className="f-err" role="alert">{errors.phone}</p>}
      </div>
      <div className="field">
        <label htmlFor="lf-course">Язык</label>
        <select id="lf-course" className="input" value={f.course} onChange={(e) => set('course', e.target.value)}>
          {COURSE_OPTIONS.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>
      {!compact && (
        <div className="field">
          <label htmlFor="lf-comment">Комментарий <small>(необязательно)</small></label>
          <textarea id="lf-comment" className="input" rows={3} maxLength={400} placeholder="Уровень, удобное время, вопросы" value={f.comment} onChange={(e) => set('comment', e.target.value)} />
        </div>
      )}
      <label className="consent">
        <input type="checkbox" checked={f.consent} onChange={(e) => set('consent', e.target.checked)} />
        <span>Согласен(на) на обработку персональных данных (<a href="#/privacy">политика</a>)</span>
      </label>
      {errors.consent && <p className="f-err" role="alert">{errors.consent}</p>}
      {status === 'error' && (
        <p className="f-err" role="alert">Не удалось отправить заявку. Попробуйте ещё раз или позвоните: {SITE.phone}</p>
      )}
      <Btn type="submit" block disabled={status === 'loading'} className="submit-btn">
        {status === 'loading' ? <><span className="spin" aria-hidden="true" /> Отправляем…</> : 'Записаться на бесплатное занятие'}
      </Btn>
      <p className="form-meta">Один звонок по делу. Без спама и передачи номера третьим лицам.</p>
    </form>
  );
}
function FinalCta() {
  return (
    <section className="section" id="sec-cta">
      <div className="container">
        <Reveal>
          <div className="cta-panel">
            <div className="cta-bg" aria-hidden="true"><ClassroomScene label="" /></div>
            <div className="cta-copy">
              <h2 className="h2">Приходите на бесплатное занятие — и решите сами</h2>
              <p>Посидите на реальном уроке, познакомьтесь с преподавателем и поймите, ваш ли формат. Зачисляться после этого не обязательно.</p>
              <ul className="cta-list">
                <li><IcCheck size={16} /> Тест уровня и рекомендация — бесплатно</li>
                <li><IcCheck size={16} /> Подберём группу до 8 человек и удобное время</li>
                <li><IcCheck size={16} /> Оплата картой, наличными, переводом или по QR</li>
              </ul>
              <div className="cta-alt">
                <a className="btn btn-wa" href={SITE.whatsapp} target="_blank" rel="noopener noreferrer"><IcChat size={18} /> WhatsApp</a>
                <a className="btn btn-wa outline" href={SITE.phoneHref}><IcPhone size={18} /> {SITE.phone}</a>
              </div>
            </div>
            <div className="cta-form">
              <LeadForm compact />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================== ФУТЕР / STICKY ============================== */
function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="f-col brand-col">
          <Logo />
          <p className="muted-sm">Образовательный центр в Оше: английский, немецкий и русский язык для детей и взрослых. Рейтинг 5.0 в 2ГИС по 30 оценкам.</p>
          <div className="socials">
            <a className="icon-btn ghost" href={SITE.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram школы"><IcInsta size={20} /></a>
            <a className="icon-btn ghost" href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp школы"><IcChat size={20} /></a>
            <a className="icon-btn ghost" href={SITE.phoneHref} aria-label="Позвонить"><IcPhone size={20} /></a>
            <a className="icon-btn ghost" href={SITE.gis} target="_blank" rel="noopener noreferrer" aria-label="Школа в 2ГИС"><IcPin size={20} /></a>
          </div>
        </div>
        <nav className="f-col" aria-label="Разделы сайта">
          <h3>Разделы</h3>
          <a className="flink" href="#/" onClick={(e) => { e.preventDefault(); goSection('sec-courses'); }}>Курсы</a>
          <a className="flink" href="#/" onClick={(e) => { e.preventDefault(); goSection('sec-pricing'); }}>Цены</a>
          <a className="flink" href="#/about">О школе</a>
          <a className="flink" href="#/reviews">Отзывы</a>
          <a className="flink" href="#/search">Поиск по сайту</a>
          <a className="flink" href="#/contact">Контакты и запись</a>
        </nav>
        <div className="f-col">
          <h3>Контакты</h3>
          <p className="f-line"><IcPin size={16} /> {SITE.address}</p>
          <p className="f-line"><IcPhone size={16} /> <a href={SITE.phoneHref}>{SITE.phone}</a></p>
          <p className="f-line"><IcClock size={16} /> {SITE.hours}</p>
          <p className="f-line"><IcInsta size={16} /> <a href={SITE.instagram} target="_blank" rel="noopener noreferrer">{SITE.instagramHandle}</a></p>
        </div>
        <div className="f-col">
          <h3>Оплата и ориентиры</h3>
          <div className="f-pay">{SITE.payments.map((p) => <Badge key={p} tone="gold">{p}</Badge>)}</div>
          <ul className="f-land">
            {SITE.landmarks.map((l) => <li key={l}>{l}</li>)}
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} Isa Academy (ISA International), Ош</p>
        <nav className="f-legal" aria-label="Правовая информация">
          <a className="flink" href="#/privacy">Политика конфиденциальности</a>
          <a className="flink" href="#/terms">Пользовательское соглашение</a>
        </nav>
        <p className="demo-note small">Часть данных (цены, расписание, программы, часть отзывов) — демо-примеры для макета; факты 2ГИС актуальны.</p>
      </div>
    </footer>
  );
}
function StickyCta({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div className="sticky-cta" initial={{ y: 80 }} animate={{ y: 0 }} exit={{ y: 80 }} transition={{ duration: 0.22 }}>
          <a className="icon-btn solid sticky-phone" href={SITE.phoneHref} aria-label={`Позвонить ${SITE.phone}`}><IcPhone size={20} /></a>
          <Btn as="a" href="#/contact" className="flex1 sticky-main-btn">Записаться на занятие</Btn>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ============================== ПОИСК: СТРАНИЦА ============================== */
function FilterSheet({ open, onClose, cats, setCats, types, setTypes, sort, setSort, onReset, activeCount }: any) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    if (open) window.addEventListener('keydown', onKey);
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open, onClose]);
  const toggle = (arr: string[], set: any, v: string) => set(arr.includes(v) ? arr.filter((x: string) => x !== v) : [...arr, v]);
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div className="backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} aria-hidden="true" />
          <motion.div className="sheet" role="dialog" aria-modal="true" aria-label="Фильтры поиска"
            initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'tween', duration: 0.28, ease: 'easeOut' }}>
            <div className="sheet-handle" aria-hidden="true" />
            <div className="sheet-head">
              <h2 className="h3">Фильтры</h2>
              <button className="icon-btn" aria-label="Закрыть фильтры" onClick={onClose}><IcX size={22} /></button>
            </div>
            <fieldset className="sheet-group">
              <legend>Категория</legend>
              <div className="chips-wrap">
                {CATEGORIES.map((c) => (
                  <button key={c} className={`chip ${cats.includes(c) ? 'on' : ''}`} aria-pressed={cats.includes(c)} onClick={() => toggle(cats, setCats, c)}>{c}</button>
                ))}
              </div>
            </fieldset>
            <fieldset className="sheet-group">
              <legend>Формат источника</legend>
              <div className="chips-wrap">
                {TYPES.map((t) => (
                  <button key={t} className={`chip ${types.includes(t) ? 'on' : ''}`} aria-pressed={types.includes(t)} onClick={() => toggle(types, setTypes, t)}>{TYPE_LABEL[t]}</button>
                ))}
              </div>
            </fieldset>
            <fieldset className="sheet-group">
              <legend>Сортировка</legend>
              <div className="chips-wrap">
                {[['relevance', 'По релевантности'], ['date', 'По дате'], ['alpha', 'По алфавиту']].map(([v, l]) => (
                  <button key={v} className={`chip ${sort === v ? 'on' : ''}`} aria-pressed={sort === v} onClick={() => setSort(v)}>{l}</button>
                ))}
              </div>
            </fieldset>
            <div className="sheet-foot">
              <Btn variant="outline" onClick={onReset}>Сбросить{activeCount ? ` (${activeCount})` : ''}</Btn>
              <Btn onClick={onClose}>Показать результаты</Btn>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
function ResultCard({ r, terms, maxScore, index }: any) {
  const toast = useToast();
  const pct = Math.min(99, Math.round(35 + (r.score / maxScore) * 64));
  return (
    <motion.article className="card result" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28, delay: Math.min(index * 0.04, 0.25) }}>
      <div className="res-meta">
        <Badge>{r.src.category}</Badge>
        <Badge tone="gold">{TYPE_LABEL[r.src.type]}</Badge>
        <span className="muted-sm res-date">{fmtDate(r.src.date)}</span>
        <span className="score" title="Релевантность запросу"><i style={{ width: pct + '%' }} />{pct}%</span>
      </div>
      <h3 className="h3 res-title"><a href={'#/source/' + r.src.slug}><Hl text={r.src.title} terms={terms} /></a></h3>
      <p className="res-snippet"><Hl text={r.snippet} terms={terms} /></p>
      <div className="res-tags">{r.src.tags.slice(0, 4).map((t: string) => <span key={t} className="tag">#{t}</span>)}</div>
      <div className="res-actions">
        <Btn as="a" href={'#/source/' + r.src.slug} size="sm" variant="ghost" className="res-link-btn">Открыть источник <IcArrow size={16} /></Btn>
        <div className="res-icon-actions">
          <button className="icon-btn ghost" aria-label="Скопировать ссылку на источник"
            onClick={async () => { const ok = await copyText(window.location.origin + window.location.pathname + '#/source/' + r.src.slug); toast(ok ? 'Ссылка скопирована' : 'Не удалось скопировать'); }}>
            <IcLink size={18} />
          </button>
          <button className="icon-btn ghost" aria-label="Скопировать цитату"
            onClick={async () => { const ok = await copyText(`«${r.snippet}» — ${r.src.title}, Isa Academy`); toast(ok ? 'Цитата скопирована' : 'Не удалось скопировать'); }}>
            <IcCopy size={18} />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
function SearchPage({ route }: any) {
  const [q, setQ] = useState(route.query.q || '');
  const dq = useDebounced(q, 260);
  const [status, setStatus] = useState(q ? 'loading' : 'idle');
  const [cats, setCats] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [sort, setSort] = useState('relevance');
  const [sheet, setSheet] = useState(false);
  // Требование: сохранять в истории последние два диалога / запроса
  const [history, setHistory] = useState<string[]>(() => lsGet('isa_q_history', []).slice(0, 2));
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    if (!dq.trim()) { setStatus('idle'); return; }
    setStatus('loading');
    const t = setTimeout(() => { setStatus('done'); }, 220);
    return () => clearTimeout(t);
  }, [dq, cats, types, sort, retry]);

  useEffect(() => {
    if (status === 'done' && dq.trim()) {
      // Сохраняем ровно 2 последних диалога / запроса в истории
      setHistory((h) => {
        const next = [dq.trim(), ...h.filter((x) => x !== dq.trim())].slice(0, 2);
        lsSet('isa_q_history', next);
        return next;
      });
    }
  }, [status]); // eslint-disable-line

  const results = useMemo(() => {
    if (!dq.trim()) return [];
    try { return searchSources(dq, { cats, types, sort }); } catch { return []; }
  }, [dq, cats, types, sort]);
  const maxScore = results.length ? results[0].score : 1;
  const activeCount = cats.length + types.length + (sort !== 'relevance' ? 1 : 0);
  const reset = () => { setCats([]); setTypes([]); setSort('relevance'); };
  const quick = useMemo(() => (!results.length || results[0].score < 5 ? null : results.slice(0, 2)), [results]);
  return (
    <div className="page">
      <div className="container narrow-wide">
        <header className="page-head">
          <span className="eyebrow"><IcSearch size={14} /> Поиск по базе школы</span>
          <h1 className="h2">Найдём ответ по программам, ценам, расписанию и контактам</h1>
          <p className="lead">Поиск идёт по заголовкам, содержимому, тегам и категориям {SOURCES.length} источников школы. Ответы собираются только из базы — ничего не выдумывается.</p>
        </header>
        <SearchBox big autoFocus value={q} onChange={setQ} onSubmit={(v: string) => setQ(v)} />
        {!q.trim() && (
          <div className="suggests">
            {history.length > 0 && (
              <div className="suggest-row">
                <span className="muted-sm">Последние 2 диалога / запроса в истории:</span>
                <div className="chips-row">
                  {history.map((h) => <button key={h} className="chip on" onClick={() => setQ(h)}>{h}</button>)}
                </div>
              </div>
            )}
            <div className="suggest-row">
              <span className="muted-sm">Популярные запросы:</span>
              <div className="chips-row">{POPULAR.map((p) => <button key={p} className="chip" onClick={() => setQ(p)}>{p}</button>)}</div>
            </div>
          </div>
        )}
        {q.trim() && (
          <>
            <div className="search-toolbar">
              <p className="muted-sm search-count-text" aria-live="polite">
                {status === 'loading' ? 'Ищем…' : status === 'done' ? `Найдено: ${results.length}` : ''}
              </p>
              <div className="toolbar-right">
                <label className="sort-wrap">
                  <span className="muted-sm sort-label">Сортировка</span>
                  <select className="input select" value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Сортировка результатов">
                    <option value="relevance">По релевантности</option>
                    <option value="date">По дате</option>
                    <option value="alpha">По алфавиту</option>
                  </select>
                </label>
                <button className="btn btn-outline btn-sm filters-btn" onClick={() => setSheet(true)} aria-label="Открыть фильтры">
                  <IcFilter size={18} /> Фильтры{activeCount ? ` · ${activeCount}` : ''}
                </button>
              </div>
            </div>
            <div className="chips-wrap desktop-filters" aria-label="Фильтр по категориям">
              {CATEGORIES.map((c) => (
                <button key={c} className={`chip ${cats.includes(c) ? 'on' : ''}`} aria-pressed={cats.includes(c)}
                  onClick={() => setCats(cats.includes(c) ? cats.filter((x) => x !== c) : [...cats, c])}>{c}</button>
              ))}
              {activeCount > 0 && <button className="chip reset" onClick={reset}><IcX size={14} /> Сбросить всё</button>}
            </div>
            {quick && status === 'done' && (
              <div className="quick-answer">
                <p className="qa-head"><IcSpark size={16} /> Краткий ответ <small>собран автоматически из источников, без редактуры</small></p>
                {quick.map((r) => (
                  <blockquote key={r.src.id}>
                    <Hl text={r.snippet} terms={r.terms} />
                    <cite><a href={'#/source/' + r.src.slug}>{r.src.title}</a> · {r.src.category}</cite>
                  </blockquote>
                ))}
              </div>
            )}
            <div className="results" aria-label="Результаты поиска">
              {status === 'loading' && [0, 1, 2].map((i) => (
                <div className="card result sk-card" key={i} aria-hidden="true">
                  <div className="sk" style={{ width: '40%', height: 14 }} />
                  <div className="sk" style={{ width: '75%', height: 22, marginTop: 12 }} />
                  <div className="sk" style={{ width: '100%', height: 14, marginTop: 12 }} />
                  <div className="sk" style={{ width: '90%', height: 14, marginTop: 8 }} />
                </div>
              ))}
              {status === 'done' && results.map((r, i) => <ResultCard key={r.src.id} r={r} terms={r.terms} maxScore={maxScore} index={i} />)}
              {status === 'done' && !results.length && (
                <div className="empty">
                  <span className="empty-ico"><IcSearch size={26} /></span>
                  <h3 className="h3">По запросу «{q}» ничего не нашлось</h3>
                  <p>Проверьте раскладку и опечатки или попробуйте один из популярных запросов. Если ответа нет в базе — администратор ответит по телефону.</p>
                  <div className="chips-wrap center">{POPULAR.slice(0, 4).map((p) => <button key={p} className="chip" onClick={() => setQ(p)}>{p}</button>)}</div>
                  <div className="empty-btns">
                    <Btn variant="outline" onClick={reset}>Сбросить фильтры</Btn>
                    <Btn as="a" href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" variant="ghost">Спросить в WhatsApp</Btn>
                  </div>
                </div>
              )}
              {status === 'error' && (
                <div className="empty">
                  <span className="empty-ico"><IcInfo size={26} /></span>
                  <h3 className="h3">Поиск временно недоступен</h3>
                  <p>Что-то пошло не так при обработке запроса. Попробуйте ещё раз — обычно помогает.</p>
                  <Btn onClick={() => setRetry((r) => r + 1)}>Повторить поиск</Btn>
                </div>
              )}
            </div>
          </>
        )}
      </div>
      <FilterSheet open={sheet} onClose={() => setSheet(false)} cats={cats} setCats={setCats} types={types} setTypes={setTypes} sort={sort} setSort={setSort} onReset={reset} activeCount={activeCount} />
    </div>
  );
}

/* ============================== ИСТОЧНИК ============================== */
function SourcePage({ slug }: { slug: string }) {
  const toast = useToast();
  const src = SOURCES.find((s) => s.slug === slug);
  if (!src) return <NotFound />;
  const related = SOURCES.filter((s) => s.id !== src.id && (s.category === src.category || s.tags.some((t) => src.tags.includes(t)))).slice(0, 3);
  const paragraphs = src.content.split('\n\n');
  return (
    <div className="page">
      <div className="container narrow-wide">
        <nav className="crumbs" aria-label="Хлебные крошки">
          <a href="#/search"><IcBack size={16} /> К поиску</a>
          <span aria-hidden="true">/</span>
          <span className="muted-sm">{src.category}</span>
        </nav>
        <header className="page-head">
          <div className="res-meta">
            <Badge>{src.category}</Badge>
            <Badge tone="gold">{TYPE_LABEL[src.type]}</Badge>
            <span className="muted-sm">обновлено {fmtDate(src.date)}</span>
            {src.featured && <Badge tone="ok">ключевой источник</Badge>}
          </div>
          <h1 className="h2">{src.title}</h1>
          <p className="lead">{src.description}</p>
          <div className="res-tags">{src.tags.map((t) => <span key={t} className="tag">#{t}</span>)}</div>
        </header>
        <div className="src-actions">
          <button className="btn btn-outline btn-sm" onClick={async () => { const ok = await copyText(window.location.origin + window.location.pathname + '#/source/' + src.slug); toast(ok ? 'Ссылка скопирована' : 'Не удалось скопировать'); }}>
            <IcLink size={16} /> Скопировать ссылку
          </button>
          <button className="btn btn-outline btn-sm" onClick={async () => { const ok = await copyText(`«${src.content.split('\n\n')[0]}» — ${src.title}, Isa Academy`); toast(ok ? 'Цитата скопирована' : 'Не удалось скопировать'); }}>
            <IcCopy size={16} /> Скопировать цитату
          </button>
          <a className="btn btn-ghost btn-sm" href={SITE.whatsapp} target="_blank" rel="noopener noreferrer"><IcChat size={16} /> Уточнить в WhatsApp</a>
        </div>
        <article className="card src-body">
          {paragraphs.map((p, i) => p.startsWith('- ')
            ? <ul key={i} className="src-list">{p.split('\n').map((li) => <li key={li}>{li.replace(/^- /, '')}</li>)}</ul>
            : <p key={i}>{p}</p>)}
          <DemoNote>Источник хранится в индексе сайта в формате {TYPE_LABEL[src.type]}. {src.category === 'Цены' || src.category === 'Организация' ? 'Часть данных — демо-примеры: актуальное подтверждает администратор.' : 'Факты 2ГИС актуальны; демо-данные помечены в тексте.'}</DemoNote>
        </article>
        {related.length > 0 && (
          <section className="related">
            <h2 className="h3">Связанные материалы</h2>
            <div className="grid grid-3">
              {related.map((r) => (
                <a key={r.id} className="card rel-card" href={'#/source/' + r.slug}>
                  <Badge>{r.category}</Badge>
                  <strong>{r.title}</strong>
                  <small className="muted-sm">{r.description}</small>
                </a>
              ))}
            </div>
          </section>
        )}
        <button className="btn btn-ghost btn-sm to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><IcChevron size={16} className="rot180" /> Наверх</button>
      </div>
    </div>
  );
}

/* ============================== СТРАНИЦЫ ============================== */
function AboutPage() {
  return (
    <div className="page">
      <div className="container narrow-wide">
        <header className="page-head">
          <span className="eyebrow"><IcGlobe size={14} /> О школе</span>
          <h1 className="h2">Isa Academy: язык как инструмент, а не предмет</h1>
          <p className="lead">Образовательный центр в Оше: английский, немецкий и русский для детей и взрослых. Рейтинг 2ГИС — 5.0 по 30 оценкам, в карточке 25 отзывов.</p>
        </header>
        <Reveal>
          <div className="about-scenes" aria-hidden="true">
            <div className="about-scene"><ReceptionScene label="" /></div>
            <div className="about-scene"><ClassroomScene label="" /></div>
          </div>
        </Reveal>
        <div className="grid grid-2 about-grid">
          <Reveal>
            <article className="card">
              <h2 className="h3">Миссия и подход <Badge tone="gold">демо</Badge></h2>
              <p>Мы открыли школу, чтобы иностранный язык перестал быть школьным предметом и стал рабочим инструментом: для учёбы, работы, переезда и уверенного общения.</p>
              <ul className="ticks">
                <li><IcCheck size={16} /> Коммуникативная методика: большую часть урока говорим</li>
                <li><IcCheck size={16} /> Малые группы до 8 человек — преподаватель слышит каждого</li>
                <li><IcCheck size={16} /> Прозрачные уровни A0–C1 и тесты после каждого модуля</li>
                <li><IcCheck size={16} /> Отчёты преподавателя: прогресс виден, а не «кажется»</li>
              </ul>
            </article>
          </Reveal>
          <Reveal delay={0.08}>
            <article className="card">
              <h2 className="h3">Команда <Badge tone="gold">демо</Badge></h2>
              <ul className="team">
                <li><span className="avatar" aria-hidden="true">А</span><div><strong>Айгерим</strong><small>английский язык · 6 лет практики · модули B1–C1 и IELTS</small></div></li>
                <li><span className="avatar" aria-hidden="true">Н</span><div><strong>Нурзат</strong><small>немецкий язык · профильное образование · курсы A1–B1</small></div></li>
                <li><span className="avatar" aria-hidden="true">Г</span><div><strong>Гульнара</strong><small>русский язык · филолог · группы школьников и взрослых</small></div></li>
              </ul>
              <DemoNote>Состав команды и регалии — демо-данные для макета.</DemoNote>
            </article>
          </Reveal>
        </div>
        <Reveal>
          <article className="card facts-card">
            <h2 className="h3">Факты и расположение</h2>
            <div className="grid grid-2">
              <ul className="ticks">
                <li><IcStar size={16} /> Рейтинг 5.0 в 2ГИС: 30 оценок, 25 отзывов</li>
                <li><IcGlobe size={16} /> Три языка: английский, немецкий, русский</li>
                <li><IcWallet size={16} /> Оплата: карта, наличные, перевод, перевод с карты, QR</li>
              </ul>
              <ul className="ticks">
                <li><IcPin size={16} /> {SITE.address}</li>
                {SITE.landmarks.map((l) => <li key={l}><IcPin size={16} /> {l}</li>)}
              </ul>
            </div>
            <div className="reviews-cta">
              <Btn as="a" href="#/contact">Записаться на бесплатное занятие</Btn>
              <Btn as="a" href={SITE.gis} target="_blank" rel="noopener noreferrer" variant="ghost" size="sm">Открыть в 2ГИС <IcArrow size={16} /></Btn>
            </div>
          </article>
        </Reveal>
      </div>
    </div>
  );
}
function ReviewsPage() {
  return (
    <div className="page">
      <div className="container narrow-wide">
        <header className="page-head">
          <span className="eyebrow"><IcStar size={14} /> Отзывы</span>
          <h1 className="h2">Репутация, подтверждённая оценками</h1>
        </header>
        <Reveal>
          <div className="card rating-card">
            <div className="rating-big"><strong>5.0</strong><div><Stars size={20} /><p className="muted-sm">30 оценок и 25 отзывов в 2ГИС</p></div></div>
            <div className="rating-bars" aria-hidden="true">
              {[['5', 100], ['4', 0], ['3', 0], ['2', 0], ['1', 0]].map(([l, w]) => (
                <div key={l} className="rbar"><span>{l}★</span><i><b style={{ width: w + '%' }} /></i><small>{w}%</small></div>
              ))}
            </div>
            <Btn as="a" href={SITE.gis} target="_blank" rel="noopener noreferrer" variant="outline" className="rating-gis-btn">Читать все отзывы в 2ГИС</Btn>
          </div>
        </Reveal>
        <div className="grid grid-2">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.author + i} delay={(i % 2) * 0.05}>
              <figure className="card review">
                <div className="review-top"><Stars />{t.real && <Badge tone="ok">2ГИС · факт</Badge>}</div>
                <blockquote><IcQuote size={18} /> {t.text}</blockquote>
                <figcaption><strong>{t.author}</strong> <small>· {t.note}</small></figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <Reveal><DemoNote>Рейтинг, число оценок и отзывов — реальные данные 2ГИС. Тексты с пометкой «демо» — примеры для макета; отзыв с пометкой «2ГИС · факт» — перевод реального отзыва (с кыргызского).</DemoNote></Reveal>
        <Reveal>
          <div className="cta-inline">
            <h2 className="h3">Учились у нас? Расскажите о своём опыте</h2>
            <div className="reviews-cta">
              <Btn as="a" href={SITE.gis} target="_blank" rel="noopener noreferrer">Оставить отзыв в 2ГИС</Btn>
              <Btn as="a" href="#/contact" variant="ghost">Написать школе</Btn>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
function ContactPage() {
  return (
    <div className="page">
      <div className="container narrow-wide">
        <header className="page-head">
          <span className="eyebrow"><IcSend size={14} /> Запись и контакты</span>
          <h1 className="h2">Запишитесь на бесплатное первое занятие</h1>
          <p className="lead">Оставьте заявку — администратор перезвонит в рабочее время, ответит на вопросы и подберёт группу или слот. Либо напишите сразу в WhatsApp.</p>
        </header>
        <div className="grid grid-2 contact-grid">
          <Reveal>
            <div className="card form-card"><LeadForm /></div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="contact-side">
              <article className="card">
                <h2 className="h3">Контакты</h2>
                <p className="f-line"><IcPin size={16} /> {SITE.address}</p>
                <p className="f-line"><IcPhone size={16} /> <a href={SITE.phoneHref}>{SITE.phone}</a></p>
                <p className="f-line"><IcChat size={16} /> <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp: {SITE.phone}</a></p>
                <p className="f-line"><IcInsta size={16} /> <a href={SITE.instagram} target="_blank" rel="noopener noreferrer">Instagram {SITE.instagramHandle}</a></p>
                <p className="f-line"><IcClock size={16} /> {SITE.hours}</p>
              </article>
              <article className="card">
                <h2 className="h3">Как добраться</h2>
                <ul className="ticks">{SITE.landmarks.map((l) => <li key={l}><IcPin size={16} /> {l}</li>)}</ul>
                <Btn as="a" href={SITE.gis} target="_blank" rel="noopener noreferrer" variant="outline" block>Построить маршрут в 2ГИС</Btn>
              </article>
              <article className="card">
                <h2 className="h3">Оплата</h2>
                <div className="f-pay">{SITE.payments.map((p) => <Badge key={p} tone="gold">{p}</Badge>)}</div>
              </article>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
function LegalPage({ kind }: { kind: 'privacy' | 'terms' }) {
  const isP = kind === 'privacy';
  return (
    <div className="page">
      <div className="container narrow">
        <header className="page-head">
          <h1 className="h2">{isP ? 'Политика конфиденциальности' : 'Пользовательское соглашение'}</h1>
          <p className="muted-sm">Редакция от {fmtDate('2025-06-01')}</p>
        </header>
        <article className="card legal">
          {isP ? (
            <>
              <h2 className="h3">1. Оператор данных</h2>
              <p>Оператор персональных данных — образовательный центр Isa Academy (ISA International), {SITE.address}, телефон {SITE.phone}.</p>
              <h2 className="h3">2. Какие данные мы собираем</h2>
              <p>Через формы сайта: имя, номер телефона, выбранный язык и необязательный комментарий. Иных данных сайт не запрашивает.</p>
              <h2 className="h3">3. Зачем мы их используем</h2>
              <p>Только для связи по вашей заявке: подбор группы, расписания и ответа на вопросы. Данные не используются для рассылок без отдельного согласия и не передаются третьим лицам, кроме случаев, предусмотренных законом.</p>
              <h2 className="h3">4. Хранение и отзыв согласия</h2>
              <p>Заявки хранятся у оператора и удаляются по вашему запросу. Отозвать согласие можно звонком на {SITE.phone} или сообщением в WhatsApp.</p>
            </>
          ) : (
            <>
              <h2 className="h3">1. О сайте</h2>
              <p>Сайт Isa Academy информирует о программах, расписании, ценах и порядке записи образовательного центра в Оше и не является публичной офертой.</p>
              <h2 className="h3">2. Демо-данные</h2>
              <p>Цены, расписание, уровни, состав команды и часть отзывов помечены как демо-примеры и уточняются у администратора. Фактические данные (адрес, телефон, рейтинг и отзывы 2ГИС, способы оплаты) взяты из открытой карточки организации.</p>
              <h2 className="h3">3. Интеллектуальная собственность</h2>
              <p>Тексты, дизайн и поисковый индекс сайта принадлежат оператору. Копирование материалов без согласия не допускается.</p>
              <h2 className="h3">4. Ответственность</h2>
              <p>Мы стараемся держать информацию актуальной, но итоговые условия обучения подтверждает администратор. Вопросы: {SITE.phone}.</p>
            </>
          )}
        </article>
      </div>
    </div>
  );
}
function NotFound() {
  return (
    <div className="page">
      <div className="container narrow empty-page">
        <span className="nf-code" aria-hidden="true">404</span>
        <h1 className="h2">Такой страницы нет</h1>
        <p className="lead">Возможно, ссылка устарела. Вернитесь на главную или найдите нужное по базе школы.</p>
        <div className="empty-btns">
          <Btn as="a" href="#/">На главную</Btn>
          <Btn as="a" href="#/search" variant="outline">Открыть поиск</Btn>
        </div>
      </div>
    </div>
  );
}
function HomePage() {
  return (
    <>
      <Hero />
      <StepsSection />
      <BenefitsSection />
      <CoursesSection />
      <DemoSearchSection />
      <ReviewsSection />
      <PricingSection />
      <FaqSection limit={6} />
      <FinalCta />
    </>
  );
}

/* ============================== ROOT ============================== */
const META: Record<string, [string, string]> = {
  '/': ['Isa Academy — курсы английского, немецкого и русского в Оше | Рейтинг 5.0', 'Образовательный центр в Оше: английский, немецкий, русский. Группы до 8 человек, рейтинг 5.0 в 2ГИС. Запишитесь на бесплатное первое занятие.'],
  '/search': ['Поиск по информации школы — Isa Academy', 'Мгновенный поиск по программам, ценам, расписанию, оплате и контактам школы Isa Academy в Оше.'],
  '/about': ['О школе, методике и команде — Isa Academy', 'Миссия, подход и команда образовательного центра Isa Academy в Оше. Факты, расположение и рейтинги.'],
  '/reviews': ['Отзывы учеников и рейтинг 5.0 — Isa Academy', '30 оценок и 25 отзывов в 2ГИС: что говорят ученики Isa Academy в Оше.'],
  '/contact': ['Запись на бесплатное занятие — Isa Academy', 'Оставьте заявку или напишите в WhatsApp: подберём группу и время для бесплатного первого занятия.'],
  '/privacy': ['Политика конфиденциальности — Isa Academy', 'Как Isa Academy собирает, использует и хранит персональные данные заявок.'],
  '/terms': ['Пользовательское соглашение — Isa Academy', 'Условия использования сайта Isa Academy: демо-данные, собственность, ответственность.'],
};

export default function App() {
  const route = useRoute();
  const reduce = useReducedMotion();
  const [theme, setTheme] = useState<'light' | 'dark'>(() => lsGet('isa_theme', 'light'));
  const [toasts, setToasts] = useState<{ id: number; text: string }[]>([]);
  const toast = useCallback((text: string) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, text }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2600);
  }, []);
  useEffect(() => { lsSet('isa_theme', theme); document.documentElement.style.colorScheme = theme; }, [theme]);
  useEffect(() => {
    if (pendingScroll) { const id = pendingScroll; pendingScroll = null; setTimeout(() => scrollNow(id), 80); }
    else window.scrollTo({ top: 0, behavior: 'auto' });
  }, [route.path]);
  useEffect(() => {
    const [t, d] = META[route.path] || (route.path.startsWith('/source/')
      ? ['Источник: Isa Academy', 'Содержимое источника базы знаний школы.']
      : ['Страница не найдена — Isa Academy', 'Такой страницы нет. Вернитесь на главную или воспользуйтесь поиском.']);
    document.title = t;
    let m = document.querySelector('meta[name="description"]');
    if (!m) { m = document.createElement('meta'); m.setAttribute('name', 'description'); document.head.appendChild(m); }
    m.setAttribute('content', d);
  }, [route.path]);
  useEffect(() => {
    if (document.getElementById('isa-ld')) return;
    const s = document.createElement('script');
    s.type = 'application/ld+json'; s.id = 'isa-ld';
    s.textContent = JSON.stringify({
      '@context': 'https://schema.org', '@type': 'EducationalOrganization', name: 'Isa Academy (ISA International)',
      address: { '@type': 'PostalAddress', streetAddress: 'ул. Ташкентская, 28/1, 2 этаж', addressLocality: 'Ош', addressCountry: 'KG' },
      telephone: '+996 707-18-20-03', sameAs: [SITE.instagram, SITE.whatsapp],
      aggregateRating: { '@type': 'AggregateRating', ratingValue: SITE.rating, reviewCount: SITE.ratingsCount, bestRating: 5 },
    });
    document.head.appendChild(s);
  }, []);

  let page;
  if (route.path === '/') page = <HomePage />;
  else if (route.path === '/search') page = <SearchPage route={route} />;
  else if (route.path.startsWith('/source/')) page = <SourcePage slug={route.path.split('/source/')[1]} />;
  else if (route.path === '/about') page = <AboutPage />;
  else if (route.path === '/reviews') page = <ReviewsPage />;
  else if (route.path === '/contact') page = <ContactPage />;
  else if (route.path === '/privacy') page = <LegalPage kind="privacy" />;
  else if (route.path === '/terms') page = <LegalPage kind="terms" />;
  else page = <NotFound />;

  const showSticky = route.path !== '/contact';

  return (
    <ToastCtx.Provider value={toast}>
      <div className={`app ${showSticky ? 'has-sticky' : ''}`} data-theme={theme}>
        <style>{CSS}</style>
        <a className="skip" href="#main">Перейти к содержимому</a>
        <Header route={route} theme={theme} onTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
        <main id="main">
          <AnimatePresence mode="wait">
            <motion.div key={route.path} initial={reduce ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              {page}
            </motion.div>
          </AnimatePresence>
        </main>
        <Footer />
        <StickyCta show={showSticky} />
        <ToastHost toasts={toasts} />
      </div>
    </ToastCtx.Provider>
  );
}

/* ============================== ДИЗАЙН-СИСТЕМА ============================== */
const CSS = ``;
