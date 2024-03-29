import { Form, Container, ModalContentContainer, TagsContainer, Tags, GenresContainer } from "./styles"
import { useEffect, useState } from "react"
import Modal from "react-modal"
import axios from "axios"
import { defaultUrl } from "../../helpers/url"
import { Checkbox } from "./utils/Checkbox"
import { deleteFile, uploadImage } from "../../helpers/firebase"
import { useNavigate, useOutletContext } from "react-router-dom"
import { MESSAGE_SUCCESS } from "../../helpers/toasts"

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
    
    const [tags, setTags] = useState([])
    const [userTags, setUserTags] = useState([])
    
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
    
    // FETCHING USER DATA
    useEffect(() => {
        const fetchUser = async () => {
            const data = await axios.get(`${defaultUrl}user/id/?searchUser=${userId}&currentUser=${userId}`)
            .catch((err) => { console.log(err) })

            setUserGenres(data?.data.generos.map(item => {
                return item.id_genero
            }))

            setUserTags(data?.data.tags.map(item => {
                return item.id_tag
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
            .catch(err => console.log(err))  
            console.log(data.data);
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
        userGenres?.forEach(item => {
            const checkbox = document.querySelector(`#genres-${item}`)
            if (checkbox) {
                checkbox.checked = true
            }
        })
    }, [userGenres])

    //FETCHING USER TAGS
    useEffect(() => {
        userTags?.forEach(item => {
            const checkbox = document.querySelector(`#tags-${item}`)
            if (checkbox) {
                checkbox.checked = true
            }
        })
    }, [userTags])

    const preview = (image) => {
        const fileReader = new FileReader()
        fileReader.onloadend = () => (setPreviewUrl(fileReader.result))

        if (image) {
            fileReader.readAsDataURL(image)
        }
    }
    const handleImage = async () => {
        if (photoBackup === 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' && imageUpload !== null) {
            let url = await uploadImage(imageUpload, imageUpload.name)
            return {
                exclude : true,
                url : url
            }
        }
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
            premium: "false",
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
            document.location.reload()
        }
    }

    const handleDeleteAccount = async () => {
        const res = await axios.delete(`${defaultUrl}user/id/${userId}`)
        if(res.status === 200 ) {
            MESSAGE_SUCCESS.delete("Usuário")
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
                            {tags?.map(item => <Checkbox type="tags" id={item.id_tag} onChange={handleTags} key={item.id_tag} name={item.nome_tag}/> )}
                        </TagsContainer>
                    </Tags>
                    <Tags>
                        <span><i className="fa-solid fa-tag"></i></span>
                        <GenresContainer>
                            {genres?.map(item => <Checkbox type="genres" id={item.id_genero} onChange={handleGenres} key={item.id_genero} name={item.nome_genero}/> )}
                        </GenresContainer>
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
                overlayClassName="delete-modal-overlay"
                className="delete-modal-content"
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
        </Container>
    )
}