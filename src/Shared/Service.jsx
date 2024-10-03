export const  FormatResult = (res) => {
    let result =[]
    let finalResult = []
    res.forEach((item)=>{
        const listingId = item.CarList?.id
        if(!result[listingId]){
            result[listingId] = {
                car:item.CarList,
                Image:[]
            }
        }
        if(item.carImages){
            result[listingId].Image.push(item.carImages)
        }
    })

    result.forEach((item)=>{
        finalResult.push({
            ...item.car,
            images:item.Image

        })
    })


    return finalResult
}

