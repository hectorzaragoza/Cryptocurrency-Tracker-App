import { useParams } from "react-router";
import { createCommentEntry, deleteComment } from '../api/commentdb'
import { useState } from 'react'

const EachCoin = (props) => {
    const { user, savedCoins } = props
    const coinName = useParams()
    let coinContent = props.coinData.filter(name => name.id.toLowerCase()===coinName.id.toLowerCase())
    coinContent = coinContent[0]

    const matchedCoin = savedCoins.filter(matchedCoin => matchedCoin.id === coinName.id)
    // This is the state to hold the form content
    const [formData, setFormData] = useState('')

    const handleChange = (e) => {
        console.log('This is the event returned from the form: ', e.target.value)
        setFormData(e.target.value)
    }

    const handleSubmit = (e) => {
        //This is where I can call the POST route in the commentdb api
        e.preventDefault()
        createCommentEntry(formData, user, coinContent, matchedCoin)
    }

    const removeComment = (c) => {
        deleteComment(c._id, matchedCoin)
    }
    // console.log("This is the coin content: ", matchedCoin[0].comments[0].content)
    console.log("This is the comment content: ", matchedCoin[0].comments)

    const comments = matchedCoin[0].comments.map((c, i) => {
        return (
            <li key={i}>
                {c.content}
                <button onClick={() => removeComment(c)} id="delete">Delete</button>
            </li>
        )
    })

    return (
        <div>
            <h1>{coinContent.name}</h1>
            <h2>{coinContent.rank}</h2>
            <h3>{coinContent.priceUsd}</h3>
            <p>{coinContent.supply}</p>
            <p>{coinContent.changePercent24Hr}</p>
            <ul className="comments">
                {comments}
            </ul>
            <div className="commentForm">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="textArea">Thoughts on {coinContent.symbol}?</label>
                    <br/>
                    <input id="textArea" onChange={handleChange}/>
                    <br/>
                    <input type="submit" value="Post"></input>
                </form>
            </div>
        </div>
    )

}

export default EachCoin