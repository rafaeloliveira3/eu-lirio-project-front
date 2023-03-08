import { async } from "@firebase/util"
import axios from "axios"
import { useState } from "react"
import { uploadImage } from "../helpers/firebase"
import { defaultUrl } from "../helpers/url"

export const Teste = () => {

    const [imageUpload, setImageUpload] = useState(null)
    const [previewUrl, setPreviewUrl] = useState(null)

    const preview = (image) => {
        const fileReader = new FileReader()
        fileReader.onloadend = () => (setPreviewUrl(fileReader.result))

        if (image) {
            fileReader.readAsDataURL(image);
        }
    }
    
    const handleImage = async () => {
        let url = await uploadImage(imageUpload, imageUpload.name)
        return url
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        const url = await handleImage()
        const json = {
            imageUrl : url,
            name: "teste"
        }

        axios.post(`${defaultUrl}user/login`, json)
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="file" required onChange={(e) => {
                    setImageUpload(e.target.files[0])
                    preview(e.target.files[0])
                }} accept="image/*"/>
                <button type="submit">Upload</button>
            </form>
            <img src={previewUrl} alt="" />
        </>
    )
}