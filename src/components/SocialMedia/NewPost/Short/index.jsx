import { Container, CoverInputContainer, FormInputContainer, MainForm, TypeHeader, GeneralDiv, OptInputsContainer } from "./styles"
import { useState, useEffect } from "react"
import { defaultUrl } from "../../../helpers/url"
import { Checkbox } from "../utils/Checkbox"
import { ButtonCancel, ButtonSave, ButtonsContainer } from "../styles"
import { TagsContainer, Tags } from "../Book/styles"
import axios from "axios"

export const Short = () => {

    const [imageUpload, setImageUpload] = useState(null)
    const [previewUrl, setPreviewUrl] = useState("none")
    const [genres, setGenres] = useState([])

    useEffect(() => {
        const fetchGenres = async () => {
            const data = await axios.get(`${defaultUrl}genres`)
            .catch(err => {console.log(err)})  
            setGenres(data?.data)
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

    return(
        <Container>
            <TypeHeader>
                HISTÓRIA PEQUENA
            </TypeHeader>
            <MainForm>
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
                        <textarea name="" id="" cols="30" rows="10"></textarea>
                    </GeneralDiv>
                    <OptInputsContainer>
                        <GeneralDiv>
                            <span>Classificação Indicativa <i className="fa-solid fa-circle-exclamation"></i></span>
                            <select defaultValue="" name="" id="">
                                <option value="" disabled hidden>Selecione a faixa etária</option>
                            </select>
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
                            <span>História <i className="fa-solid fa-circle-exclamation"></i></span>
                            <textarea placeholder="Escreva a sua História" name="" id="" cols="30" rows="10"></textarea>
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