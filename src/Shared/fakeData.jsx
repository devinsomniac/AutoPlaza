import { faker } from '@faker-js/faker';

const createRandomcarList = () => {
    return{
        name : faker.vehicle.vehicle(),
        fuelType : faker.vehicle.fuel(),
        model : faker.vehicle.model(),
        type : faker.vehicle.type(),
        image : 'https://media.kijiji.ca/api/v1/autos-prod-ads/images/ec/ec598643-3b1d-4a04-84f0-dc6e00305ee8?rule=move-960-webp',
        miles : 1000,
        gear : 'Automatic',
        price : faker.finance.amount({min:4000,max:10000})
    }
}


const carList = faker.helpers.multiple(createRandomcarList,{
    count:7
})

export default {
    carList
}