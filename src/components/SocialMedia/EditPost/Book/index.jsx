import { Container, CoverInputContainer, FormInputContainer, MainForm, TypeHeader, GeneralDiv, OptInputsContainer, Tags } from "./styles"
import { useState, useEffect } from "react"
import axios from "axios"
import { Files } from "./Files"
import { defaultUrl } from "../../../helpers/url"
import { TagsContainer } from "./styles"
import { Checkbox } from "../../NewPost/utils/Checkbox"
import { Options } from "../../NewPost/utils/Options"
import { toast, ToastContainer } from 'react-toastify';
import { deleteFile, getFilesName, uploadCover, uploadFile } from "../../../helpers/firebase"
import { useParams, Navigate } from "react-router-dom"



export const Book = () => {
    const { id } = useParams()
    const parsedId = +id
    const currentUser = localStorage.getItem('id')

    const [publication, setPublication] = useState({})
    const [authorId, setAuthorId] = useState(currentUser)

    const [imageUpload, setImageUpload] = useState(null)
    const [fileUpload, setFileUpload] = useState([null, null, null])
    const [filesName, setFilesName] = useState([{}, {}, {name: null}])
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

    useEffect(() => {
        const getBookById = async () => {
            const data = await axios.get(`${defaultUrl}announcement/id/${id}`)
            .catch(err => console.log(err))

            console.log(data);
            setPublication(data?.data[0])
            setAuthorId(data?.data[0].usuario[0].id_usuario)

            setTitulo(data?.data[0].titulo)
            setSinopse(data?.data[0].sinopse)
            setPreco(data?.data[0].preco)
            setVolume(data?.data[0].volume)
            setPaginas(data?.data[0].quantidade_paginas)

            setPreviewUrl(data?.data[0].capa)
            setSpanDisplay('none')

            const arr = [data?.data[0].pdf, data?.data[0].epub, data?.data[0].mobi]
            const names = await Promise.all(arr.map(async(item) => {
                if (item !== 'null') {
                    return {
                        name : await getFilesName(item)
                    }
                }
                return {
                    name: null
                }
            }))
            setFilesName(names)
        }
        getBookById()
    }, [id])

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
    const handleSubmit = async (e) => {
        e.preventDefault()
    }

    if(isNaN(parsedId) || authorId !== currentUser) {
        return <Navigate to="/app/"/>
    }
    return (
        <Container>
            <TypeHeader>
                <i className="fa-solid fa-pen"></i>  {publication?.titulo}
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
                                    {/* {genres?.map(item => <Checkbox onChange={handleGenres} type="genres" id={item.id_genero} key={item.id_genero} name={item.nome_genero}/> )} */}
                                </Tags>
                            </TagsContainer>
                        </GeneralDiv>
                        <GeneralDiv>
                            <span>E-book</span>
                            <Files filesName={filesName} setFile={setFileUpload} file={fileUpload}/>
                        </GeneralDiv>
                </FormInputContainer>
            </MainForm>
            <ToastContainer position={toast.POSITION.TOP_CENTER}/>
        </Container>
    )
}
