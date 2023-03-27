import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { defaultUrl } from "../../../helpers/url"
import { Card } from "./styles"

export const ShortItem = (props) => {
    return (
        <Card>
            <div className="cover-container">
                <img src={props.capa} alt="" />
            </div>
        </Card>
    )
}