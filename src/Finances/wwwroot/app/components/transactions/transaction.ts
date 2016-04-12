export interface Transaction {
    id: number;
    title:string;
    amount:number;
    description:string;
    creationDate : Date;
    transactionType : number;
    tags : string[];
}