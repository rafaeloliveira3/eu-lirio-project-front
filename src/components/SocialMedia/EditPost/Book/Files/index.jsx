import { useEffect } from "react"
import { useState } from "react"
import { Container } from "./styles"
import { FilesInputContainer } from "./styles"

export const Files = (props) => {
    const [fileNamePdf, setFileNamePdf] = useState("Arquivo em PDF")
    const [fileNameEpub, setFileNameEpub] = useState("Arquivo em EPUB")
    const [fileNameMobi, setFileNameMobi] = useState("Arquivo em MOBI")

    useEffect(() => {
        setFileNamePdf(props.filesName[0]?.name)
        setFileNameEpub(props.filesName[1]?.name)
        console.log("teste 1");
        if (props.filesName[2]?.name !== null) {
            console.log("teste 2");
            setFileNameMobi(props.filesName[2]?.name)
        }
    })

    const handleFileChange = (e) => {
        const id = e.currentTarget.id
        const fileIndex = {
            'file-pdf' : 0,
            'file-epub' : 1,
            'file-mobi' : 2
        }
        let filesArray = [...props.file]
        const newFilesArray = filesArray.map((item, index) => {
            if (index === fileIndex[id]) {
                switch(index) {
                    case 0 : 
                        setFileNamePdf(e.target.files[0].name)
                        break
                    case 1 : 
                        setFileNameEpub(e.target.files[0].name)
                        break
                    case 2 : 
                        setFileNameMobi(e.target.files[0].name)
                        break
                }
                return e.target.files[0]
            }
            return item
        })
        props.setFile(newFilesArray)
    }

    return (
        <Container>
            <FilesInputContainer>
                <input 
                    type="file" 
                    name="file-pdf" 
                    id="file-pdf" 
                    accept=".pdf"
                    onChange={handleFileChange} 
                    required
                />
                <label htmlFor="file-pdf">
                    <div className="label-content-container">
                        <div></div>
                        <div className="text-container">
                            <i className="fa-solid fa-upload"></i>
                            <span>{fileNamePdf}</span>
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
                    onChange={handleFileChange} 
                    required
                />
                <label htmlFor="file-epub">
                    <div className="label-content-container">
                        <div></div>
                        <div className="text-container">
                            <i className="fa-solid fa-upload"></i>
                            <span>{fileNameEpub}</span>
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
                    onChange={handleFileChange}
                />
                <label htmlFor="file-mobi">
                    <div className="label-content-container">
                        <div></div>
                        <div className="text-container">
                            <i className="fa-solid fa-upload"></i>
                            <span>{fileNameMobi}</span>
                        </div>
                        <div className="icon-container">
                            <i className="fa-solid fa-circle-exclamation transparent"></i>  
                        </div>
                    </div>
                </label>
            </FilesInputContainer>
        </Container>
    )
}