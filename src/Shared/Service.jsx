const FormatResult = (res) => {
    let result = []
    let finalResult = []
    res.forEach((item)=>{
        const listingId = item.carList?.id
        if(!result[listingId]){
            result[listingId]={
                car:item.carList,
                Images:[]
            }
        }
        if(item.carImages){
            result[listingId].Images.push(item.carImages)
        }
    })
    result.forEach((item)=>{
        finalResult.push({
            ...item.car,
            Images:item.Images
        })
    })

    return finalResult
}

export default FormatResult