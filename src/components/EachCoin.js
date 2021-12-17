import { useParams } from "react-router";
import { createCommentEntry, deleteComment, editCommentRoute } from '../api/commentdb'
import { useState, useEffect } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


const EachCoin = (props) => {
    const { user, savedCoins } = props
    const coinName = useParams()
    let coinContent = props.coinData.filter(name => name.id.toLowerCase() === coinName.id.toLowerCase())
    coinContent = coinContent[0]

    const matchedCoin = savedCoins.filter(matchedCoin => matchedCoin.id === coinName.id)
    console.log('This is the matchedCoin: ', matchedCoin)
    // This is the state to hold the form content
    const [formData, setFormData] = useState('')
    // This is the state to hold the edit form content
    const [editedContent, setEditedContent] = useState('')

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
    // console.log("This is the comment content: ", matchedCoin[0].comments)

    // These three functions will handle the EDIT functionality (handleEditSubmit, handleEditChange, and editComment)
    const handleEditSubmit = () => {
        // This will call the PUT route in commentdb and pass
        // in the content payload, the id of the savedcoin, and 
        // the id of the comment.
        editCommentRoute(editedContent, matchedCoin)
    }

    const handleEditChange = (editFormContent) => {
        // This will set the state of  the edit form content
        setEditedContent(editFormContent)
    }

    const editComment = (c) => {
        console.log('This is the editComment before return', c)
        editCommentRoute(editedContent, matchedCoin)
        return (
            <>
                {console.log('This is the edit Comment after return')}
                <form onSubmit={handleEditSubmit}>
                    <label htmlFor="editForm">Edit Comment on: {c.name}?</label>
                    <br />
                    <input type="text" id="editForm" onChange={handleEditChange} />
                    <br />
                    <input type="submit" value="Edit"></input>
                </form>
            </>
        )
    }

    const [data, setData] = useState({})
    const chart = () => {
        setData({
            labels: ["Coin1", "Coin2", "Coin3", "Coin4", "Coin5", "Coin6", "Coin7", "Coin8"],
            datasets: [
                {
                    label: 'Linegraph example',
                    data: [54, 76, 23, 13, 76, 12, 54, 76],
                    fill: false,
                    borderColor: 'rgb(75,192,192)',
                    tension: 0.1
                }
            ]
        })
    }

    useEffect(() => {
        chart()
    }, [])


    const comments = matchedCoin[0].comments.map((c, i) => {
        return (
            <li key={i}>
                {c.content}
                <button onClick={() => removeComment(c)} id="delete">Delete</button>
                <button onClick={() => editComment(c)}>Edit</button>
            </li>
        )
    })

    return (
        <div className="row">
            <div className="column">
                <h1>{coinContent.name}</h1>
                <h2>{coinContent.rank}</h2>
                <h3>{coinContent.priceUsd}</h3>
                <p>{coinContent.supply}</p>
                <p>{coinContent.changePercent24Hr}</p>

                <div className="commentForm">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="textArea">Thoughts on {coinContent.symbol}?</label>
                        <br />
                        <input id="textArea" onChange={handleChange} />
                        <br />
                        <input type="submit" value="Post"></input>
                    </form>
                </div>

                <div>
                    {editComment}
                </div>

                <ul className="comments">
                    {comments}
                </ul>
            </div>
            <div className="column">
                <h1>Dummy data</h1>
                <div style={{ height: "400px", width: "400px" }}>
                    <Line data={data} />
                </div>
            </div>

        </div>
    )

}

export default EachCoin