import { Container } from "./styles"
import { FilesInputContainer } from "./styles"

export const Files = () => {
    return (
        <Container>
            <FilesInputContainer>
                <input 
                    type="file" 
                    name="file-pdf" 
                    id="file-pdf" 
                    accept=".pdf"
                />
                <label htmlFor="file-pdf">
                    <div className="label-content-container">
                        <div></div>
                        <div className="text-container">
                            <i class="fa-solid fa-upload"></i>
                            <span>Arquivo em PDF</span>
                        </div>
                        <div className="icon-container">
                            <i className="fa-solid fa-circle-exclamation"></i>  
                        </div>
                    </div>
                </label>
            </FilesInputContainer>
            <FilesInputContainer>
                <input 
                    type="file" 
                    name="file-epub" 
                    id="file-epub" 
                    accept=".epub"
                />
                <label htmlFor="file-epub">
                    <div className="label-content-container">
                        <div></div>
                        <div className="text-container">
                            <i class="fa-solid fa-upload"></i>
                            <span>Arquivo em EPUB</span>
                        </div>
                        <div className="icon-container">
                            <i className="fa-solid fa-circle-exclamation"></i>  
                        </div>
                    </div>
                </label>
            </FilesInputContainer>
            <FilesInputContainer>
                <input 
                    type="file" 
                    name="file-mobi" 
                    id="file-mobi" 
                    accept=".mobi"
                />
                <label htmlFor="file-mobi">
                    <div className="label-content-container">
                        <div></div>
                        <div className="text-container">
                            <i class="fa-solid fa-upload"></i>
                            <span>Arquivo em MOBI</span>
                        </div>
                        <div className="icon-container">
                            <i className="fa-solid fa-circle-exclamation"></i>  
                        </div>
                    </div>
                </label>
            </FilesInputContainer>
        </Container>
    )
}