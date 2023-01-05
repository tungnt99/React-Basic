import React, { useEffect, useState } from 'react';
import './style/manage-quiz.scss';
import Lightbox from "react-awesome-lightbox";
import { toast } from "react-toastify";
import { getAllDataQuizForAdmin, postCreateNewQuiz } from '../../../../services/apiServices';
import TableQuiz from './TableQuiz';
import Accordion from 'react-bootstrap/Accordion';
import ModalDeleteQuiz from './ModalDeleteQuiz';
import ModalUpdateQuiz from './ModalUpdateQuiz';
import ModalViewQuiz from './ModalViewQuiz';
import QuizQA from './QuizQA';
import AssignQuiz from './AssignQuiz';


export default function ManageQuiz(props) {
    // react lightbox
    const [isPreviewImage, setIsPreviewImage] = useState(false);
    const [dataImagePreview, setDataImagePreview] = useState({
        title: '',
        url: '',
    });
    // end react lightbox
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [difficulty, setDifficulty] = useState("EASY");
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    const [listQuiz, setListQuiz] = useState([]);
    const [dataUpdateQuiz, setDataUpdateQuiz] = useState({});
    const [showModalUpdateQuiz, setShowModalUpdateQuiz] = useState(false);
    const [dataViewQuiz, setDataViewQuiz] = useState({});
    const [showModalViewQuiz, setShowModalViewQuiz] = useState(false);
    const [dataDeleteQuiz, setDataDeleteQuiz] = useState({});
    const [showModalDeleteQuiz, setShowModalDeleteQuiz] = useState(false);

    useEffect(() => {
        fetchAllDataQuiz();
    }, [])

    const fetchAllDataQuiz = async () => {
        let res = await getAllDataQuizForAdmin()
        if (res.EC === 0) {
            setListQuiz(res.DT);
        }
    }

    const handleChangeFile = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]);
        }
    }

    const handleSubmitQuiz = async () => {
        if (!name || !description) {
            toast.error('Please enter a name or description for quiz');
            return;
        }
        let data = await postCreateNewQuiz(name, description, difficulty, image)
        // console.log('data: ', data);
        if (data && data.EC === 0) {
            toast.success(data.EM)
            setName('')
            setDescription('')
            setDifficulty('EASY')
            setImage("")
            setPreviewImage(null);
            fetchAllDataQuiz();
        } else {
            toast.error(data.EM)
        }
    }

    const handleModalDeleteQuiz = (quiz) => {
        setShowModalDeleteQuiz(true);
        setDataDeleteQuiz(quiz);
    }
    const handleModalUpdateQuiz = (quiz) => {
        setShowModalUpdateQuiz(true);
        setDataUpdateQuiz(quiz);
    }
    const handleModalViewQuiz = (quiz) => {
        setShowModalViewQuiz(true);
        setDataViewQuiz(quiz);
    }

    const handlePreviewImage = () => {
        setDataImagePreview({
            url: previewImage,
            title: previewImage
        })
        setIsPreviewImage(true)
    }
    return (
        <div className='quiz-container'>
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>ManageQuiz</Accordion.Header>
                    <Accordion.Body>
                        <div className='add-new'>
                            <fieldset className="border rounded-3 p-3" >
                                <legend className="float-none w-auto px-3">Add New Quiz:</legend>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" placeholder='Your quiz name' value={name} onChange={(event) => setName(event.target.value)} />
                                    <label>Name</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" placeholder='Description' value={description} onChange={(event) => setDescription(event.target.value)} />
                                    <label >Description</label>
                                </div>
                                <div className=' mb-3'>
                                    <label className="form-label">Type</label>
                                    <select className="form-select" value={difficulty} onChange={(event) => setDifficulty(event.target.value)}>
                                        <option value="EASY">EASY</option>
                                        <option value="MEDIUM">MEDIUM</option>
                                        <option value="HARD">HARD</option>
                                    </select>

                                </div>
                                <div className='more-actions mb-3'>
                                    <label>Upload Image</label>
                                    <input type="file" className='form-control' onChange={(event) => handleChangeFile(event)} />
                                </div>
                                <div className='col-md-12 img-preview'>
                                    {previewImage ?
                                        <img src={previewImage} alt={image} onClick={() => handlePreviewImage()} style={{ cursor: 'pointer' }} />
                                        :
                                        <span>Preview Image</span>
                                    }
                                </div>
                                <div className='form-group my-3'>
                                    <button onClick={() => handleSubmitQuiz()} className='btn btn-warning'>Create Quiz</button>
                                </div>
                            </fieldset>
                        </div>
                        <div className='list-quiz'>
                            <TableQuiz
                                listQuiz={listQuiz}
                                handleModalDeleteQuiz={handleModalDeleteQuiz}
                                handleModalUpdateQuiz={handleModalUpdateQuiz}
                                handleModalViewQuiz={handleModalViewQuiz}
                            />
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Update Q/A Quizzes</Accordion.Header>
                    <Accordion.Body>
                        <QuizQA />
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>Assign to Users</Accordion.Header>
                    <Accordion.Body>
                        <AssignQuiz />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>

            {isPreviewImage === true &&
                <Lightbox image={dataImagePreview.url} title={dataImagePreview.title} onClose={() => setIsPreviewImage(false)}></Lightbox>
            }
            <ModalDeleteQuiz
                show={showModalDeleteQuiz}
                setShow={setShowModalDeleteQuiz}
                dataDeleteQuiz={dataDeleteQuiz}
                fetchAllDataQuiz={fetchAllDataQuiz}
            />
            <ModalUpdateQuiz
                show={showModalUpdateQuiz}
                setShow={setShowModalUpdateQuiz}
                dataUpdateQuiz={dataUpdateQuiz}
                fetchAllDataQuiz={fetchAllDataQuiz}
            />
            <ModalViewQuiz
                show={showModalViewQuiz}
                setShow={setShowModalViewQuiz}
                dataViewQuiz={dataViewQuiz}
            />
        </div>
    )
}