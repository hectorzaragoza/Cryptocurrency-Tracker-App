import { createFollowedCoin } from "../api/coindb"
import { Link } from "react-router-dom"
import '../index.css'


const Dashboard = (props) => {
    const { msgAlert, coins, followedCoin, onClick, user } = props

    const addCoin = (info) => {
        createFollowedCoin(info, user) 
            .then(res => {
                console.log("This is response: ", res)
            })
    }

    const allCoins = props.coins.map((c, i) => {
        return (
            <li key={i}>
                <div>
                    <Link to= {c.id}> {c.id}</Link>
                    <br />
                    ${Number(c.priceUsd).toFixed(2)}
                    <br />
                    <button onClick={() => addCoin(c)}>Add to Favorites</button>
                </div>
            </li>

        )
    })

    const followedCoins = props.followedCoin.map((f, i) => {
        return (
            <li>
                <div>
                    {f.name}
                </div>
            </li>
        )
    })

    return (
        <>
            <div className="dashboard">
                <h2>This is your dashboard</h2>
                <h4>Followed Coins: </h4>
                <ul>
                    {followedCoins}
                </ul>
                <h4>Current Info on coins: </h4>
                <ul>
                    {allCoins}
                </ul>
            </div>
        </>
    )
}

export default Dashboard
