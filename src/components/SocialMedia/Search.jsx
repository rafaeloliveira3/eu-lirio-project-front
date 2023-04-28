import { Interweave } from "interweave"
import { Link } from "react-router-dom"

export const Search = (props) => {
    const reg = new RegExp(props.search, 'gi')
    const spliced = props.name?.replace(reg, (str) => str.bold())

    return (
        <li>
            <Link onClick={props.closeModal} to={`/app/book/${props.id}`}>
                <Interweave content={spliced}/> 
            </Link>
        </li>
    )
}