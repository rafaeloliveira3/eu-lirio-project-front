import { ShortCardStyle } from "./styles"

export const ShortCard = (props) => {
    
    return (
        <ShortCardStyle>
            <h3>{props?.story?.id}</h3>
        </ShortCardStyle>
    )
}