import React from 'react'
import { useTranslation } from 'react-i18next';

export default function TableQuiz(props) {
    // translation
    const { t } = useTranslation();
    // end translation
    const { listQuiz } = props;
    return (
        <div className='container'>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">{t('tablequiz.name')}</th>
                        <th scope="col">{t('tablequiz.desc')}</th>
                        <th scope="col">{t('tablequiz.type')}</th>
                        <th scope="col">{t('tablequiz.action')}</th>
                    </tr>
                </thead>
                <tbody>
                    {listQuiz && listQuiz.length > 0 && listQuiz.map((item, index) => {
                        return (
                            <tr key={index}>
                                <th>{item.id}</th>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>{item.difficulty}</td>
                                <td>
                                    <button style={{width: "70px"}} className='mx-1 my-1 btn btn-info' onClick={() => props.handleModalViewQuiz(item)}>{t('tablequiz.view')}</button>
                                    <button style={{width: "70px"}} className='mx-1 my-1 btn btn-warning' onClick={() => props.handleModalUpdateQuiz(item)}>{t('tablequiz.edit')}</button>
                                    <button style={{width: "70px"}} className='mx-1 my-1 btn btn-dark' onClick={() => props.handleModalDeleteQuiz(item)}>{t('tablequiz.delete')}</button>
                                </td>
                            </tr>
                        )
                    })}
                    {listQuiz && listQuiz.length === 0 && <tr><td colSpan={'4'}>{t('tablequiz.notdata')}</td></tr>}
                </tbody>
            </table>

        </div>
    )
}
