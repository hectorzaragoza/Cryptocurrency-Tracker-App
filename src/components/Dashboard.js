import { createFollowedCoin, getFollowedCoins, deleteCoin } from "../api/coindb"
import { useState, useEffect, React } from "react"
import { Link } from 'react-router-dom'


function Dashboard(props) {
    const { user } = props
    let [usersSavedCoins, setUsersSavedCoins] = useState([])
    let [followedCoins, setFollowedCoins] = useState([])
    
    // This Function is to POST coins to the saved collection in the database
    const addCoin = (info) => {
        createFollowedCoin(info, user)
            .then(res => {
                console.log("This is response: ", res)
            })
    }
    // This Function is to DELETE coins from the saved collection in the database
    const removeCoin = (s) => {
        deleteCoin(s._id)
            .then(res => {
                console.log('This is the coin to be deleted: ', res)

            })
    }
    // TRY OUT ON CLICK FUNCTION ON ADD TO FAVORITES TO SETSTATE OF FOLLOWEDCOINS TO UPDATED COINS
    let allCoins = props.coins.map((c, i) => {
        return (
            <li key={i}>
                <div className="coinsFromAPI">
                    <Link to={`${c.id}`}>{c.name}</Link>
                    {c.symbol}
                    ${Number(c.priceUsd).toFixed(2)}
                    <button onClick={() => addCoin(c)}>Add to Favorites</button>
                </div>
            </li>
        )
    })

    

    followedCoins = usersSavedCoins.map((s, i) => {
        return (
            <li key={i}>
                <div>
                    <Link to={`${s.id}`}>{s.name}</Link>
                    <button onClick={() => removeCoin(s)}>Remove Coin</button>
                </div>
            </li>
        )

    })
    

    // This useEffect and Function is to GET all the saved Coins from the Database
    useEffect(() => {
        getFollowedCoins(user)
            .then(res => {
                console.log('res spam')
                res = Object.values(res.data.coins)
                setUsersSavedCoins(res)
            })
            .catch((err)=> {
                console.log(err);
            })
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setFollowedCoins([...usersSavedCoins])
    }, [usersSavedCoins])


    return (


        <>
            <div className="dashboard">
                <h2>This is your dashboard</h2>
                <h4>Followed Coins: </h4>
                <ul>
                    {followedCoins}
                </ul>
                <h4>Cryptos</h4>
                <ul>
                    {allCoins}
                </ul>
            </div>
        </>
    )
}

export default Dashboard
