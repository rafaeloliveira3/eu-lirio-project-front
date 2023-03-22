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
import { uploadCover, uploadFile } from "../../../helpers/firebase"

export const Books = () => {

    const [imageUpload, setImageUpload] = useState(null)
    const [fileUpload, setFileUpload] = useState([null, null, null])
    const [previewUrl, setPreviewUrl] = useState("none")
    const [genres, setGenres] = useState([])
    const [parentalRatings, setParentalRatings] = useState([])

    const [titulo, setTitulo] = useState("")
    const [volume, setVolume] = useState(0)
    const [paginas, setPaginas] = useState(0)
    const [sinopse, setSinopse] = useState("")
    const [preco, setPreco] = useState(0.00)
    const [currentRating, setCurrentRating] = useState(0)

    const userId = localStorage.getItem('id')

    useEffect(() => {
        const fetchGenres = async () => {
            const data = await axios.get(`${defaultUrl}genres`)
            .catch(err => {console.log(err)})  
            setGenres(data?.data)
        }
        fetchGenres()
    }, [1])
    useEffect(() => {
        const fetchRatings = async () => {
            const data = await axios.get(`${defaultUrl}parental-ratings`)
            .catch(err => {console.log(err)})  
            setParentalRatings(data?.data.parental_ratings)
        }
        fetchRatings()
    }, [1])

    const publicationFailed = (err) => toast.error(`${err.response.data} - Erro: ${err.response.status}`)
    const bdError = () => toast.warning('A Conexão com o Servidor Falhou. Tente Novamente Mais Tarde')
    const publicationSuccess = () => toast.success('Usuário Cadastrado! - Faça login para entrar em sua conta!')

    const preview = (image) => {
        const fileReader = new FileReader()
        fileReader.onloadend = () => (setPreviewUrl(fileReader.result))

        if (image) {
            fileReader.readAsDataURL(image);
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
            generos : [
                {
                    id_genero : 1
                }
            ]
        }
        console.log(history)

        const response = await axios.post(`${defaultUrl}announcement`, history)
            .catch((err) => {
                if (err.response?.status !== 500) {
                    publicationFailed(err)
                }
                bdError()
            })
        console.log(response);
    }

    return(
        <Container>
            <TypeHeader>
                E-BOOK
            </TypeHeader>
            <MainForm onSubmit={handleSubmit}>
                <CoverInputContainer image={previewUrl}>
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
                                min="0" 
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
                                    {genres?.map(item => <Checkbox type="genres" id={item.id} key={item.id} name={item.nome}/> )}
                                </Tags>
                            </TagsContainer>
                        </GeneralDiv>
                        <GeneralDiv>
                            <span>E-book</span>
                            <Files setFile={setFileUpload} file={fileUpload}/>
                        </GeneralDiv>
                        <ButtonsContainer>
                            <ButtonCancel>Cancelar</ButtonCancel>
                            <ButtonSave type="submit">Salvar</ButtonSave>
                        </ButtonsContainer>
                </FormInputContainer>
            </MainForm>
            <ToastContainer position={toast.POSITION.TOP_CENTER} autoClose={false}/>
        </Container>
    )
}