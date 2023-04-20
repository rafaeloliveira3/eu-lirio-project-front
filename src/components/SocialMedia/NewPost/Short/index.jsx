import { Container, CoverInputContainer, FormInputContainer, MainForm, TypeHeader, GeneralDiv, OptInputsContainer, HistoryContainer, HistoryDiv } from "./styles"
import { useState, useEffect, useRef } from "react"
import { defaultUrl } from "../../../helpers/url"
import { Checkbox } from "../utils/Checkbox"
import { ButtonCancel, ButtonSave, ButtonsContainer } from "../styles"
import { TagsContainer, Tags } from "../Book/styles"
import { Options } from "../utils/Options"
import axios from "axios"
import { toast, ToastContainer } from 'react-toastify';
import { uploadCover, deleteFile } from "../../../helpers/firebase"
import { useNavigate } from "react-router-dom"
import { Editor } from "@tinymce/tinymce-react"
import { MESSAGE_ERROR, MESSAGE_SUCCESS } from "../../../helpers/toasts"

export const Short = () => {
    const navigate = useNavigate()
    const editorRef = useRef()

    const [imageUpload, setImageUpload] = useState(null)
    const [previewUrl, setPreviewUrl] = useState("none")
    const [spanDisplay, setSpanDisplay] = useState("block")
    const [genres, setGenres] = useState([])
    const [parentalRatings, setParentalRatings] = useState([])

    const [titulo, setTitulo] = useState("")
    const [sinopse, setSinopse] = useState("")
    const [currentRating, setCurrentRating] = useState(0)
    const [publicationGenres, setPublicationGenres] = useState([])

    const userId = localStorage.getItem('id')

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

    const preview = (image) => {
        const fileReader = new FileReader()
        fileReader.onloadend = () => (setPreviewUrl(fileReader.result))
        setSpanDisplay("none")

        if (image) {
            fileReader.readAsDataURL(image);
        }
    }

    const handleImage = async () => {
        let url = await uploadCover(imageUpload, imageUpload.name)
        return url
    }

    const handleOptions = (e) => {
        setCurrentRating(e.currentTarget.options[e.currentTarget.selectedIndex].value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        let history = editorRef.current.getContent()

        const genresJson = publicationGenres.map(item => {
            return {
                id_genero: item
            }
        })
        
        const urlCover = await handleImage()

        let submitHistory = {
            titulo : titulo,
            sinopse : sinopse,
            capa : urlCover,
            historia : history,
            premium : 0,
            id_usuario : userId,
            id_tipo_publicacao : 2,
            id_classificacao : currentRating,
            generos : genresJson
        }

        const res = await axios.post(`${defaultUrl}short-storie`, submitHistory)
            .catch((err) => {
                console.log(err)
                deleteFile(urlCover)
                if (err.response?.status !== 500) {
                    MESSAGE_ERROR.default(err)
                }
                MESSAGE_ERROR.bdError()
            })
            console.log('sus');
        if (res.status === 201) {
            MESSAGE_SUCCESS.register("História Curta")
            setTimeout(() => { navigate('/app/feed') }, 2500)
        }
    }

    const handleGenres = (e) => {
        const id = +e.currentTarget.id.split('-')[1]
        if (e.currentTarget.checked) {
            setPublicationGenres([...publicationGenres, id])
        }
        else {
            let genreIndex = publicationGenres.indexOf(id)
            if (genreIndex !== -1) {
                setPublicationGenres(publicationGenres.filter((item, index) => {
                    return genreIndex !== index
                }))
            }
        }
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
                            required
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
                                    <select onChange={handleOptions} required defaultValue="" name="" id="">
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
                            />
                        </GeneralDiv>
                        <ButtonsContainer>
                            <ButtonCancel>Cancelar</ButtonCancel>
                            <ButtonSave type="submit">Salvar</ButtonSave>
                        </ButtonsContainer>
                    </HistoryDiv>
            </MainForm>
            <ToastContainer position={toast.POSITION.TOP_CENTER}/>
        </Container>
    )
}