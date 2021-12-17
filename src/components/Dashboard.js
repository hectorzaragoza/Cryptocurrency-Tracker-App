import React, { useEffect } from 'react'

function Dashboard(props) {
    
    return (
        <>
            <div className="dashboard">
                <h2>This is your dashboard</h2>
                <h4>Followed Coins: </h4>
                <ul>
                    {props.usersCoins}
                </ul>
                <h4>Cryptos</h4>
                <ul>
                    {props.allCoins}
                </ul>
            </div>
        </>
    )
}

export default Dashboard
