import axios from "axios"
import { useState, useEffect } from "react"
import { useOutletContext } from "react-router-dom"
import { defaultUrl } from "../../helpers/url"
import { Card } from "./Cards/Card"
import { Error } from "./Error"
import { BuyBookCard, BuyItensCardContainer, CartItemContainer, Container } from "./styles"

export const Cart = () => {
    
    const { setAdsDisplay, setSearchbarDisplay, setFeedWidth } = useOutletContext()

    const [announcements, setAnnouncements] = useState([])
    const [error, setError] = useState(false)
    const userId = localStorage.getItem('id')
    const [refreshCounter, setRefreshCounter] = useState(0)

    useEffect(() => {
        setAdsDisplay(false)
        setSearchbarDisplay(false)
        setFeedWidth(false)
    })

    useEffect(() => {
        const getCartItems = async () => {
            const data = await axios.get(`${defaultUrl}list-cart-items/${userId}`)
            .catch(err => console.log(err), setError(true))

            if (data?.data) {
                setError(false)
            }
            setAnnouncements(data?.data)
        }
        getCartItems()
    }, [userId, refreshCounter])

    const upRefreshCounter = () => {
        setRefreshCounter(refreshCounter + 1)
    }
    const handleBuy = async () => {
        if (!error) {
            const cart = {
                id_anuncio : announcements?.items?.map((item) => {
                    return {id : item?.id_anuncio}
                })
            }
            const data = await axios.post(`${defaultUrl}intent-buy/user-id/${userId}`, cart)
            .catch(err => console.log(err))

            const url = data?.data?.url

            localStorage.setItem('buy_intent_id', data?.data?.intent_id)
            window.open(url, '_blank').focus()

            setError(true)
            setAnnouncements([])
        }
    }

    return (
        <Container>
            <CartItemContainer>
                {
                    error ? <Error /> : announcements?.items?.map((item) => <Card id={item?.id_anuncio} key={item?.id_anuncio} refresh={upRefreshCounter} />)
                }
            </CartItemContainer>
            <BuyItensCardContainer>
                <BuyBookCard>
                    <div>
                        <span className="total">Total</span>
                        <span className="total-value">R$ {announcements?.total?.toFixed(2) || 0}</span>
                    </div>
                    <button onClick={handleBuy}>COMPRAR</button>
                </BuyBookCard>
            </BuyItensCardContainer>
        </Container>
    )
}