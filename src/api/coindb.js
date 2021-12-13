import apiUrl from '../apiConfig'
import axios from 'axios'

export const createFollowedCoin = (info, user) => {
    console.log("User: ", user)
    console.log("Info: ", info)
	return axios({
		method: 'POST',
        headers: {
            "Authorization": `Bearer ${user.token}`
        },
		url: apiUrl + '/dashboard',
		data: {
			info: {
                symbol: info.symbol,
                marketCapUsd: info.marketCapUsd,
                maxSupply: info.maxSupply,
                rank: info.rank,
                name: info.name,
                priceUsd: info.priceUsd,
                supply: info.supply,
                changePercent24Hr: info.changePercent24Hr,
                volumeUsd24Hr: info.volumeUsd24Hr,
                vwap24Hr: info.vwap24Hr,
			},
		},
	})
}

export const getFollowedCoins = (res, user) => {
    return axios({
		method: 'GET',
        // headers: {
        //     "Authorization": `Bearer ${user.token}`
        // },
		url: apiUrl + '/dashboard',
	})
    .then((res) => {
        console.log("Response from database: ", res)
        return res
    })
}