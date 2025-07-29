import axios from "axios";
import Section from "../components/Section";
import { useEffect, useMemo, useState } from "react";
import styles from '../styles/VKR.module.css'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/Check';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useLanguage } from "../context/LanguageContext";
import { useTranslation } from "react-i18next";

const VKR = () => {

    const { language } = useLanguage()
    const [t] = useTranslation()

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
        lastname: '',
        scientific_regalia: ''
    }) // State для ФИО научного руководителя

    console.log(Object.entries(files));


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

    const submitVKR = async (event) => {
        event.preventDefault();

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

            const result = await response.json();
            console.log('Success:', result);
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

    console.log(files);


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
                            <option value="магистерская дисертация">{t('master')}</option>
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
                        <ul className={styles.files_list}>
                            <li className={filesListClass('title_page')}>
                                <label htmlFor="title_page">
                                    <div>Титульный лист с подписями, подтверждающими допуск работы к защите</div>
                                    <input className={styles.file_input} required type="file" name="title_page" id="title_page" onChange={event => uploadFile(event, 'title_page')} />
                                    <CheckBoxOutlineBlankIcon className={styles.check_icon_outline} />
                                    <CheckBoxIcon className={styles.check_icon} />
                                </label>
                            </li>
                            <li>
                                <label htmlFor="task_sheet" className={filesListClass('task_sheet')}>
                                    <div>Лист с заданием на ВКР</div>
                                    <input className={styles.file_input} type="file" name="task_sheet" id="task_sheet" onChange={event => uploadFile(event, 'task_sheet')} />
                                    <CheckBoxOutlineBlankIcon className={styles.check_icon_outline} />
                                    <CheckBoxIcon className={styles.check_icon} />
                                </label>
                            </li>
                            <li>
                                <label htmlFor="supervisor_review" className={filesListClass('supervisor_review')}>
                                    <div>Отзыв научного руководителя</div>
                                    <input className={styles.file_input} required type="file" name="supervisor_review" id="supervisor_review" onChange={event => uploadFile(event, 'supervisor_review')} />
                                    <CheckBoxOutlineBlankIcon className={styles.check_icon_outline} />
                                    <CheckBoxIcon className={styles.check_icon} />
                                </label>
                            </li>
                            <li>
                                <label htmlFor="review" className={filesListClass('review')}>
                                    <div>Рецензия на ВКР (при наличии)</div>
                                    <input className={styles.file_input} type="file" name="review" id="review" onChange={event => uploadFile(event, 'review')} />
                                    <CheckBoxOutlineBlankIcon className={styles.check_icon_outline} />
                                    <CheckBoxIcon className={styles.check_icon} />
                                </label>
                            </li>
                            <li>
                                <label htmlFor="personal_statement" className={filesListClass('personal_statement')}>
                                    <div>Личное заявление обучающегося о размещении ВКР в ЭБ СурГУ</div>
                                    <input className={styles.file_input} required type="file" name="personal_statement" id="personal_statement" onChange={event => uploadFile(event, 'personal_statement')} />
                                    <CheckBoxOutlineBlankIcon className={styles.check_icon_outline} />
                                    <CheckBoxIcon className={styles.check_icon} />
                                </label>
                            </li>
                            <li>
                                <label htmlFor="letter_for_placement" className={filesListClass('letter_for_placement')}>
                                    <div>Письмо о согласии (не согласии) на размещение текста ВКР в ЭБ от базового предприятия/организации, материалы которого (которой) использованы при выполнении ВКР (при наличии)</div>
                                    <input className={styles.file_input} type="file" name="letter_for_placement" id="letter_for_placement" onChange={event => uploadFile(event, 'letter_for_placement')} />
                                    <CheckBoxOutlineBlankIcon className={styles.check_icon_outline} />
                                    <CheckBoxIcon className={styles.check_icon} />
                                </label>
                            </li>
                            <li>
                                <label htmlFor="content" className={filesListClass('content')}>
                                    <div>Оглавление работы с полным текстом (или без полного текста, если не размещается)</div>
                                    <input className={styles.file_input} required type="file" name="content" id="content" onChange={event => uploadFile(event, 'content')} />
                                    <CheckBoxOutlineBlankIcon className={styles.check_icon_outline} />
                                    <CheckBoxIcon className={styles.check_icon} />
                                </label>
                            </li>
                            <li>
                                <label htmlFor="departments_decision" className={filesListClass('departments_decision')}>
                                    <div>Решение кафедры о возможности размещения ВКР в ЭБ (с полным текстом или с изъятием содержательной части работы)</div>
                                    <input className={styles.file_input} required type="file" name="departments_decision" id="departments_decision" onChange={event => uploadFile(event, 'departments_decision')} />
                                    <CheckBoxOutlineBlankIcon className={styles.check_icon_outline} />
                                    <CheckBoxIcon className={styles.check_icon} />
                                </label>
                            </li>
                        </ul>
                    </div>
                </div>
                <div>
                    <h1>{t('fullname_author')}</h1>
                    <div>
                        <input className={styles.input} type="text" required placeholder="Фамилия" value={fullNameAuthor.secondname} onChange={e => setFullNameAuthor(prev => ({ ...prev, secondname: e.target.value }))} />
                        <input className={styles.input} type="text" required placeholder="Имя" value={fullNameAuthor.firstname} onChange={e => setFullNameAuthor(prev => ({ ...prev, firstname: e.target.value }))} />
                        <input className={styles.input} type="text" required placeholder="Отчество" value={fullNameAuthor.lastname} onChange={e => setFullNameAuthor(prev => ({ ...prev, lastname: e.target.value }))} />
                    </div>
                </div>
                <div>
                    <h1>{t('fullname_scientific_supervisor')}</h1>
                    <div>
                        <input className={styles.input} type="text" required placeholder="Фамилия" value={fullNameScientificSupervisor.secondname} onChange={e => setFullNameScientificSupervisor(prev => ({ ...prev, secondname: e.target.value }))} />
                        <input className={styles.input} type="text" required placeholder="Имя" value={fullNameScientificSupervisor.firstname} onChange={e => setFullNameScientificSupervisor(prev => ({ ...prev, firstname: e.target.value }))} />
                        <input className={styles.input} type="text" required placeholder="Отчество" value={fullNameScientificSupervisor.lastname} onChange={e => setFullNameScientificSupervisor(prev => ({ ...prev, lastname: e.target.value }))} />
                        <input className={styles.input} type="text" required placeholder="Научная степень" value={fullNameScientificSupervisor.scientific_regalia} onChange={e => setFullNameScientificSupervisor(prev => ({ ...prev, scientific_regalia: e.target.value }))} />
                    </div>
                </div>
                <div>
                    <h1>{t('institute')}</h1>
                    <div>
                        {/* <input className={styles.input} type="text" required placeholder="Название института" value={nameInstitute} onChange={e => setNameInstitute(e.target.value)} /> */}
                        <select className={styles.input} required value={nameInstitute} onChange={e => setNameInstitute(e.target.value)}>
                            <option value="">Институт</option>
                            {allInstitute.map(e => <option value={e}>{e}</option>)}
                        </select>
                        {/* <input className={styles.input} type="text" required placeholder="Название кафедры" value={nameDepartment} onChange={e => setNameDepartment(e.target.value)} /> */}
                        <select className={styles.input} required value={nameDepartment} onChange={e => setNameDepartment(e.target.value)}>
                            <option value="">Кафедра</option>
                            {allDepartaments.map(e => <option value={e}>{e}</option>)}
                        </select>
                    </div>
                </div>
                <button type="submit" className={styles.submit_button}>{t('submit')}</button>
            </form>
        </Section>
    );
}

export default VKR;
