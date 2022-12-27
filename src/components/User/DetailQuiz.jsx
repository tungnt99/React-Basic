import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getDataQuestions } from '../../services/apiServices';
import _ from 'lodash';

export default function DetailQuiz(props) {
    const [title] = useState('Test Quiz User')
    const params = useParams();
    const quizId = params.id;
    // console.log('check quizID: ', quizId);

    useEffect(() => {
        document.title = title;
        fetchDataQuestion();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [title, quizId])

    const fetchDataQuestion = async () => {
        let res = await getDataQuestions(quizId);
        // console.log('res: ', res);
        if (res && res.EC === 0) {
            let raw = res.DT
            // console.log('raw: ', raw);
            let data = _.chain(raw)
                    // Group the elements of Array based on `color` property
                    .groupBy("id")
                    // `key` is group's name (color), `value` is the array of objects
                    .map((value, key) => {
                          // console.log('value', value, 'key', key);
                        let answers = [];
                        let questionDescription, image = null;
                        // answers.questionId = key;
                        value.forEach((item, index) => {
                            if(index === 0){
                                questionDescription = item.description;
                                image = item.image;
                            }
                            // console.log('item: ', item);
                            // console.log('items answer', item.answers);
                            answers.push(item.answers);
                        }) 
                      
                        return { questionId: key, answers, questionDescription, image }
                    })
                    .value();
            // console.log("data: ", data);
            
        }
    }
    return (
        <div>DetailQuiz</div>
    )
}
