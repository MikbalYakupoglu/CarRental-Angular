export interface Rental{
    rentalId:number;
    carId:number;
    customerName:string;
    carDescription:string;
    rentDate:Date;
    returnDate?:Date;
}