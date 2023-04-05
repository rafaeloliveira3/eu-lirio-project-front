import { Container, CoverInputContainer, FormInputContainer, MainForm, TypeHeader, GeneralDiv, OptInputsContainer, Tags } from "./styles"
import { useState, useEffect } from "react"
import axios from "axios"
import { Files } from "./Files"
import { ButtonCancel, ButtonSave, ButtonsContainer } from "../styles"
import { defaultUrl } from "../../../helpers/url"
import { TagsContainer } from "./styles"
import { Checkbox } from "../utils/Checkbox"
import { Options } from "../utils/Options"
import { toast, ToastContainer } from 'react-toastify';
import { deleteFile, uploadCover, uploadFile } from "../../../helpers/firebase"
import { useNavigate } from "react-router-dom"
import { MESSAGE_ERROR, MESSAGE_SUCCESS } from "../../../helpers/toasts"

export const Books = () => {

    const navigate = useNavigate()

    const [imageUpload, setImageUpload] = useState(null)
    const [fileUpload, setFileUpload] = useState([null, null, null])
    const [previewUrl, setPreviewUrl] = useState("none")
    const [spanDisplay, setSpanDisplay] = useState("block")
    const [genres, setGenres] = useState([])
    const [parentalRatings, setParentalRatings] = useState([])

    const [titulo, setTitulo] = useState("")
    const [volume, setVolume] = useState(0)
    const [paginas, setPaginas] = useState(0)
    const [sinopse, setSinopse] = useState("")
    const [preco, setPreco] = useState(0.00)
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
        setSpanDisplay('none')

        if (image) {
            fileReader.readAsDataURL(image)
        }
    }
    const handleOptions = (e) => {
        setCurrentRating(e.currentTarget.options[e.currentTarget.selectedIndex].value)
    }

    const handleImage = async () => {
        let url = await uploadCover(imageUpload, imageUpload.name)
        return url
    }
    const handleFiles = async () => {
        let url = await Promise.all(fileUpload.map(async (item) => {
            if (item !== null)
                return await uploadFile(item, item.name)
            else return item
        }))
        return url   
    }
        
    const handleSubmit = async (e) => {
        e.preventDefault()
        const genresJson = publicationGenres.map(item => {
            return {
                id_genero: item
            }
        })

        const urlArray = await handleFiles()
        const urlCover = await handleImage()
        
        let history = {
            titulo : titulo,
            volume : volume,
            capa : urlCover,
            sinopse: sinopse,
            quantidade_paginas: paginas,
            preco: preco,
            pdf: urlArray[0],
            epub: urlArray[1],
            mobi: urlArray[2],
            id_classificacao: currentRating,
            id_usuario: userId,
            id_tipo_publicacao : 1,
            generos : genresJson
        }

        const res = await axios.post(`${defaultUrl}announcement`, history)
            .catch((err) => {
                deleteFile(urlCover)
                urlArray.forEach(item => {
                    deleteFile(item)
                })
                if (err.response?.status !== 500) {
                    MESSAGE_ERROR.default(err)
                }
                MESSAGE_ERROR.bdError()
            })
        if (res.status === 201) {
            MESSAGE_SUCCESS.register("Livro")
            setTimeout(() => { navigate('/app/feed') }, 2500)
        }
    }

    const handleCancel = (e) => {
        e.preventDefault()
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
                E-BOOK
            </TypeHeader>
            <MainForm onSubmit={handleSubmit}>
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
                            onChange={(e) => {
                                setTitulo(e.currentTarget.value)
                            }}
                            required
                        />
                    </GeneralDiv>
                    <GeneralDiv>
                        <span>Sinopse <i className="fa-solid fa-circle-exclamation"></i></span>
                        <textarea 
                            name="" 
                            id=""
                            value={sinopse}
                            required
                            onChange={(e) => {
                                setSinopse(e.currentTarget.value)
                            }}
                        ></textarea>
                    </GeneralDiv>
                    <OptInputsContainer>
                        <GeneralDiv>
                            <span>Preço <i className="fa-solid fa-circle-exclamation"></i></span>
                            <input 
                                type="number" 
                                min="1" 
                                step=".01" 
                                value={preco}
                                required
                                onChange={(e) => {
                                    setPreco(e.currentTarget.value)
                                }}
                            />
                        </GeneralDiv>
                        <GeneralDiv>
                            <span>Classificação Indicativa <i className="fa-solid fa-circle-exclamation"></i></span>
                            <select onChange={handleOptions} required defaultValue="" name="" id="">
                                <option value="" disabled hidden>Selecione a faixa etária</option>
                                {
                                    parentalRatings?.map(item => <Options name={item.classificacao} id={item.id} key={item.id} />) 
                                }
                            </select>
                        </GeneralDiv>
                        <GeneralDiv>
                            <span>Volume</span>
                            <input 
                                type="number" 
                                min="1" 
                                step="1"
                                value={volume}
                                onChange={(e) => {
                                    setVolume(e.currentTarget.value)
                                }}
                            />
                        </GeneralDiv>
                        <GeneralDiv>
                            <span>Páginas <i className="fa-solid fa-circle-exclamation"></i></span>
                            <input 
                                type="number" 
                                name=""
                                min="1" 
                                id="" 
                                required
                                inputMode="numeric"
                                value = {paginas}
                                onChange={(e) => {
                                    setPaginas(e.currentTarget.value)
                                }}
                            />
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
                        <GeneralDiv>
                            <span>E-book</span>
                            <Files setFile={setFileUpload} file={fileUpload}/>
                        </GeneralDiv>
                        <ButtonsContainer>
                            <ButtonCancel onClick={handleCancel}>Cancelar</ButtonCancel>
                            <ButtonSave type="submit">Salvar</ButtonSave>
                        </ButtonsContainer>
                </FormInputContainer>
            </MainForm>
            <ToastContainer position={toast.POSITION.TOP_CENTER}/>
        </Container>
    )
}