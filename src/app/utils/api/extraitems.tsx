export const getExtraItems = async () => {
    const url = "https://api-pnv.bluejaypos.vn/extraitems/getall"

    const response = await fetch (url, {
        headers: {
            "Content-Type": "application/json"
        },
        method: "GET"
    })

    const data = await response.json()
    return data
}