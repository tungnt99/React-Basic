import React, { useState } from 'react'
import _ from 'lodash';
import Lightbox from "react-awesome-lightbox";
import { useTranslation } from 'react-i18next';
import { IoIosClose, IoIosCheckmark } from "react-icons/io";
export default function Question(props) {
    // translation
    const { t } = useTranslation();
    // end translation
    const [isPreviewImage, setIsPreviewImage] = useState(false);
    const { data, index, handleCheckBox, isShowAnswer } = props;
    // console.log('data: ', data, 'index: ', index);
    if (_.isEmpty(data)) {
        return <></>;
    } // nếu data rỗng ko truyền gì xuống bên dưới

    const handleHanleCheckbox = (event, aId, qId) => {
        // console.log(aId, +qId);
        // console.log('event: ', event.target.checked);
        handleCheckBox(aId, +qId);
        // console.log('data: ', data);
    }
    return (
        <>
            <h3 className="question-title">{t('listquiz.question')} {index + 1}: {data.questionDescription} ?</h3>
            {data.image ?
                <div className="question-image">
                    <img src={`data:image/jpeg;base64, ${data.image}`} alt="anh" onClick={() => setIsPreviewImage(true)} />
                    {isPreviewImage === true &&

                        <Lightbox image={`data:image/jpeg;base64, ${data.image}`} title="Question Image" onClose={() => setIsPreviewImage(false)}></Lightbox>
                    }
                </div>
                :
                <div className="question-image not-found">
                    {t('listquiz.notimage')}
                </div>
            }
            <div className="question-answer">
                {data.answers && data.answers.length > 0 && data.answers.map((answer, index) => {
                    return (
                        <div key={`answer-${index}`}>
                            <div className="form-check">
                                <input
                                    id={`checkbox-${index}`}
                                    className="form-check-input"
                                    type="checkbox"
                                    role="button"
                                    checked={answer.isSelected}
                                    value={answer.description}
                                    onChange={(event) => handleHanleCheckbox(event, answer.id, data.questionId)}
                                />
                                <label className="form-check-label" htmlFor={`checkbox-${index}`} >
                                    {answer.description}
                                </label>
                                {isShowAnswer === true &&
                                    <>
                                        {answer.isSelected === true && answer.isCorrect === false && <IoIosClose className='incorrect' />}
                                        {answer.isCorrect === true && <IoIosCheckmark className='correct' />}
                                    </>
                                }
                              
                            </div>
                        </div>

                    )
                })}

            </div>
        </>
    )
}
