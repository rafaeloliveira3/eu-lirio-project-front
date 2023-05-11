import { Container, CoverInputContainer, FormInputContainer, MainForm, TypeHeader, GeneralDiv, OptInputsContainer, Tags, ModalContentContainer, OptContainer, ToggleContainer } from "./styles"
import { useState, useEffect } from "react"
import axios from "axios"
import { Files } from "./Files"
import { defaultUrl } from "../../../helpers/url"
import { TagsContainer } from "./styles"
import { Checkbox } from "../../NewPost/utils/Checkbox"
import { Options } from "../../NewPost/utils/Options"
import { toast } from 'react-toastify';
import { deleteFile, getFilesName, uploadCover, uploadFile } from "../../../helpers/firebase"
import { useParams, Navigate, useOutletContext, useNavigate } from "react-router-dom"
import { ButtonCancel, ButtonSave, ButtonsContainer } from "../../NewPost/styles"
import Modal from "react-modal"
import { MESSAGE_ERROR, MESSAGE_SUCCESS } from "../../../helpers/toasts"
import Toggle from 'react-styled-toggle';

export const EditBook = () => {
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

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [desactivateSwitch, setDesactivateSwitch] = useState(false)

    const [publication, setPublication] = useState({})
    const [authorId, setAuthorId] = useState(currentUser)

    const [bookGenres, setBookGenres] = useState([])

    const [imageUpload, setImageUpload] = useState(null)
    const [imageBackup, setImageBackup] = useState(null)

    const [bookStatus, setBookStatus] = useState(false)

    const [fileUpload, setFileUpload] = useState([null, null, null])
    const [fileBackup, setFileBackup] = useState([null, null, null])

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

    useEffect(() => {
        const getBookById = async () => {
            const data = await axios.get(`${defaultUrl}announcement/id/?announcementId=${id}&userId=${currentUser}`)
            .catch(err => console.log(err))

            if (data?.data[0].generos !== undefined) {
                setBookGenres(data?.data[0].generos.map((item) => {
                    return item.id_genero
                }))
            }

            setCurrentRating(data?.data[0].classificacao[0].id_classificacao)

            setPublication(data?.data[0])
            setAuthorId(data?.data[0].usuario[0].id_usuario)

            setTitulo(data?.data[0].titulo)
            setSinopse(data?.data[0].sinopse)
            setPreco(data?.data[0].preco)
            setVolume(data?.data[0].volume)
            setPaginas(data?.data[0].quantidade_paginas)

            setBookStatus(data?.data[0].status)
            setDesactivateSwitch(data?.data[0].status)

            setPreviewUrl(data?.data[0].capa)
            setImageBackup(data?.data[0].capa)
            setSpanDisplay('none')

            const arr = [data?.data[0].pdf, data?.data[0].epub, data?.data[0].mobi]
            const names = await Promise.all(arr?.map(async(item) => {
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
            setFileUpload(arr.map((item) => {
                if (item !== 'null') {
                    return item
                }
                return null
            }))
            setFileBackup(arr.map((item) => {
                if (item !== 'null') {
                    return item
                }
                return null
            }))
        }
        getBookById()
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
        bookGenres?.forEach(item => {
            const checkbox = document.querySelector(`#genres-${item}`)
            if (checkbox) {
                checkbox.checked = true
            }
        })
    }, [bookGenres])
    
    const handleOpenModal = () => {
        setIsDeleteModalOpen(true)
    }
    const handleCloseModal = () => {
        setIsDeleteModalOpen(false)
    }

    const preview = (image) => {
        const fileReader = new FileReader()
        fileReader.onloadend = () => (setPreviewUrl(fileReader.result))
        setSpanDisplay('none')

        if (image) {
            fileReader.readAsDataURL(image)
        }
    }

    const handleFiles = async () => {
        const fixedFiles = await Promise.all(fileUpload.map(async(item, index) => {
            if (item !== fileBackup[index]) {
                await deleteFile(fileBackup[index])
                return await uploadFile(item, item.name)
            }
            return fileBackup[index]
        }))
        return fixedFiles
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

        const genresJson = bookGenres.map(item => {
            return {
                id_genero: item
            }
        })

        const filesArr = await handleFiles()
        const urlCover = await handleImage()

        let history = {
            titulo : titulo,
            volume : volume,
            capa : urlCover.url,
            sinopse: sinopse,
            quantidade_paginas: paginas,
            preco: preco,
            pdf: filesArr[0],
            epub: filesArr[1],
            mobi: filesArr[2],
            id_classificacao: currentRating,
            id_usuario: currentUser,
            id_tipo_publicacao : 1,
            generos : genresJson
        }

        console.log(history);

        const res = await axios.put(`${defaultUrl}announcement/id/${parsedId}`, history)
        .catch((err) => {
            if (urlCover.exclude) {
                deleteFile(urlCover.url)
            }
            if (err.response?.status !== 500) {
                MESSAGE_ERROR.default(err)
            }
            MESSAGE_ERROR.bdError()
        })

        if (res.status === 200) {
            MESSAGE_SUCCESS.update("Livro")
            setTimeout(() => { navigate('/app/my-publications') }, 2500)
        }
    }

    const handleGenres = (e) => {
        const id = e.currentTarget.id.split('-')[1]
        if (e.currentTarget.checked) {
            setBookGenres([...bookGenres, id])
        }
        else {
            let genreIndex = bookGenres.indexOf(id)
            if (genreIndex !== -1) {
                setBookGenres(bookGenres.filter((item, index) => {
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
                await axios.put(`${defaultUrl}activate-announcement/id/${parsedId}`)
            }
        } 
        const desactivate = async () => {
            if (bookStatus) {
                await axios.put(`${defaultUrl}desactivate-announcement/id/${parsedId}`)
            }
        }

        switchState ? activate() :  desactivate()
    }

    const handleDelete = async () => {
        let canDelete = true

        await axios.delete(`${defaultUrl}announcement/id/${parsedId}`)
        .catch(err => canDelete = false)

        if (canDelete) {
            const filesArr = await handleFiles() 
            const urlCover = await handleImage()
    
            await deleteFile(urlCover.url)
            await Promise.all(filesArr.map(async (item) => {
                if (item !== null) {
                    await deleteFile(item)
                }
            }))
        }
        else {

        }
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
                            <select onChange={handleOptions} required defaultValue="" name="" id="ratings">
                                <option value="" disabled hidden>Selecione a faixa etária</option>
                                {
                                    parentalRatings?.map(item => <Options name={item.classificacao} id={item.id_classificacao} key={item.id} />) 
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
                            <Files filesName={filesName} setFile={setFileUpload} file={fileUpload}/>
                        </GeneralDiv>
                        <OptContainer>
                            <ToggleContainer>
                                <Toggle
                                    onChange={handleDesactivate}
                                    checked={desactivateSwitch}
                                    backgroundColorChecked={"var(--purple-dark)"}
                                />
                                <span>{desactivateSwitch ? "Desativar" : "Ativar"} Livro</span>
                            </ToggleContainer>
                            <ButtonsContainer>
                                <ButtonCancel type="button" onClick={handleOpenModal}>Excluir</ButtonCancel>
                                <ButtonSave type="submit">Salvar</ButtonSave>
                            </ButtonsContainer>
                        </OptContainer>
                </FormInputContainer>
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
