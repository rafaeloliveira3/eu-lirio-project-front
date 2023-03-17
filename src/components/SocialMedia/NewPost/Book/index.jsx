import { Container, CoverInputContainer, FormInputContainer, MainForm, TypeHeader } from "./styles"
import { useState } from "react"

export const Books = () => {

    const [imageUpload, setImageUpload] = useState(null)
    const [previewUrl, setPreviewUrl] = useState("none")

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
                E-BOOK
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
                    <div>
                        <span>Título <i className="fa-solid fa-circle-exclamation"></i></span>
                        <input type="text" />
                    </div>
                    <div>
                        <span>Sinopse <i className="fa-solid fa-circle-exclamation"></i></span>
                        <textarea name="" id="" cols="30" rows="10"></textarea>
                    </div>
                    <div>
                        <div>
                            <span>Preço <i className="fa-solid fa-circle-exclamation"></i></span>
                            <input type="text" />
                        </div>
                        <div>
                            <span>Classificação Indicativa <i className="fa-solid fa-circle-exclamation"></i></span>
                            <select name="" id=""></select>
                        </div>
                        <div>
                            <span>Volume</span>
                            <input type="text" />
                        </div>
                        <div>
                            <span>Páginas <i className="fa-solid fa-circle-exclamation"></i></span>
                            <input type="number" name="" id="" inputMode="numeric"/>
                        </div>
                    </div>
                </FormInputContainer>
            </MainForm>
        </Container>
    )
}