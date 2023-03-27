import { Form, Container, ModalContentContainer, TagsContainer, Tags } from "./styles"
import { useEffect, useState } from "react"
import Modal from "react-modal"
import axios from "axios"
import { defaultUrl } from "../../helpers/url"
import { Checkbox } from "./utils/Checkbox"
import { deleteFile, uploadImage } from "../../helpers/firebase"
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate, useOutletContext } from "react-router-dom"

export const Edit = () => {
    const { setAdsDisplay, setSearchbarDisplay, setFeedWidth } = useOutletContext()

    useEffect(() => {
        setAdsDisplay(false)
        setSearchbarDisplay(false)
        setFeedWidth(false)
    })

    const navigate = useNavigate()

    const [genres, setGenres] = useState([])
    const [userGenres, setUserGenres] = useState([])
    const [genresBackup, setGenresBackup] = useState([])

    const [tags, setTags] = useState([])
    const [userTags, setUserTags] = useState([])
    const [tagsBackup, setTagsBackup] = useState([])

    const [photoBackup, setPhotoBackup] = useState("")

    const [userName, setUserName] = useState("")
    const [userFullName, setUserFullName] = useState("")
    const [userBio, setUserBio] = useState("Nada Informado")
    const [userBirth, setUserBirth] = useState("")
    const [userEmail, setUserEmail] = useState("")
    
    const [imageUpload, setImageUpload] = useState(null)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [previewUrl, setPreviewUrl] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")

    const userId = localStorage.getItem('id')
    
    const deleteSucces = () => toast.success('Usuário Deletado Com Sucesso!')
    
    // FETCHING USER DATA
    useEffect(() => {
        const fetchUser = async () => {
            const data = await axios.get(`${defaultUrl}user/id/${userId}`)
            .catch((err) => { console.log(err) })
            setUserGenres(data?.data.generos.map(item => {
                return item.id
            }))
            setGenresBackup(data?.data.generos.map(item => {
                return item.id
            }))

            setUserTags(data?.data.tags.map(item => {
                return item.id
            }))
            setTagsBackup(data?.data.tags.map(item => {
                return item.id
            })) 

            setUserName(data?.data.user_name)
            setUserFullName(data?.data.nome)
            setUserBirth(data?.data.data_nascimento)
            setUserEmail(data?.data.email)

            if (data.data.foto !== null && data.data.foto !== undefined) setPreviewUrl(data.data.foto)
            if (data.data.foto !== null && data.data.foto !== undefined) setPhotoBackup(data.data.foto)
            if (data.data.biografia !== null && data.data.biografia !== undefined) setUserBio(data.data.biografia)
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
    }, [])


    //FETCHING BOOK GENRES
    useEffect(() => {
        const fetchGenres = async () => {
            const data = await axios.get(`${defaultUrl}genres`)
            .catch(err => {console.log(err)})  
            setGenres(data?.data)
        }
        fetchGenres()
    }, [])

    // FETCHING USER GENRES 
    useEffect(() => {
        const setCheckboxesActive = () => {
            userGenres?.forEach(item => {
                document.querySelector(`#genres-${item}`).checked = true
            })
        }
        setCheckboxesActive()
    }, [genresBackup])

    //FETCHING USER TAGS
    useEffect(() => {
        const setCheckboxesActive = () => {
            userTags?.forEach(item => {
                document.querySelector(`#tags-${item}`).checked = true
            })
        }
        setCheckboxesActive()
    }, [tagsBackup])

    const preview = (image) => {
        const fileReader = new FileReader()
        fileReader.onloadend = () => (setPreviewUrl(fileReader.result))

        if (image) {
            fileReader.readAsDataURL(image);
        }
    }
    const handleImage = async () => {
        if (imageUpload === null) {
            return {
                exclude : false,
                url : previewUrl
            }
        }
        await deleteFile(photoBackup)
        let url = await uploadImage(imageUpload, imageUpload.name)
        return {
            exlude : true,
            url : url
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
    
        let tagsArr = userTags

        const genresJson = userGenres.map(item => {
            return {
                id_genero: item
            }
        })
        if(tagsArr[1] === undefined) {
            tagsArr[1] = null
        }
        const imageurl = await handleImage()
        const birthDate = userBirth.split("T")[0]

        const edited = {
            user_name: userName,
            nome: userFullName,
            data_nascimento: birthDate,
            foto: imageurl.url,
            biografia: userBio,
            email: userEmail,
            premium: 0,
            id_tag_1: tagsArr[0],
            id_tag_2: tagsArr[1],
            generos: genresJson
        }
        const res = await axios.put(`${defaultUrl}user/id/${userId}`, edited)
        .catch((err) => {
            console.log(err)
            if (imageurl.exclude) {
                deleteFile(imageurl)
            }
        })
        if (res.status === 200) {
            window.location.reload()
        }
    }

    const handleDeleteAccount = async () => {
        const res = await axios.delete(`${defaultUrl}user/id/${userId}`)
        if(res.status === 200 ) {
            deleteSucces()
            setTimeout(() => { navigate('/login') }, 2500)
        }
    }

    const handleTags = (e) => {
        const id = +e.currentTarget.id.split('-')[1]
        if (e.currentTarget.checked) {
            setUserTags([...userTags, id])
        }
        else {
            let tagIndex = userTags.indexOf(id)
            if (tagIndex !== -1) {
                setUserTags(userTags.filter((item, index) => {
                    return tagIndex !== index
                }))
            }
        }
    }

    const handleGenres = (e) => {
        const id = +e.currentTarget.id.split('-')[1]
        if (e.currentTarget.checked) {
            setUserGenres([...userGenres, id])
        }
        else {
            let genreIndex = userGenres.indexOf(id)
            if (genreIndex !== -1) {
                setUserGenres(userGenres.filter((item, index) => {
                    return genreIndex !== index
                }))
            }
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
                            {tags?.map(item => <Checkbox type="tags" id={item.id} onChange={handleTags} key={item.id} name={item.tag}/> )}
                        </TagsContainer>
                    </Tags>
                    <Tags>
                        <span><i className="fa-solid fa-tag"></i></span>
                        <TagsContainer>
                            {genres?.map(item => <Checkbox type="genres" id={item.id} onChange={handleGenres} key={item.id} name={item.nome}/> )}
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