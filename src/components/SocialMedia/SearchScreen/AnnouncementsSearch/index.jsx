import axios from "axios"
import { useEffect, useState } from "react"
import { useOutletContext, useParams } from "react-router-dom"
import { defaultUrl } from "../../../helpers/url"
import { Card } from "../../Feed/Cards/Card"
import { CardsContainer, FilterContainer, FilterModalContent, Loader, LoaderContainer } from "../styles"
import Modal from "react-modal"
import { FiltersModal } from "../FiltersModal"

export const AnnouncementsSearch = () => {

    const { setPrompt } = useOutletContext()

    const prompt = useParams()
    const userId = localStorage.getItem('id')

    const [announcements, setAnnouncements] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [filterContentSetter, setFilterContentSetter] = useState(1)

    const [filterParams, setFilterParams] = useState({})

    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)

    useEffect(() => {
        setError(false)
        setLoading(true)
    }, [prompt.prompt])

    useEffect(() => {
        setPrompt(prompt.prompt)
        const getBooksbyName = async () => {
            const data = await axios.get(`${defaultUrl}announcements/announcement-title/?announcementTitle=${prompt.prompt}&userId=${userId}`)
            .catch(err => {
                if (err.code === 'ERR_NETWORK') {
                    setError("Algo deu errado, tente novamente mais tarde")
                }
                else {
                    setError("Nenhum item corresponde com sua busca!")
                }
            })
            
            setLoading(false)
            setAnnouncements(data?.data)
        }
        getBooksbyName()
    }, [prompt.prompt, userId])

    useEffect(() => {
        setPrompt(prompt.prompt)
        const getBooksbyFilters = async () => {
            const data = await axios.post(`${defaultUrl}filter-announcements/?minValue=${filterParams?.minPrice}&maxValue=${filterParams?.maxPrice ? `${filterParams?.maxPrice}` : ""}&bestRated=${filterParams?.avaliation ? "true" : ""}`, {
                nome_genero : filterParams?.genres
            })
            .catch(err => {
                if (err.code === 'ERR_NETWORK') {
                    setError("Algo deu errado, tente novamente mais tarde")
                }
                else {
                    setError("Nenhum item corresponde com sua busca!")
                }
            })
            
            setLoading(false)
            setAnnouncements(data?.data)
        }
        if (filterParams !== {}) {
            getBooksbyFilters()
        }
    }, [prompt.prompt, userId, filterParams])

    const buttonTheme = {
        background: {
            genre : "#fff",
            order : "#fff",
            price : "#fff"
        }
    }

    if (filterContentSetter === 1) {
        buttonTheme.background.genre = "var(--yellow-medium)"
    }
    else if (filterContentSetter === 2) {
        buttonTheme.background.order = "var(--yellow-medium)"
    }
    else if (filterContentSetter === 3) {
        buttonTheme.background.price = "var(--yellow-medium)"
    }


    if (error) {
        return(
            <LoaderContainer>
                <span>Nenhum Item Corresponde com Sua Busca</span>
            </LoaderContainer>
        )
    }
    else if (loading) {
        return (
            <LoaderContainer>
                <Loader className="fa-solid fa-circle-notch"></Loader>
            </LoaderContainer>
        )
    }
    else {
        return (
            <>
                <FilterContainer>
                    <h2 onClick={() => setIsFilterModalOpen(true)}>Filtros <i className="fa-solid fa-angle-down"></i></h2>
                </FilterContainer>
                <CardsContainer>
                    {announcements?.map((item) => <Card url="announcement" key={item.id} id={item.id} anuncio={item} type={1} />)}
                </CardsContainer>
                <Modal
                isOpen={isFilterModalOpen}
                onRequestClose={() => setIsFilterModalOpen(false)}
                overlayClassName="filter-modal-overlay"
                className="filter-modal-content"
            >
                <FilterModalContent buttonTheme={buttonTheme}>
                    <div className="buttons-container">
                        <button className="genre" onClick={() => setFilterContentSetter(1)}>GÊNERO</button>
                        <button className="order" onClick={() => setFilterContentSetter(2)}>ORDEM</button>
                        <button className="price" onClick={() => setFilterContentSetter(3)}>PREÇO</button>
                    </div>
                    <FiltersModal filter={setFilterParams} content={filterContentSetter} />
                </FilterModalContent>
            </Modal>
            </>
        )
    }
}