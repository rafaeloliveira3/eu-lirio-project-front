import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { defaultUrl } from "../../../helpers/url"
import { ShortItem } from "./ShortItem"
import { Container } from "./styles"

export const Shorts = () => {
    const [shorts, setShorts] = useState([])

    useEffect(() => {
        const getShorts = async () => {
            const data = await axios.get(`${defaultUrl}short-stories`)
            .catch(err => console.log(err))

            setShorts(data?.data)
        }
        getShorts()
    }, [1])

    return (
        <Container>
            {shorts?.map((item) => <ShortItem key={item.id} id={item.id} capa={item.capa} generos={item.generos} sinopse={item.sinopse} />)}
        </Container>
    )
}