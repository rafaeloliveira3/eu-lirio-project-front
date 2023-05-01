import axios from "axios"
import { useState, useEffect } from "react"
import { useOutletContext } from "react-router-dom"
import { defaultUrl } from "../../helpers/url"
import { Card } from "./Cards/Card"
import { BuyBookCard, BuyItensCardContainer, CartItemContainer, Container } from "./styles"

export const Cart = () => {
    
    const { setAdsDisplay, setSearchbarDisplay, setFeedWidth } = useOutletContext()

    const [announcements, setAnnouncements] = useState([])
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
            .catch(err => console.log(err))

            setAnnouncements(data?.data)
        }
        getCartItems()
    }, [userId, refreshCounter])

    const upRefreshCounter = () => {
        setRefreshCounter(refreshCounter + 1)
    }
    const handleBuy = async () => {
        const cart = {
            id_anuncio : announcements?.map((item) => {
                return {id : item?.id_anuncio}
            })
        }
        await axios.post(`${defaultUrl}confirm-buy/user-id/${userId}`, cart)
        .catch(err => console.log(err))
    }

    return (
        <Container>
            <CartItemContainer>
                {announcements?.map((item) => <Card id={item?.id_anuncio} key={item?.id_anuncio} refresh={upRefreshCounter} />)}
            </CartItemContainer>
            <BuyItensCardContainer>
                <BuyBookCard>
                    <div>
                        <span className="total">Total</span>
                        <span className="total-value">R$50.00</span>
                    </div>
                    <button onClick={handleBuy}>COMPRAR</button>
                </BuyBookCard>
            </BuyItensCardContainer>
        </Container>
    )
}