import { useParams } from "react-router";
import { createCommentEntry, deleteComment, editCommentRoute } from '../api/commentdb'
import { getFollowedCoins } from "../api/coindb"
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
    const { user, savedCoins, setSavedCoins } = props
    const coinName = useParams()
    let coinContent = props.coinData.filter(name => name.id.toLowerCase() === coinName.id.toLowerCase())
    coinContent = coinContent[0]

    const matchedCoin = savedCoins.filter(matchedCoin => matchedCoin.id === coinName.id)
    // console.log('This is the matchedCoin: ', matchedCoin)
    // This is the state to hold the form content
    const [formData, setFormData] = useState('')
    // This is the state to hold the edit form content
    const [editedContent, setEditedContent] = useState('')
    // This state will hold matchedCoin (showpage) historical data
    const [ histData, setHistData ] = useState([])
    // This state will hold ALL DATA for the Chart
    const [data, setData] = useState({})
    const labelArray = []
    // This fetch call will get the historical data for the showCoin
    
    useEffect(() => {
        getHistData()
    }, [data])

    const getHistData = () => {
		fetch(`http://localhost:8000/dashboard/${matchedCoin[0].id}`, {
			method: 'GET',
			credentials: 'omit',
			redirect: 'follow'
		})
			.then(response => response.json())
			.then((coinData) => {
				coinData = Object.values(coinData)
				console.log('This is the hist coin route fetch call response: ', coinData[0]);
				let result = coinData[0].map(({ priceUsd }) => parseInt(priceUsd))
                console.log('This is the array of hist prices: ', result)
                setHistData(result)
                
			}).then(res => {
                for(let i = 0; i < histData.length; i++) {
                    labelArray.push(`${i}`)
                    }
                console.log('HIST DTSATA', histData)
                console.log('DATA: ', data)
                chart()
            })
			.catch(err => console.log(err))
	}

    const chart = () => {
        console.log('Chart Label Array lenght', labelArray.length)
        console.log('Chart hist Data Array ', histData.length)
        setData({
            labels: labelArray,
            datasets: [
                {
                    label: 'Linegraph example',
                    data: histData,
                    fill: false,
                    borderColor: 'rgb(75,192,192)',
                    tension: 0.1
                }
            ]
        })
    }

    const handleChange = (e) => {
        // console.log('This is the event returned from the form: ', e.target.value)
        setFormData(e.target.value)
    }

    const handleSubmit = (e) => {
        //This is where I can call the POST route in the commentdb api
        e.preventDefault()
        createCommentEntry(formData, user, coinContent, matchedCoin)
        .then(res => {
            getFollowedCoins(user)
            .then(res => {
                // console.log('This is our Res for GetFOllowedCoins ', res)
                res = Object.values(res.data.coins)
                // console.log('This is our Res for 2nd GetFOllowedCoins ', res)
                setSavedCoins(res)
            })
        })
    }

    const removeComment = (c) => {
        deleteComment(c._id, matchedCoin)
            .then(res => {
                getFollowedCoins(user)
                .then(res => {
                    // console.log('This is our Res for GetFOllowedCoins ', res)
                    res = Object.values(res.data.coins)
                    // console.log('This is our Res for 2nd GetFOllowedCoins ', res)
                    setSavedCoins(res)
                })
        })
    }
    // console.log("This is the coin content: ", matchedCoin[0].comments[0].content)
    // console.log("This is the comment content: ", matchedCoin[0].comments)

    // These three functions will handle the EDIT functionality (handleEditSubmit, handleEditChange, and editComment)
    const handleEditSubmit = (e) => {
        // This will call the PUT route in commentdb and pass
        // in the content payload, the id of the savedcoin, and 
        // the id of the comment.
        e.preventDefault()
        editCommentRoute(editedContent, matchedCoin)
        .then(res => {
            getFollowedCoins(user)
            .then(res => {
                // console.log('This is our Res for GetFOllowedCoins ', res)
                res = Object.values(res.data.coins)
                // console.log('This is our Res for 2nd GetFOllowedCoins ', res)
                setSavedCoins(res)
            })
        })
        
        // console.log(`These are the three things we need:  ${editedContent} and matched coin ${matchedCoin[0]._id} and these are the comments: ${matchedCoin[0].comments[0]._id}`)
    }

    const handleEditChange = (editFormContent) => {
        // This will set the state of  the edit form content
        // console.log('onchange content, ', editFormContent.target.value)
        setEditedContent(editFormContent.target.value)
    }

    const editComment = (c) => {
        // console.log('This is the editComment before return', c)
        editCommentRoute(editedContent, matchedCoin)
        return (
            <>
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

    // useEffect(() => {
    //     chart()
    // }, [])

    const comments = matchedCoin[0].comments.map((c, i) => {
        // console.log('This the coin holding the comment: ', c)
        return (
            <li key={i}>
                {c.content}
                <br/>
                <button onClick={() => removeComment(c)} id="delete">Delete</button>
                <form onSubmit={handleEditSubmit}>
                    <label htmlFor="editForm">Edit Comment</label>
                    <br/>
                    <input type="text" id="editForm" placeholder={c.content} onChange={handleEditChange}/>
                    <br/>
                    <input type="submit" value="Edit"></input>
                </form>
            </li>
        )
    })

    return (
        <div className="row">
            <div className="column">
                <br></br>
                <h1>{coinContent.name}, {coinContent.symbol}</h1>
                <h2>Rank: # {coinContent.rank}</h2><br></br>
                <h4>USD: ${coinContent.priceUsd}</h4>
                <p>{coinContent.supply}</p>
                <p>24H Change: {coinContent.changePercent24Hr}%</p><br></br>

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
                <h1>{matchedCoin[0].id}'s Year in Price</h1>
                <div style={{ height: "400px", width: "400px" }}>
                    <Line data={data} />
                </div>
            </div>
        </div>
    )
}

export default EachCoin