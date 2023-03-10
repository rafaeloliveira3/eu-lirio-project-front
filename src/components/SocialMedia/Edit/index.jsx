import { Form, Container, ModalContentContainer, TagsContainer, Tags } from "./styles"
import { useEffect, useState } from "react"
import Modal from "react-modal"
import axios from "axios"
import { defaultUrl } from "../../helpers/url"
import { Checkbox } from "./utils/Checkbox"
import { uploadImage } from "../../helpers/firebase"
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from "react-router-dom"

export const Edit = () => {

    const navigate = useNavigate()

    const [userName, setUserName] = useState("")
    const [userFullName, setUserFullName] = useState("")
    const [userBio, setUserBio] = useState("")
    const [userBirth, setUserBirth] = useState("")
    const [userEmail, setUserEmail] = useState("")

    const [imageUpload, setImageUpload] = useState(null)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [previewUrl, setPreviewUrl] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
    const [tags, setTags] = useState([])
    const [genres, setGenres] = useState([])

    const deleteSucces = () => toast.success('Usuário Deletado Com Sucesso!')

    const userId = localStorage.getItem('id')
    const [user, setUser] = useState({})
    let image
    let biografia
    
    // FETCHING USER DATA
    useEffect(() => {
        const fetchUser = async () => {
            const data = await axios.get(`${defaultUrl}user/id/${userId}`)
            .catch((err) => { console.log(err) })
    
            setUser(data.data.user[0])
            setUserName(data.data.user[0].user_name)
            setUserFullName(data.data.user[0].nome)
            setUserBirth(data.data.user[0].data_nascimento)
            setUserEmail(data.data.user[0].email)
            console.log(data.data.user[0])

            if (data.data.user[0].foto !== null && data.data.user[0].foto !== undefined) setPreviewUrl(data.data.user[0].foto)
            if (data.data.user[0].biografia !== null && data.data.user[0].biografia !== undefined) setUserBio(data.data.user[0].biografia)
        }
        fetchUser()
    }, [userId])

    //FETCHING TAGS
    useEffect(() => {
        const fetchTags = async () => {
            const data = await axios.get(`${defaultUrl}tags`)
            .catch(err => {console.log(err)})  
            setTags(data?.data.tags)
        }
        fetchTags()
    }, [1])

    //FETCHING BOOK GENRES
    useEffect(() => {
        const fetchGenres = async () => {
            const data = await axios.get(`${defaultUrl}genres`)
            .catch(err => {console.log(err)})  
            setGenres(data?.data.genres)
        }
        fetchGenres()
    }, [1])

    const preview = (image) => {
        const fileReader = new FileReader()
        fileReader.onloadend = () => (setPreviewUrl(fileReader.result))

        if (image) {
            fileReader.readAsDataURL(image);
        }
    }
    const handleImage = async () => {
        let url = await uploadImage(imageUpload, imageUpload.name)
        return url
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const imageurl = await handleImage()

        const edited = {
            user_name: userName,
            nome: userFullName,
            data_nascimento: userBirth,
            foto: imageurl,
            email: userEmail

        }
    }

    const handleDeleteAccount = async () => {
        const res = await axios.delete(`${defaultUrl}user/id/${userId}`)
        if(res.status === 200 ) {
            deleteSucces()
            setTimeout(() => { navigate('/login') }, 2500)
        }
    }

    const handleOpenModal = () => {
        setIsDeleteModalOpen(true)
    }
    const handleCloseModal = () => {
        setIsDeleteModalOpen(false)
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit} image={previewUrl}>
                <div className="user">
                    <input type="file" 
                        onChange={(e) => {
                            setImageUpload(e.target.files[0])
                            preview(e.target.files[0])
                        }} 
                        name="profileImage" 
                        id="profileImage" 
                        accept="image/*"
                    />
                    <label htmlFor="profileImage">
                        <div className="image">
                            <i className="fa-solid fa-image"></i>
                        </div>
                    </label>
                    <span>
                        <input 
                            type="text" 
                            placeholder="Nome Completo" 
                            value={userFullName}
                            onChange={(e) => {setUserFullName(e.currentTarget.value)}}
                        />
                        <input 
                            type="text" 
                            placeholder="Username" 
                            value={userName}
                            onChange={(e) => {setUserName(e.currentTarget.value)}}
                        />
                    </span>
                </div>
                <textarea 
                    className="biography" 
                    style={null}  
                    placeholder="Biografia" 
                    maxLength={300}
                    value={userBio}
                    onChange={(e) => {setUserBio(e.currentTarget.value)}}
                >
                </textarea>
                <div className="select-container">
                    <Tags>
                        <span>Você é...</span>
                        <TagsContainer>
                            {tags?.map(item => <Checkbox key={item.id} name={item.tag}/> )}
                        </TagsContainer>
                    </Tags>
                    <Tags>
                        <span><i className="fa-solid fa-tag"></i></span>
                        <TagsContainer>
                            {genres?.map(item => <Checkbox key={item.id} name={item.nome}/> )}
                        </TagsContainer>
                    </Tags>
                </div>
                <div className="save">
                    <button type="submit">SALVAR</button>
                </div>
            </Form>
            <div className="button-delete" onClick={handleOpenModal}>
                <button>EXCLUIR CONTA</button>
            </div>
            <Modal
                isOpen={isDeleteModalOpen}
                onRequestClose={handleCloseModal}
                overlayClassName="delete-user-modal-overlay"
                className="delete-user-modal-content"
            >
                <ModalContentContainer>
                    <i className="fa-solid fa-trash"></i>
                    <h2>Deseja mesmo excluir a sua conta?</h2>
                    <p>Essa ação é irreversível e resultará na exclusão completa de seus dados e publicações dentro da plataforma.</p>
                    <span>
                        <button className="cancelar" onClick={handleCloseModal}>Cancelar</button>
                        <button className="apagar" onClick={handleDeleteAccount}>Apagar</button>
                    </span>
                </ModalContentContainer>
            </Modal>
            <ToastContainer position={toast.POSITION.TOP_CENTER} autoClose={false}/>
        </Container>
    )
}