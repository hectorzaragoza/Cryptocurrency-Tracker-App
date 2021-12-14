import { useParams } from "react-router";

const EachCoin = (props) => {
    const coinName = useParams()
    console.log();
    let coinContent = props.coinData.filter(name => name.id.toLowerCase()===coinName.id.toLowerCase())
    coinContent = coinContent[0]
    console.log(coinContent);


    return (
        <div>
            <h1>{coinContent.name}</h1>
            <h2>{coinContent.rank}</h2>
            <h3>{coinContent.priceUsd}</h3>
            <p>{coinContent.supply}</p>
            <p>{coinContent.changePercent24Hr}</p>
        </div>
    )

}

export default EachCoin