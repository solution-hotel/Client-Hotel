export const getExtraItems = async () => {
    const url = "http://192.168.1.114:83/extraitems/getall"
    // const url = "https://api-pnv.bluejaypos.vn/extraitems/getall"

    const response = await fetch (url, {
        headers: {
            "Content-Type": "application/json"
        },
        method: "GET"
    })

    const data = await response.json()
    return data
}