import styled from "styled-components";

const Container = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
` 
const BookInfoSection = styled.section`
    height: 15rem;
    width: 100%;
    padding: 2.4rem 3.2rem;
    background-color: var(--yellow-medium);
    border-radius: 0 0 32px 0;
    `
const BookData = styled.header`
    display: flex;
    gap: 1rem;
    width: 100%;
    height: 100%;
    background-color: #fff8;
    border-radius: 25px;
    padding: 1rem;
` 
const ImageContainer = styled.div`
    img {
        height: 12.15rem;
        border-radius: 10px;
        margin-left: -2rem;
        margin-top: -2rem;
        width: 9rem;
        object-fit: cover;
    }
` 
const BookContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const BookTitleAndTagsContainer = styled.div`
    font-family: 'Montserrat', sans-serif;
    display: flex;
    .title-tags {
        display: flex;
        flex-direction: column;
        gap: .6rem;
        .title {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--purple-dark)
        }
        .tags {
            display: flex;
            gap: .6rem;
            span {
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 25px;
                font-size: .9rem;
                font-weight: 600;
                border: 1.5px solid var(--purple-darken);
                color: var(--purple-darken);
                padding: .1rem .8rem;
            }
        }
    }
   
` 
const BottomSection = styled.section`
    width: 100%;
    justify-content: space-between;
    display: flex;
    align-items: center;
`
const TopSection = styled.section`
    width: 100%;
    justify-content: space-between;
    display: flex;
    .icon-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 2rem;
        width: 2rem;
        cursor: pointer;
        i {
            font-size: 1.3rem;
        }
    }
`
const RatingContainer = styled.div`
    display: flex;
    gap: 1rem;
    .rating {    
        font-family: 'League Spartan', sans-serif;
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.3rem;
    }
    .rating-number {
        font-size: 1.5rem;
    }
`
const StatsContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    .stats-separator {
        height: 2.7rem;
        width: 2px;
        border-radius: 360px;
        background-color: #1E1E1E88;
    }
`

const ReportContainer = styled.div`
    display: ${(props) => props.display};
    position: absolute;
    right: 4.5rem;
    top: 10.3rem;
    span {
        i {
            color: #BD0020;
        }
        font-family: 'Quicksand', sans-serif;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: .5rem;
        border-radius: 10px;
        background-color: #fff;
        padding: .6rem;
        box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.12);
        &:hover {
            background-color: #F5F5F5;
        }
    }
`

const BookExtrasSection = styled.section`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: space-between;
` 
const BookInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    width: 65%;
    .stats-separator {
        height: 2.7rem;
        width: 2px;
        border-radius: 360px;
        background-color: #1E1E1E88;
    }
`
const BookAndUserInfoContainer = styled.div`
    width: 100%;
    display: flex;
    padding: 0 1vw;
`
const BookAndUserInfo = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    border-bottom: 1px solid var(--font-color);
    padding: .5rem 1rem;
    align-items: center;
    .classificacao {
        height: 2.3rem;
    }
` 

const SynopsisContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    gap: 1rem;
    padding: 1rem 1rem;
    span {
        font-family: 'League Spartan', sans-serif;
        font-weight: 700;
        font-size: 1.5rem;
    }
    p {
        font-family: 'Quicksand', sans-serif;
        font-weight: 300;
    }
`

export {
    Container,
    BookInfoSection,
    BookData,
    ImageContainer,
    BookTitleAndTagsContainer,
    BookContainer,
    RatingContainer,
    BottomSection,
    StatsContainer,
    TopSection,
    ReportContainer,
    BookExtrasSection,
    BookInfoContainer,
    BookAndUserInfo,
    BookAndUserInfoContainer,
    SynopsisContainer
}