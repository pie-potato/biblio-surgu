import axios from "axios";
import Section from "../components/Section";
import { useEffect, useMemo, useState } from "react";
import styles from '../styles/VKR.module.css'
import CheckIcon from '@mui/icons-material/Check';

const VKR = () => {
    const [nameInstitute, setNameInstitute] = useState() // State для названия института
    const [nameDepartment, setNameDepartment] = useState() // State для названия кафедры
    const [nameDiplomа, setNameDiplomа] = useState() // State для названия диплома
    const [typeDiplomа, setTypeDiplomа] = useState() // State для типа диплома
    const [referralCode, setReferralCode] = useState() // State для кода направления
    const [referralName, setReferralName] = useState() // State для названия направления
    const [files, setFiles] = useState({
        title_page: '',
        task_sheet: '',
        supervisor_review: '',
        review: '',
        personal_statement: '',
        letter_for_placement: '',
        content: '',
        departments_decision: '',
    }) // State для файлов диплома
    const [fullNameAuthor, setFullNameAuthor] = useState({
        firstname: '',
        secondname: '',
        lastname: ''
    }) // State для ФИО автора
    const [fullNameScientificSupervisor, setFullNameScientificSupervisor] = useState({
        firstname: '',
        secondname: '',
        lastname: ''
    }) // State для ФИО научного руководителя

    const [allScientificSupervisors, setAllScientificSupervisors] = useState()

    const fetchAllScientificSupervisors = async () => {
        try {
            const response = await axios.get(`${process.env.PUBLIC_VKR_API}/emploees`)
            setAllScientificSupervisors(response.data)
        } catch (error) {
            console.error(error)
        }
    }

    const allInstitute = useMemo(() => {
        return allScientificSupervisors?.map(scientificSupervisors => scientificSupervisors[0])
    }, [allScientificSupervisors])

    console.log(allInstitute);
    useEffect(() => {
        fetchAllScientificSupervisors()
    }, [])

    const submitVKR = (event) => {
        event.preventDefault()
    }

    const uplocadFile = (event, fileName) => {
        const file = event.target.files[0]
        if (file.name.split().pop().toLowerCase() === 'pdf' || file.type === 'application/pdf') {
            setFiles(prevFiles => ({ ...prevFiles, [fileName]: file }))
        } else {
            setFiles(prevFiles => ({ ...prevFiles, [fileName]: 'Incorrect format' }))
        }
    }

    const filesListClass = (fileName) => {
        if (files[fileName] === 'Incorrect format') { return styles.incorrect_format }
        if (typeof files[fileName] === 'object') { return styles.correct_format }
    }

    return (
        <Section title='Размещение ВКР/НКР'>
            <form action="" onSubmit={submitVKR}>
                <div>
                    <h1>Информация о работе</h1>
                    <div>
                        <input type="text" placeholder="Название работы" />
                        <select name="" id="">
                            <option value="">Тип работы</option>
                            <option value="диплом">Дипломная</option>
                            <option value="бакалавр">Бакалаврская</option>
                            <option value="магистр">Магистерская</option>
                        </select>
                        <input type="text" placeholder="Код направления" />
                        <input type="text" placeholder="Название направления" />
                        <div>
                            <div>
                                Файлы ВКР
                            </div>
                            <div >
                                <ul className={styles.files_list}>
                                    <li className={filesListClass('title_page')}>
                                        <label htmlFor="title_page">
                                            Титульный лист с подписями, подтверждающими допуск работы к защите
                                            <CheckIcon className={styles.check_icon} />
                                        </label>
                                    </li>
                                    <li>
                                        <label htmlFor="task_sheet" className={filesListClass('task_sheet')}>
                                            Лист с заданием на ВКР
                                            <CheckIcon className={styles.check_icon} />
                                        </label>
                                    </li>
                                    <li>
                                        <label htmlFor="supervisor_review" className={filesListClass('supervisor_review')}>
                                            Отзыв научного руководителя
                                            <CheckIcon className={styles.check_icon} />
                                        </label>
                                    </li>
                                    <li>
                                        <label htmlFor="review" className={filesListClass('review')}>
                                            Рецензия на ВКР (при наличии)
                                            <CheckIcon className={styles.check_icon} />
                                        </label>
                                    </li>
                                    <li>
                                        <label htmlFor="personal_statement" className={filesListClass('personal_statement')}>
                                            Личное заявление обучающегося о размещении ВКР в ЭБ СурГУ
                                            <CheckIcon className={styles.check_icon} />
                                        </label>
                                    </li>
                                    <li>
                                        <label htmlFor="letter_for_placement" className={filesListClass('letter_for_placement')}>
                                            Письмо о согласии (не согласии) на размещение текста ВКР в ЭБ от базового предприятия/организации, материалы которого (которой) использованы при выполнении ВКР (при наличии)
                                            <CheckIcon className={styles.check_icon} />
                                        </label>
                                    </li>
                                    <li>
                                        <label htmlFor="content" className={filesListClass('content')}>
                                            Оглавление работы с полным текстом (или без полного текста, если не размещается)
                                            <CheckIcon className={styles.check_icon} />
                                        </label>
                                    </li>
                                    <li>
                                        <label htmlFor="departments_decision" className={filesListClass('departments_decision')}>
                                            Решение кафедры о возможности размещения ВКР в ЭБ (с полным текстом или с изъятием содержательной части работы)
                                            <CheckIcon className={styles.check_icon} />
                                        </label>
                                    </li>
                                </ul>
                                <div className={styles.form_vkr_input}>
                                    <input className={styles.form_vkr_input} required multiple type="file" name="title_page" id="title_page" onChange={event => uplocadFile(event, 'title_page')} />
                                    <input className={styles.form_vkr_input} required multiple type="file" name="task_sheet" id="task_sheet" onChange={event => uplocadFile(event, 'task_sheet')} />
                                    <input className={styles.form_vkr_input} required multiple type="file" name="supervisor_review" id="supervisor_review" onChange={event => uplocadFile(event, 'supervisor_review')} />
                                    <input className={styles.form_vkr_input} multiple type="file" name="review" id="review" onChange={event => uplocadFile(event, 'review')} />
                                    <input className={styles.form_vkr_input} multiple type="file" name="personal_statement" id="personal_statement" onChange={event => uplocadFile(event, 'personal_statement')} />
                                    <input className={styles.form_vkr_input} multiple type="file" name="letter_for_placement" id="letter_for_placement" onChange={event => uplocadFile(event, 'letter_for_placement')} />
                                    <input className={styles.form_vkr_input} multiple type="file" name="content" id="content" onChange={event => uplocadFile(event, 'content')} />
                                    <input className={styles.form_vkr_input} multiple type="file" name="departments_decision" id="departments_decision" onChange={event => uplocadFile(event, 'departments_decision')} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h1>ФИО автора</h1>
                    <div>
                        <input type="text" placeholder="Фамилия" />
                        <input type="text" placeholder="Имя" />
                        <input type="text" placeholder="Отчество" />
                    </div>
                </div>
                <div>
                    <h1>ФИО научного руководителя</h1>
                    <div>
                        <input type="text" required placeholder="Фамилия" />
                        <input type="text" required placeholder="Имя" />
                        <input type="text" required placeholder="Отчество" />
                        <input type="text" required placeholder="Научная степень" />
                    </div>
                </div>
                <div>
                    <h1>Институт</h1>
                    <div>
                        <input type="text" required placeholder="Название института" />
                        <input type="text" required placeholder="Название кафедры" />
                    </div>
                </div>
            </form>
        </Section>
    );
}

export default VKR;
