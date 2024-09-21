import { faker } from ("@faker-js/faker/.")

const randomCarList = () => {
    return{
        name:faker.vehicle.vehicle()
    }
}