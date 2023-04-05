export const Error = (props) => {
    if (props.error) {
        return (
            <h1>Usuário não Encontrado</h1>
        )
    }
    else return <></>
}