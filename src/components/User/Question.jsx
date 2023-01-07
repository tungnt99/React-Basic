import React, { useState } from 'react'
import _ from 'lodash';
import Lightbox from "react-awesome-lightbox";
export default function Question(props) {
    const [isPreviewImage, setIsPreviewImage] = useState(false);
    const { data, index, handleCheckBox } = props;
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
            <h3 className="question-title">Question {index + 1}: {data.questionDescription} ?</h3>
            {data.image ?
                <div className="question-image">
                    <img src={`data:image/jpeg;base64, ${data.image}`} alt="anh" onClick={() => setIsPreviewImage(true)}/>
                    {isPreviewImage === true &&

                        <Lightbox image={`data:image/jpeg;base64, ${data.image}`} title="Question Image" onClose={() => setIsPreviewImage(false)}></Lightbox>
                    }
                </div>
                :
                <div className="question-image not-found">
                    Image not found
                </div>
            }
            <div className="question-answer">
                {data.answers && data.answers.length > 0 && data.answers.map((answer, index) => {
                    return (
                        <div key={`answer-${index}`}>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    role="button"
                                    checked={answer.isSelected}
                                    value={answer.description}
                                    onChange={(event) => handleHanleCheckbox(event, answer.id, data.questionId)}
                                />
                                <label
                                    className="form-check-label"
                                >
                                    {answer.description}
                                </label>
                            </div>
                        </div>

                    )
                })}

            </div>
        </>
    )
}
