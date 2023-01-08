import axios from "../utils/axiosCustomize";

const postCresteNewUser = (email, password, userName, role, image) => {
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('username', userName);
    data.append('role', role);
    data.append('userImage', image);

    return axios.post("api/v1/participant", data);
}
const getAllUsers = () => {
    return axios.get('api/v1/participant/all');
}

const putUpdateUser = (id, userName, role, image) => {
    const data = new FormData();
    data.append('id', id);
    data.append('username', userName);
    data.append('role', role);
    data.append('userImage', image);

    return axios.put("api/v1/participant", data);
}

const deleteUser = (userId) => {
    return axios.delete("api/v1/participant", { data: { id: userId } });
}

const getAllUsersPaginate = (page, limit) => {
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
}

// Login
const postLogin = (userEmail, userPassword) => {
    return axios.post(`api/v1/login`, { email: userEmail, password: userPassword, delay: 3000 });

}

const postRegister = (email, password, username) => {
    return axios.post(`api/v1/register`, { email, password, username });
}

const getQuizByUser = () => {
    return axios.get("api/v1/quiz-by-participant");
}

const getDataQuestions = (id) => {
    return axios.get(`api/v1/questions-by-quiz?quizId=${id}`);
}

const postSubmitQuiz = (data) => {
    // console.log("data: ", {...data});
    return axios.post(`api/v1/quiz-submit`, { ...data });

}

const postCreateNewQuiz = (name, description, difficulty, quizImage) => {
    const data = new FormData();
    data.append('name', name);
    data.append('description', description);
    data.append('difficulty', difficulty);
    data.append('quizImage', quizImage);

    return axios.post("api/v1/quiz", data);
}

const getAllDataQuizForAdmin = () => {
    return axios.get(`api/v1/quiz/all`);
}

const putUpdateDataQuiz = (id, name, description, difficulty, quizImage) => {
    const data = new FormData();
    data.append("id", id);
    data.append('name', name);
    data.append('description', description);
    data.append('difficulty', difficulty);
    data.append('quizImage', quizImage);

    return axios.put("api/v1/quiz", data);
}

const deleteQuiz = (id) => {
    return axios.delete(`api/v1/quiz/${id}`);
}

const postCreateNewQuestionForQuiz = (quiz_id, description, questionImage) => {
    const data = new FormData();
    data.append("quiz_id", quiz_id);
    data.append('description', description);
    data.append('questionImage', questionImage);

    return axios.post("api/v1/question", data);
}

const postCreateNewAnswerForQuestion = (description, correct_answer, question_id) => {
    return axios.post("api/v1/answer", {
        description, correct_answer, question_id
    });
}
const postAssignQuiz = (quizId, userId) => {
    // submit data
    return axios.post('api/v1/quiz-assign-to-user', {
        quizId, userId
    });
}

const getQuizWithQA = (quizId) => {
    // submit data
    return axios.get(`api/v1/quiz-with-qa/${quizId}`);
}

// API update/delete question
const postUpdateInsertQA = (data) => {
    return axios.post(`api/v1/quiz-upsert-qa`, { ...data });

}

const logout = (email, refresh_token) => {
    return axios.post('api/v1/logout', {email, refresh_token});

}
export { postCresteNewUser, getAllUsers, putUpdateUser, deleteUser, getAllUsersPaginate, postLogin, postRegister, getQuizByUser, getDataQuestions, postSubmitQuiz, postCreateNewQuiz, getAllDataQuizForAdmin, putUpdateDataQuiz, deleteQuiz, postCreateNewQuestionForQuiz, postCreateNewAnswerForQuestion, postAssignQuiz, getQuizWithQA, postUpdateInsertQA, logout }