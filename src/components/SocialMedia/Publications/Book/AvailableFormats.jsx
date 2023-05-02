import { useEffect, useState } from "react"
import { getFileSize } from "../../../helpers/firebase"

export const AvailableFormats = (props) => {
    const pdf = props.book?.pdf
    const epub = props.book?.epub
    const mobi = props.book?.mobi
    const [size, setSize] = useState("0")

    useEffect(() => {
        const fileSize = async () => {
            if (props.name === "PDF") {
                const bytes = await getFileSize(pdf)
                setSize(bytes)
            }
            else if (props.name == "ePUB") {
                const bytes = await getFileSize(epub)
                setSize(bytes)
            }
            else if (props.name == "MOBI") {
                const bytes = await getFileSize(mobi)
                setSize(bytes)
            }
        }
        fileSize()
    })

    return (
        <li>{props.name} ({size})</li>
    )
}