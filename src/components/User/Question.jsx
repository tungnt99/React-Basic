import React from 'react'
import _ from 'lodash';
export default function Question(props) {
    const { data, index } = props;
    console.log('data: ', data, 'index: ', index);
    if (_.isEmpty(data)) {
        return <></>;
    } // nếu data rỗng ko truyền gì xuống bên dưới
    return (
        <>
            <h3 className="question-title">Question {index + 1}: {data.questionDescription} ?</h3>
            {data.image ?
                <div className="question-image">
                    <img src={`data:image/jpeg;base64, ${data.image}`} alt="anh" />
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
                                    value=""
                                    role="button"
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
