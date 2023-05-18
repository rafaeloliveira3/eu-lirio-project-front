export const FormatsDownload = (props) => {
    const pdf = props.book?.pdf
    const epub = props.book?.epub
    const mobi = props.book?.mobi

    const downloadFile = async () => {
        if (props.name === "PDF") {
            window.open(pdf, '_blank').focus()
        }
        else if (props.name === "ePUB") {
            window.open(epub, '_blank').focus()
        }
        else if (props.name === "MOBI") {
            window.open(mobi, '_blank').focus()
        }
    }

    return (
        <button onClick={downloadFile}>{props.name}</button>
    )
}