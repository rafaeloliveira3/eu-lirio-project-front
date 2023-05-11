import { Container, CoverInputContainer, FormInputContainer, MainForm, TypeHeader, GeneralDiv, OptInputsContainer, HistoryContainer, HistoryDiv, TagsContainer, Tags, OptContainer, ToggleContainer } from "./styles"
import { useOutletContext, useNavigate, useParams, Navigate } from "react-router-dom"
import { useEffect, useState, useRef } from "react"
import axios from "axios"
import { defaultUrl } from "../../../helpers/url"
import { uploadCover, deleteFile } from "../../../helpers/firebase"
import { MESSAGE_ERROR, MESSAGE_SUCCESS } from "../../../helpers/toasts"
import { Options } from "../../NewPost/utils/Options"
import { ButtonSave, ButtonCancel, ButtonsContainer } from "../../NewPost/styles"
import { Editor } from "@tinymce/tinymce-react"
import { Checkbox } from "../../NewPost/utils/Checkbox"
import Modal from "react-modal"
import { ModalContentContainer } from "../Book/styles"
import Toggle from "react-styled-toggle"

export const EditShorts = () => {
    const { setAdsDisplay, setSearchbarDisplay, setFeedWidth } = useOutletContext()

    useEffect(() => {
        setAdsDisplay(true)
        setSearchbarDisplay(true)
        setFeedWidth(true)
    })

    const { id } = useParams()
    const parsedId = +id
    const currentUser = localStorage.getItem('id')
    const navigate = useNavigate()

    const editorRef = useRef()

    const [imageUpload, setImageUpload] = useState(null)
    const [previewUrl, setPreviewUrl] = useState("none")
    const [imageBackup, setImageBackup] = useState(null)

    const [desactivateSwitch, setDesactivateSwitch] = useState(false)
    const [bookStatus, setBookStatus] = useState(false)

    const [spanDisplay, setSpanDisplay] = useState("block")
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

    const [genres, setGenres] = useState([])
    const [shortGenres, setShortGenres] = useState([])

    const [parentalRatings, setParentalRatings] = useState([])
    const [authorId, setAuthorId] = useState(currentUser)
    const [initialValue, setInitialValue] = useState("")

    const [titulo, setTitulo] = useState("")
    const [sinopse, setSinopse] = useState("")
    const [currentRating, setCurrentRating] = useState(0)

    const userId = localStorage.getItem('id')

    useEffect(() => {
        const getShortById = async () => {
            const data = await axios.get(`${defaultUrl}short-storie/id/?shortStorieId=${id}&userId=${userId}`)
            .catch(err => console.log(err))

            setInitialValue(data?.data[0].historia)
            console.log(data.data[0]);
            if (data?.data[0].generos !== undefined) {
                setShortGenres(data?.data[0].generos.map((item) => {
                    return item.id_genero
                }))
            }

            setCurrentRating(data?.data[0].classificacao[0].id_classificacao)
            setAuthorId(data?.data[0].usuario[0].id_usuario)

            setBookStatus(data?.data[0].status)
            setDesactivateSwitch(data?.data[0].status)

            setTitulo(data?.data[0].titulo)
            setSinopse(data?.data[0].sinopse)

            setPreviewUrl(data?.data[0].capa)
            setImageBackup(data?.data[0].capa)
            setSpanDisplay('none')
        }
        getShortById()
    }, [id])

    useEffect(() => {
        const fetchGenres = async () => {
            const data = await axios.get(`${defaultUrl}genres`)
            .catch(err => {console.log(err)})  
            setGenres(data?.data)
        }
        fetchGenres()
    }, [])
    useEffect(() => {
        const fetchRatings = async () => {
            const data = await axios.get(`${defaultUrl}parental-ratings`)
            .catch(err => {console.log(err)})  
            setParentalRatings(data?.data.parental_ratings)
        }
        fetchRatings()
    }, [])
    useEffect(() => {
        const select = document.querySelector('#ratings')
        if (currentRating !== 0) {
            if (select) {
                select.value = currentRating
            }
        }
    }, [currentRating])
    useEffect(() => {
        shortGenres?.forEach(item => {
            const checkbox = document.querySelector(`#genres-${item}`)
            if (checkbox) {
                checkbox.checked = true
            }
        })
    }, [shortGenres])

    const handleOpenModal = () => {
        setIsDeleteModalOpen(true)
    }
    const handleCloseModal = () => {
        setIsDeleteModalOpen(false)
    }

    const preview = (image) => {
        const fileReader = new FileReader()
        fileReader.onloadend = () => (setPreviewUrl(fileReader.result))
        setSpanDisplay("none")

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
        await deleteFile(imageBackup)
        let url = await uploadCover(imageUpload, imageUpload.name)
        return {
            exlude : true,
            url : url
        }
    }

    const handleOptions = (e) => {
        setCurrentRating(e.currentTarget.options[e.currentTarget.selectedIndex].value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const history = editorRef.current.getContent()

        const genresJson = shortGenres.map(item => {
            return {
                id_genero: item
            }
        })
        
        const urlCover = await handleImage()

        let submitHistory = {
            titulo : titulo,
            sinopse : sinopse,
            capa : urlCover.url,
            historia : history,
            id_usuario : userId,
            id_tipo_publicacao : 2,
            id_classificacao : currentRating,
            generos : genresJson
        }

        const res = await axios.put(`${defaultUrl}short-storie/id/${parsedId}`, submitHistory)
            .catch((err) => {
                if (urlCover.exlude) {
                    deleteFile(urlCover)
                }
                if (err.response?.status !== 500) {
                    MESSAGE_ERROR.default(err)
                }
                MESSAGE_ERROR.bdError()
            })
        if (res.status === 201) {
            MESSAGE_SUCCESS.update("História Curta")
            setTimeout(() => { navigate('/app/my-publications') }, 2500)
        }
    }

    const handleGenres = (e) => {
        const id = e.currentTarget.id.split('-')[1]
        if (e.currentTarget.checked) {
            setShortGenres([...shortGenres, id])
        }
        else {
            let genreIndex = shortGenres.indexOf(id)
            if (genreIndex !== -1) {
                setShortGenres(shortGenres.filter((item, index) => {
                    return genreIndex !== index
                }))
            }
        }
    }

    const handleDesactivate = () => {
        setDesactivateSwitch(!desactivateSwitch)
        let switchState = !desactivateSwitch

        const activate = async () => {
            if (!bookStatus) {
                await axios.put(`${defaultUrl}activate-short-storie/id/${parsedId}`)
            }
        } 
        const desactivate = async () => {
            if (bookStatus) {
                await axios.put(`${defaultUrl}desactivate-short-storie/id/${parsedId}`)
            }
        }

        switchState ? activate() :  desactivate()
    }

    const handleDelete = () => {
        console.log("testando")
    }

    if(isNaN(parsedId) || authorId !== currentUser) {
        return <Navigate to="/app/"/>
    }
    return(
        <Container>
            <TypeHeader>
                HISTÓRIA PEQUENA
            </TypeHeader>
            <MainForm onSubmit={handleSubmit}>
                <HistoryContainer>
                    <CoverInputContainer image={previewUrl} span={spanDisplay}>
                        <input 
                            type="file" 
                            name="book-cover" 
                            id="book-cover" 
                            accept="image/*"
                            onChange={(e) => {
                                setImageUpload(e.target.files[0])
                                preview(e.target.files[0])
                            }} 
                        />
                        <label htmlFor="book-cover">
                            <div className="label-content-container">
                                <div></div>
                                <div className="text-container">
                                    <i className="fa-solid fa-file-image"></i>
                                    <span>Adicione a Capa</span>
                                </div>
                                <div className="icon-container">
                                    <i className="fa-solid fa-circle-exclamation"></i>
                                </div>
                            </div>
                        </label>
                    </CoverInputContainer>
                        <FormInputContainer>
                            <GeneralDiv>
                                <span>Título <i className="fa-solid fa-circle-exclamation"></i></span>
                                <input 
                                    type="text" 
                                    value={titulo}
                                    required
                                    onChange={(e) => {
                                        setTitulo(e.currentTarget.value)
                                    }}
                                />
                            </GeneralDiv>
                            <GeneralDiv>
                                <span>Sinopse <i className="fa-solid fa-circle-exclamation"></i></span>
                                <textarea 
                                    name="" 
                                    required
                                    id="" 
                                    cols="30" 
                                    rows="10"
                                    value={sinopse}
                                    onChange={(e) => {
                                        setSinopse(e.currentTarget.value)
                                    }}
                                ></textarea>
                            </GeneralDiv>
                            <OptInputsContainer>
                                <GeneralDiv>
                                    <span>Classificação Indicativa <i className="fa-solid fa-circle-exclamation"></i></span>
                                    <select onChange={handleOptions} required defaultValue="" name="" id="ratings">
                                        <option value="" disabled hidden>Selecione a faixa etária</option>
                                        {
                                            parentalRatings?.map(item => <Options name={item.classificacao} id={item.id_classificacao} key={item.id} />) 
                                        }
                                    </select>
                                </GeneralDiv>
                            </OptInputsContainer>
                                <GeneralDiv>
                                    <span>Gêneros da História <i className="fa-solid fa-circle-exclamation"></i></span>
                                    <TagsContainer>
                                        <Tags>
                                            {genres?.map(item => <Checkbox onChange={handleGenres} type="genres" id={item.id_genero} key={item.id_genero} name={item.nome_genero}/> )}
                                        </Tags>
                                    </TagsContainer>
                                </GeneralDiv>
                        </FormInputContainer>

                </HistoryContainer>
                    <HistoryDiv>
                        <GeneralDiv>
                            <span>História <i className="fa-solid fa-circle-exclamation"></i></span>
                            <Editor 
                                onInit={(e, editor) => editorRef.current = editor}
                                required
                                init={{	
                                    menubar: false,	
                                    selector: 'textarea',	
                                    resize: false,
                                    width: '100%',
                                    skin: 'naked',
                                    icons: 'thin',
                                    placeholder: 'Escreva a sua História',
                                    toolbar: 'undo redo | fontsize | bold italic underline | alignleft aligncenter alignright alignjustify | indent outdent | removeformat'
                                }}
                                initialValue={initialValue}
                            />
                        </GeneralDiv>
                        <OptContainer>
                            <ToggleContainer>
                                <Toggle
                                    onChange={handleDesactivate}
                                    checked={desactivateSwitch}
                                    backgroundColorChecked={"var(--purple-dark)"}
                                />
                                <span>{desactivateSwitch ? "Desativar" : "Ativar"} Curta</span>
                            </ToggleContainer>
                            <ButtonsContainer>
                                <ButtonCancel type="button" onClick={handleOpenModal}>Excluir</ButtonCancel>
                                <ButtonSave type="submit">Salvar</ButtonSave>
                            </ButtonsContainer>
                        </OptContainer>
                    </HistoryDiv>
            </MainForm>
            <Modal
                isOpen={isDeleteModalOpen}
                onRequestClose={handleCloseModal}
                overlayClassName="delete-modal-overlay"
                className="delete-modal-content"
            >
                <ModalContentContainer>
                    <i className="fa-solid fa-trash"></i>
                    <h2>Deseja mesmo excluir o livro {titulo}?</h2>
                    <p>Essa ação é irreversível e resultará na exclusão completa dessa publicação dentro da plataforma.</p>
                    <span>
                        <button className="cancelar" onClick={handleCloseModal}>Cancelar</button>
                        <button className="apagar" onClick={handleDelete}>Apagar</button>
                    </span>
                </ModalContentContainer>
            </Modal>
        </Container>
    )
}