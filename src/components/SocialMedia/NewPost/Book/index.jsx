import { Container, CoverInputContainer, FormInputContainer, MainForm, TypeHeader, GeneralDiv, OptInputsContainer, Tags } from "./styles"
import { useState, useEffect } from "react"
import axios from "axios"
import { Files } from "./Files"
import { ButtonCancel, ButtonSave, ButtonsContainer } from "../styles"
import { defaultUrl } from "../../../helpers/url"
import { TagsContainer } from "./styles"
import { Checkbox } from "../utils/Checkbox"

export const Books = () => {

    const [imageUpload, setImageUpload] = useState(null)
    const [previewUrl, setPreviewUrl] = useState("none")
    const [genres, setGenres] = useState([])
    const [genresCheckboxes, setGenresCheckboxes] = useState([])

    useEffect(() => {
        const fetchGenres = async () => {
            const data = await axios.get(`${defaultUrl}genres`)
            .catch(err => {console.log(err)})  
            setGenres(data?.data)
            setGenresCheckboxes(new Array(data?.data.length).fill(false))
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

    const handleSubmit = async (e) => {
        e.preventDefault()
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
                        <input type="text" />
                    </GeneralDiv>
                    <GeneralDiv>
                        <span>Sinopse <i className="fa-solid fa-circle-exclamation"></i></span>
                        <textarea name="" id=""></textarea>
                    </GeneralDiv>
                    <OptInputsContainer>
                        <GeneralDiv>
                            <span>Preço <i className="fa-solid fa-circle-exclamation"></i></span>
                            <input type="text" />
                        </GeneralDiv>
                        <GeneralDiv>
                            <span>Classificação Indicativa <i className="fa-solid fa-circle-exclamation"></i></span>
                            <select name="" id="">
                                <option value="" selected disabled hidden>Selecione a faixa etária</option>
                            </select>
                        </GeneralDiv>
                        <GeneralDiv>
                            <span>Volume</span>
                            <input type="text" />
                        </GeneralDiv>
                        <GeneralDiv>
                            <span>Páginas <i className="fa-solid fa-circle-exclamation"></i></span>
                            <input type="number" name="" id="" inputMode="numeric"/>
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
                            <Files />
                        </GeneralDiv>
                        <ButtonsContainer>
                            <ButtonCancel>Cancelar</ButtonCancel>
                            <ButtonSave type="submit">Salvar</ButtonSave>
                        </ButtonsContainer>
                </FormInputContainer>
            </MainForm>
        </Container>
    )
}