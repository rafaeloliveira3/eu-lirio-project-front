import { useState } from "react"

export const Return = (url) => {
    const [comeBack, setComeBack] = useState("")
    if (url) {
        setComeBack(url)
    }
    return comeBack
}