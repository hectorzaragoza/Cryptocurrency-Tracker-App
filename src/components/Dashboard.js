import { createFollowedCoin, getFollowedCoins, deleteCoin } from "../api/coindb"
import { useEffect, React } from "react"
import { Link } from 'react-router-dom'

function Dashboard(props) {
    const { user } = props
    // This useEffect and Function is to GET all the saved Coins from the Database
    useEffect(() => {
        getFollowedCoins(user)
            .then(res => {
                // console.log('This is our Res for GetFOllowedCoins ', res)
                res = Object.values(res.data.coins)
                // console.log('This is our Res for 2nd GetFOllowedCoins ', res)
                props.setSavedCoins(res)
            })
    }, [])

    // This Function is to POST coins to the saved collection in the database
    const addCoin = (info) => {
        createFollowedCoin(info, user)
            .then(res => {
                getFollowedCoins(user)
                    .then(res => {
                        // console.log('This is our Res for GetFOllowedCoins ', res)
                        res = Object.values(res.data.coins)
                        // console.log('This is our Res for 2nd GetFOllowedCoins ', res)
                        props.setSavedCoins(res)
                    })
            })
    }

    // This Function is to DELETE coins from the saved collection in the database
    const removeCoin = (s) => {
        deleteCoin(s._id)
            .then(res => {
                getFollowedCoins(user)
                    .then(res => {
                        // console.log('This is our Res for GetFOllowedCoins ', res)
                        res = Object.values(res.data.coins)
                        // console.log('This is our Res for 2nd GetFOllowedCoins ', res)
                        props.setSavedCoins(res)
                    })
            })
    }

    const allCoins = props.coins.map((c, i) => {
        return (
            <li key={i}>
                <div id="allCoins">
                    <div className="coinDiv" id="allInfo">
                        <div className="coinInfo" id="coinRank">
                            Rank: {c.rank}
                        </div>
                        <div className="coinInfo" id="coinName">
                            {c.name}
                        </div>
                        <div className="coinInfo" id="coinSymbol">
                            {c.symbol}
                        </div>
                        <div className="coinInfo" id="coinPrice">
                            USD ${Number(c.priceUsd).toFixed(2)}
                        </div>
                        <div className="coinInfo" id="coinButton">
                            <button className="button" onClick={() => addCoin(c)}>Track this Coin</button>
                        </div>
                    </div>
                </div>
            </li>
        )
    })

    const followedCoins = props.savedCoins.map((s, i) => {
        return (
            <li key={i}>
                <div className="savedCoins">
                    <h4 className="savedInfo">Click for info</h4>
                    <div className="savedCoinItem">
                        <Link to={`${s.id}`} style={{ fontSize: "25px", padding: "15px" }}>{s.name}</Link>
                    </div>
                    <div className="savedCoinItem">
                        <button className="removeButton" onClick={() => removeCoin(s)}>Untrack</button>
                    </div>
                </div>
            </li>
        )
    })

    return (
        <>
            <div className="row">
                <div id="dashHeader"><h1 class="profile"><b>{user.fullName}'s Dashboard</b></h1></div>
                <div className="column">
                    <h4 class="coinHeader"><b><u>Top 100 Ranked Coins</u></b></h4><br></br><br></br>
                    <ul>
                        <div className="allCoins">
                            {allCoins}
                        </div>

                    </ul>
                </div>
                <div className="column">
                    <h4 className="coinHeader"><b><u>Followed Coins:</u></b></h4><br></br><br></br>
                    <ul>
                        <div className="allCoins">
                            {followedCoins}
                        </div>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Dashboard
