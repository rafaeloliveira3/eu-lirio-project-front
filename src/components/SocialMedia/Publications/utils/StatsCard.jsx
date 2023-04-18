import { StatsCardStyled, StatsCardTitle, StatsCardValue } from "./styles"

export const StatsCard = (props) => {
    return (
        <StatsCardStyled onClick={props.onClick}>
            <StatsCardTitle>
                <i className={props.icon}></i>
                <span>{props.name}</span>
            </StatsCardTitle>
            <StatsCardValue>
                <span>{props.number}</span>
            </StatsCardValue>
        </StatsCardStyled>
    )
}