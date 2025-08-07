import axios from "axios";
import Section from "../components/Section";
import { useEffect, useMemo, useState } from "react";
import styles from '../styles/VKR.module.css'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/Check';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useTranslation } from "react-i18next";
import Tooltip from '@mui/material/Tooltip';

const VKR = () => {

    const [t] = useTranslation()

    const [nameInstitute, setNameInstitute] = useState() // State для названия института
    const [nameDepartment, setNameDepartment] = useState() // State для названия кафедры
    const [nameDiplomа, setNameDiplomа] = useState() // State для названия диплома
    const [typeDiplomа, setTypeDiplomа] = useState() // State для типа диплома
    const [referralCode, setReferralCode] = useState() // State для кода направления
    const [referralName, setReferralName] = useState() // State для названия направления
    const [files, setFiles] = useState({}) // State для файлов диплома
    const [fullNameAuthor, setFullNameAuthor] = useState({
        secondname: '',
        firstname: '',
        lastname: '',
        email: ''
    }) // State для ФИО автора
    const [fullNameScientificSupervisor, setFullNameScientificSupervisor] = useState({
        secondname: '',
        firstname: '',
        lastname: '',
        scientific_regalia: ''
    }) // State для ФИО научного руководителя

    const [tooltipFullNameAuthor, setTooltipFullNameAuthor] = useState({
        firstname: false,
        secondname: false,
        lastname: false,
    })

    const [tooltipFullNameScientificSupervisor, setTooltipFullNameScientificSupervisor] = useState({
        firstname: false,
        secondname: false,
        lastname: false,
    })

    const [allScientificSupervisors, setAllScientificSupervisors] = useState([])

    const fetchAllScientificSupervisors = async () => {
        try {
            const response = await axios.get(`${process.env.PUBLIC_VKR_API}/emploees`)
            setAllScientificSupervisors(response.data)
        } catch (error) {
            console.error(error)
        }
    }

    const [allInstitute, allDepartaments] = useMemo(() => {
        return [
            allScientificSupervisors?.map(scientificSupervisors => scientificSupervisors[0]),
            allScientificSupervisors?.map(scientificSupervisors => scientificSupervisors[1].map(Departametns => Departametns[0])).flat(1)
        ]
    }, [allScientificSupervisors])

    useEffect(() => {
        fetchAllScientificSupervisors()
    }, [])

    useEffect(() => {
        if ((fullNameAuthor.firstname.length > 0) || (fullNameAuthor.secondname.length > 0) || (fullNameAuthor.lastname.length > 0)) {
            for (const [key, value] of Object.entries(fullNameAuthor)) {
                switch (key) {
                    case "firstname":
                        if ((value.length <= 2) || (value.includes('.'))) {
                            setTooltipFullNameAuthor(prev => ({ ...prev, firstname: true }))
                            return;
                        } else setTooltipFullNameAuthor(prev => ({ ...prev, firstname: false }))
                        break;
                    case "secondname":
                        if ((value.length <= 2) || (value.includes('.'))) {
                            setTooltipFullNameAuthor(prev => ({ ...prev, secondname: true }))
                            return;
                        } else setTooltipFullNameAuthor(prev => ({ ...prev, secondname: false }))
                        break;
                    case "lastname":
                        if ((value.length <= 2) || (value.includes('.'))) {
                            setTooltipFullNameAuthor(prev => ({ ...prev, lastname: true }))
                            return;
                        } else setTooltipFullNameAuthor(prev => ({ ...prev, lastname: false }))
                        break;
                    default:
                        break;
                }
            }
        }
        if (((fullNameScientificSupervisor?.firstname?.length > 0) || (fullNameScientificSupervisor?.secondname?.length > 0) || (fullNameScientificSupervisor?.lastname?.length > 0)) && !(fullNameScientificSupervisor instanceof Array)) {
            for (const [key, value] of Object.entries(fullNameScientificSupervisor)) {
                switch (key) {
                    case "firstname":
                        if ((value.length <= 2) || (value.includes('.'))) {
                            setTooltipFullNameScientificSupervisor(prev => ({ ...prev, firstname: true }))
                            return;
                        } else setTooltipFullNameScientificSupervisor(prev => ({ ...prev, firstname: false }))
                        break;
                    case "secondname":
                        if ((value.length <= 2) || (value.includes('.'))) {
                            setTooltipFullNameScientificSupervisor(prev => ({ ...prev, secondname: true }))
                            return;
                        } else setTooltipFullNameScientificSupervisor(prev => ({ ...prev, secondname: false }))
                        break;
                    case "lastname":
                        if ((value.length <= 2) || (value.includes('.'))) {
                            setTooltipFullNameScientificSupervisor(prev => ({ ...prev, lastname: true }))
                            return;
                        } else setTooltipFullNameScientificSupervisor(prev => ({ ...prev, lastname: false }))
                        break;
                    default:
                        break;
                }
            }
        } else if (fullNameScientificSupervisor instanceof Array) {
            fullNameScientificSupervisor.forEach((e, i) => {
                for (const [key, value] of Object.entries(e)) {
                    switch (key) {
                        case "firstname":
                            if ((value.length <= 2) || (value.includes('.'))) {
                                setTooltipFullNameScientificSupervisor(prev => prev.map((name, index) => index === i ? ({ ...name, [key]: true }) : name))
                                return;
                            } else setTooltipFullNameScientificSupervisor(prev => prev.map((name, index) => index === i ? ({ ...name, [key]: false }) : name))
                            break;
                        case "secondname":
                            if ((value.length <= 2) || (value.includes('.'))) {
                                setTooltipFullNameScientificSupervisor(prev => prev.map((name, index) => index === i ? ({ ...name, [key]: true }) : name))
                                return;
                            } else setTooltipFullNameScientificSupervisor(prev => prev.map((name, index) => index === i ? ({ ...name, [key]: false }) : name))
                            break;
                        case "lastname":
                            if ((value.length <= 2) || (value.includes('.'))) {
                                setTooltipFullNameScientificSupervisor(prev => prev.map((name, index) => index === i ? ({ ...name, [key]: true }) : name))
                                return;
                            } else setTooltipFullNameScientificSupervisor(prev => prev.map((name, index) => index === i ? ({ ...name, [key]: false }) : name))
                            break;
                        default:
                            break;
                    }
                }
            })
        }
    }, [fullNameAuthor, fullNameScientificSupervisor])

    const submitVKR = async (event) => {
        event.preventDefault();

        for (const [key, value] of Object.entries(fullNameAuthor)) {
            switch (key) {
                case "firstname":
                    if ((value.length <= 2) || (value.includes('.'))) {
                        setTooltipFullNameAuthor(prev => ({ ...prev, firstname: true }))
                        return;
                    }
                    break;
                case "secondname":
                    if ((value.length <= 2) || (value.includes('.'))) {
                        setTooltipFullNameAuthor(prev => ({ ...prev, secondname: true }))
                        return;
                    }
                    break;
                case "lastname":
                    if ((value.length <= 2) || (value.includes('.'))) {
                        setTooltipFullNameAuthor(prev => ({ ...prev, lastname: true }))
                        return;
                    }
                    break;
                default:
                    break;
            }
        }
        if (!(fullNameScientificSupervisor instanceof Array)) {
            for (const [key, value] of Object.entries(fullNameScientificSupervisor)) {
                switch (key) {
                    case "firstname":
                        if ((value.length <= 2) || (value.includes('.'))) {
                            setTooltipFullNameScientificSupervisor(prev => ({ ...prev, firstname: true }))
                            return;
                        }
                        break;
                    case "secondname":
                        if ((value.length <= 2) || (value.includes('.'))) {
                            setTooltipFullNameScientificSupervisor(prev => ({ ...prev, secondname: true }))
                            return;
                        }
                        break;
                    case "lastname":
                        if ((value.length <= 2) || (value.includes('.'))) {
                            setTooltipFullNameScientificSupervisor(prev => ({ ...prev, lastname: true }))
                            return;
                        }
                        break;
                    default:
                        break;
                }
            }
        }
        const formData = new FormData();

        // Добавляем JSON данные
        formData.append('data', JSON.stringify({
            nameInstitute,
            nameDepartment,
            nameDiplomа,
            typeDiplomа,
            referralCode,
            referralName,
            fullNameAuthor,
            fullNameScientificSupervisor
        }));

        // Добавляем файлы
        Object.entries(files).forEach(([key, value]) => {
            if (value instanceof File) {
                formData.append(`files[${key}]`, value);
            }
        });

        try {
            const response = await fetch(`${process.env.PUBLIC_VKR_API}/VKR`, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            await response.json();
            alert('Данные успешно отправлены!');
        } catch (error) {
            console.error('Error:', error);
            alert('Ошибка при отправке данных');
        }
    };

    const uploadFile = (event, fileName) => {
        const file = event.target.files[0]
        if (file.name.split().pop().toLowerCase() === 'pdf' || file.type === 'application/pdf') {
            setFiles(prevFiles => ({ ...prevFiles, [fileName]: file }))
        } else {
            setFiles(prevFiles => ({ ...prevFiles, [fileName]: 'Incorrect format' }))
        }
    }

    const parseFullNameValue = (name) => {
        switch (name) {
            case 'firstname':
                return ['Имя', 'полное имя']
            case 'secondname':
                return ['Фамилия', 'полную фамилию']
            case 'lastname':
                return ['Отчество', 'полное отчество']
            default:
                break;
        }
    }

    const filesListClass = (fileName) => {
        if (files[fileName] === 'Incorrect format') { return styles.incorrect_format }
        if (typeof files[fileName] === 'object') { return styles.correct_format }
    }

    return (
        <Section title={t('VKR')}>
            <form action="" onSubmit={submitVKR}>
                <div>
                    <h1>{t('info_about_work')}</h1>
                    <div>
                        <input className={styles.input} type="text" required placeholder={t('name_diplom')} value={nameDiplomа} onChange={e => setNameDiplomа(e.target.value)} />
                        <select className={styles.input} name="" id="" required value={typeDiplomа} onChange={e => setTypeDiplomа(e.target.value)}>
                            <option value="">{t('type_diplom')}</option>
                            <option value="диломная работа">{t('diplom')}</option>
                            <option value="бакалаврская работа">{t('bachelor')}</option>
                            <option value="магистерская диссертация">{t('master')}</option>
                            <option value="научный доклад об основных результатах подготовленной научно-квалификационной работы (диссертации)">{t('graduate_student')}</option>
                        </select>
                        <input className={styles.input} type="text" required placeholder={t('referral_code')} value={referralCode} onChange={e => setReferralCode(e.target.value)} />
                        <input className={styles.input} type="text" required placeholder={t('referral_name')} value={referralName} onChange={e => setReferralName(e.target.value)} />
                    </div>
                </div>
                <div>
                    <h1>
                        {t('files_fqw')}
                    </h1>
                    <div >
                        {typeDiplomа ?
                            <ul className={styles.files_list}>
                                <li className={filesListClass('title_page')}>
                                    <label htmlFor="title_page">
                                        <div>Титульный лист с подписями, подтверждающими допуск работы к защите</div>
                                        <input className={styles.file_input} required type="file" name="title_page" id="title_page" onChange={event => uploadFile(event, 'title_page')} />
                                        <CheckBoxOutlineBlankIcon className={styles.check_icon_outline} />
                                        <CheckBoxIcon className={styles.check_icon} />
                                    </label>
                                </li>
                                {typeDiplomа !== "научный доклад об основных результатах подготовленной научно-квалификационной работы (диссертации)"
                                    &&
                                    <li>
                                        <label htmlFor="task_sheet" className={filesListClass('task_sheet')}>
                                            <div>Лист с заданием на ВКР (при наличии)</div>
                                            <input className={styles.file_input} type="file" name="task_sheet" id="task_sheet" onChange={event => uploadFile(event, 'task_sheet')} />
                                            <CheckBoxOutlineBlankIcon className={styles.check_icon_outline} />
                                            <CheckBoxIcon className={styles.check_icon} />
                                        </label>
                                    </li>
                                }

                                <li>
                                    <label htmlFor="supervisor_review" className={filesListClass('supervisor_review')}>
                                        <div>Отзыв научного руководителя</div>
                                        <input className={styles.file_input} required type="file" name="supervisor_review" id="supervisor_review" onChange={event => uploadFile(event, 'supervisor_review')} />
                                        <CheckBoxOutlineBlankIcon className={styles.check_icon_outline} />
                                        <CheckBoxIcon className={styles.check_icon} />
                                    </label>
                                </li>
                                {typeDiplomа === "научный доклад об основных результатах подготовленной научно-квалификационной работы (диссертации)"
                                    ?
                                    <>
                                        <li>
                                            <label htmlFor="review1" className={filesListClass('review')}>
                                                <div>Рецензия 1</div>
                                                <input className={styles.file_input} required type="file" name="review1" id="review1" onChange={event => uploadFile(event, 'review1')} />
                                                <CheckBoxOutlineBlankIcon className={styles.check_icon_outline} />
                                                <CheckBoxIcon className={styles.check_icon} />
                                            </label>
                                        </li>
                                        <li>
                                            <label htmlFor="review2" className={filesListClass('review')}>
                                                <div>Рецензия 2</div>
                                                <input className={styles.file_input} required type="file" name="review2" id="review2" onChange={event => uploadFile(event, 'review2')} />
                                                <CheckBoxOutlineBlankIcon className={styles.check_icon_outline} />
                                                <CheckBoxIcon className={styles.check_icon} />
                                            </label>
                                        </li>
                                    </>
                                    :
                                    <li>
                                        <label htmlFor="review" className={filesListClass('review')}>
                                            <div>Рецензия на ВКР (при наличии)</div>
                                            <input className={styles.file_input} type="file" name="review" id="review" onChange={event => uploadFile(event, 'review')} />
                                            <CheckBoxOutlineBlankIcon className={styles.check_icon_outline} />
                                            <CheckBoxIcon className={styles.check_icon} />
                                        </label>
                                    </li>
                                }
                                <li>
                                    <label htmlFor="personal_statement" className={filesListClass('personal_statement')}>
                                        <div>Личное заявление обучающегося о размещении {typeDiplomа === "научный доклад об основных результатах подготовленной научно-квалификационной работы (диссертации)" ? 'НКР': "ВКР"} в ЭБ СурГУ</div>
                                        <input className={styles.file_input} required type="file" name="personal_statement" id="personal_statement" onChange={event => uploadFile(event, 'personal_statement')} />
                                        <CheckBoxOutlineBlankIcon className={styles.check_icon_outline} />
                                        <CheckBoxIcon className={styles.check_icon} />
                                    </label>
                                </li>
                                {typeDiplomа !== "научный доклад об основных результатах подготовленной научно-квалификационной работы (диссертации)"
                                    &&
                                    <li>
                                        <label htmlFor="letter_for_placement" className={filesListClass('letter_for_placement')}>
                                            <div>Письмо о согласии (не согласии) на размещение текста ВКР в ЭБ от базового предприятия/организации, материалы которого (которой) использованы при выполнении ВКР (при наличии)</div>
                                            <input className={styles.file_input} type="file" name="letter_for_placement" id="letter_for_placement" onChange={event => uploadFile(event, 'letter_for_placement')} />
                                            <CheckBoxOutlineBlankIcon className={styles.check_icon_outline} />
                                            <CheckBoxIcon className={styles.check_icon} />
                                        </label>
                                    </li>
                                }
                                {typeDiplomа !== "научный доклад об основных результатах подготовленной научно-квалификационной работы (диссертации)"
                                    ?
                                    <li>
                                        <label htmlFor="content" className={filesListClass('content')}>
                                            <div>Оглавление работы с полным текстом (или без полного текста, если не размещается)</div>
                                            <input className={styles.file_input} required type="file" name="content" id="content" onChange={event => uploadFile(event, 'content')} />
                                            <CheckBoxOutlineBlankIcon className={styles.check_icon_outline} />
                                            <CheckBoxIcon className={styles.check_icon} />
                                        </label>
                                    </li>
                                    :
                                    <></>
                                }
                                <li>
                                    <label htmlFor="departments_decision" className={filesListClass('departments_decision')}>
                                        <div>Решение кафедры о возможности размещения {typeDiplomа === "научный доклад об основных результатах подготовленной научно-квалификационной работы (диссертации)" ? 'НКР': "ВКР"} в ЭБ (с полным текстом или с изъятием содержательной части работы)</div>
                                        <input className={styles.file_input} required type="file" name="departments_decision" id="departments_decision" onChange={event => uploadFile(event, 'departments_decision')} />
                                        <CheckBoxOutlineBlankIcon className={styles.check_icon_outline} />
                                        <CheckBoxIcon className={styles.check_icon} />
                                    </label>
                                </li>
                            </ul>
                            :
                            <div>Выберите тип работы</div>
                        }
                    </div>
                </div>
                <div>
                    <h1>{t('fullname_author')}</h1>
                    <div>
                        {
                            useMemo(() => Object.keys(fullNameAuthor).filter(e => e !== "email").map(e =>
                                <Tooltip
                                    classes={{
                                        tooltip: styles.tooltip,
                                        arrow: styles.arrow_tooltip
                                    }}
                                    open={tooltipFullNameAuthor[e]}
                                    placement="bottom"
                                    title={`Пожалуйста, введите полное ${parseFullNameValue(e)[1]}, а не инициалы`}
                                    arrow
                                    key={e}
                                >
                                    <input
                                        className={
                                            tooltipFullNameAuthor[e]
                                                ?
                                                [styles.input, styles.not_valid]
                                                :
                                                styles.input
                                        }
                                        type="text"
                                        required
                                        placeholder={parseFullNameValue(e)[0]}
                                        value={fullNameAuthor[e]}
                                        onChange={evevt => setFullNameAuthor(prev => ({ ...prev, [e]: evevt.target.value }))}
                                    />
                                </Tooltip>
                            ), [tooltipFullNameAuthor, fullNameAuthor])
                        }
                        <input className={styles.input} type="email" required placeholder="Адрес электронной почты для обратной связи" value={fullNameAuthor.email} onChange={e => setFullNameAuthor(prev => ({ ...prev, email: e.target.value }))} />
                    </div>
                </div>
                <div>
                    <div>
                        <h1>{t('fullname_scientific_supervisor')}</h1>
                        <div onClick={() => {
                            setFullNameScientificSupervisor([{
                                secondname: '',
                                firstname: '',
                                lastname: '',
                                scientific_regalia: ''
                            },
                            {
                                secondname: '',
                                firstname: '',
                                lastname: '',
                                scientific_regalia: ''
                            }])
                            setTooltipFullNameScientificSupervisor([{
                                firstname: false,
                                secondname: false,
                                lastname: false
                            },
                            {
                                firstname: false,
                                secondname: false,
                                lastname: false
                            }])
                        }}>У меня 2 научных руководителя</div>
                    </div>
                    {Array.isArray(fullNameScientificSupervisor)
                        ?
                        <>
                            <div>
                                {fullNameScientificSupervisor.map((element, index) =>
                                    <div>
                                        {Object.keys(element)
                                            .filter(e => e !== 'scientific_regalia')
                                            .map(e =>
                                                <Tooltip
                                                    classes={{
                                                        tooltip: styles.tooltip,
                                                        arrow: styles.arrow_tooltip
                                                    }}
                                                    open={tooltipFullNameScientificSupervisor[index][e]}
                                                    placement="bottom"
                                                    title={`Пожалуйста, введите полное ${parseFullNameValue(e)[1]}, а не инициалы`}
                                                    arrow
                                                >
                                                    <input
                                                        className={
                                                            tooltipFullNameScientificSupervisor[index][e]
                                                                ? [styles.input, styles.not_valid]
                                                                : styles.input
                                                        }
                                                        type="text"
                                                        required
                                                        placeholder={parseFullNameValue(e)[0]}
                                                        value={fullNameScientificSupervisor[index][e]}
                                                        onChange={event => setFullNameScientificSupervisor(prev => prev.map((value, i) => i === index ? { ...value, [e]: event.target.value } : value))}
                                                    />
                                                </Tooltip>)}
                                        <input
                                            className={styles.input} type="text" placeholder="Ученая степень, звание, должность" value={fullNameScientificSupervisor[index].scientific_regalia} onChange={e => setFullNameScientificSupervisor(prev => prev.map((value, i) => i === index ? { ...value, scientific_regalia: e.target.value } : value))}
                                        />
                                    </div>)
                                }

                            </div>

                        </>
                        :
                        <div>
                            {Object.keys(fullNameScientificSupervisor)
                                .filter(e => e !== 'scientific_regalia')
                                .map(e =>
                                    <Tooltip
                                        classes={{
                                            tooltip: styles.tooltip,
                                            arrow: styles.arrow_tooltip
                                        }}
                                        open={tooltipFullNameScientificSupervisor[e]}
                                        placement="bottom"
                                        title={`Пожалуйста, введите полное ${parseFullNameValue(e)[1]}, а не инициалы`}
                                        arrow
                                        key={e}
                                    >
                                        <input
                                            className={
                                                tooltipFullNameScientificSupervisor[e]
                                                    ? [styles.input, styles.not_valid]
                                                    : styles.input
                                            }
                                            type="text"
                                            required
                                            placeholder={parseFullNameValue(e)[0]}
                                            value={fullNameScientificSupervisor[e]}
                                            onChange={event => setFullNameScientificSupervisor(prev => ({ ...prev, [e]: event.target.value }))}
                                        />
                                    </Tooltip>)}
                            <input
                                className={styles.input} type="text" placeholder="Ученая степень" value={fullNameScientificSupervisor.scientific_regalia} onChange={e => setFullNameScientificSupervisor(prev => ({ ...prev, scientific_regalia: e.target.value }))}
                            />
                        </div>
                    }
                </div>
                <div>
                    <h1>{t('institute')}</h1>
                    <div>
                        <select className={styles.input} required value={nameInstitute} onChange={e => setNameInstitute(e.target.value)}>
                            <option value="">Институт</option>
                            {allInstitute.map(e => <option key={e} value={e}>{e}</option>)}
                        </select>
                        <select className={styles.input} required value={nameDepartment} onChange={e => setNameDepartment(e.target.value)}>
                            <option value="">Кафедра</option>
                            {allDepartaments.map(e => <option key={e} value={e}>{e}</option>)}
                        </select>
                    </div>
                </div>
                <button type="submit" className={styles.submit_button}>{t('submit')}</button>
            </form>
        </Section>
    );
}

export default VKR;
