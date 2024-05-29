// export interface Order {
//     header: OrderHeader;
//     parentProductLines: ParentProductLine[];
//     orderSummary: OrderSummary;
// }

// export interface OrderHeader {
//     id: number;
//     transType: number;
//     orderType: number;
//     takeawayId: number;
//     deliveryId: number;
//     isScheduledOrder: boolean;
//     requestedOn: Date;
//     locationId: string;
//     locationDesc?: string;
//     tableId: number;
//     seats: number;
//     freeText?: string;
//     customerId?: string;
//     loyaltyCardNo?: string;
//     createdOn: Date;
//     createdOnGmt: Date;
// }

// export interface ParentProductLine {
//     serialNo: number;
//     lineNo: number;
//     entryType: number;
//     transType: number;
//     keyId: string;
//     description: string;
//     quantity: number;
//     price: number;
//     discountPercentage: number;
//     discountAmount: number;
//     netAmount: number;
//     freeText?: string;
//     lineStatus: boolean;
//     barcode?: string;
//     scanned: boolean;
//     createdOn: Date;
//     createdOnGmt: Date;
//     modifierHeaders: ModifierHeader[];
// }

// export interface ModifierHeader {
//     modifierTitle: string;
//     totalAmount: number;
//     subModifierProducts: SubModifierProduct[];
// }

// export interface SubModifierProduct {
//     description: string;
//     price: number;
// }

// export interface OrderSummary {
//     total: number;
//     customerOwes: number;
//     discount: number;
//     payment: number;
//     balance: number;
//     noOfProducts: number;
// }

export interface Order {
    header: OrderHeader;
    parentProductLines: ParentProductLine[];
    orderSummary: OrderSummary;
}

export interface OrderHeader {
    id: number;
    transType: number;
    orderType: number;
    userId: string;
    takeawayId: number;
    deliveryId: number;
    isScheduledOrder: boolean;
    requestedOn: Date;
    locationId: string;
    locationDesc?: string;
    tableId: number;
    seats: number;
    freeText?: string;
    customerId?: string;
    loyaltyCardNo?: string;
    createdOn: Date;
    createdOnGmt: Date;
    staffName: string;
    salesAmount: number;
    deviceId: string;
    zReportId: string;
    repairId: string;
}

export interface ParentProductLine {
    serialNo: number;
    lineNo: number;
    entryType: number;
    transType: number;
    keyId: string;
    description: string;
    quantity: number;
    price: number;
    discountPercentage: number;
    discountAmount: number;
    amount: number;
    netAmount: number;
    freeText?: string;
    lineStatus: boolean;
    barcode?: string;
    scanned: boolean;
    modifierHeaders: ModifierHeader[];
    createdOn: Date;
}

export interface ModifierHeader {
    modifierTitle: string;
    totalAmount: number;
    subModifierProducts: SubModifierProduct[];
}

export interface SubModifierProduct {
    description: string;
    price: number;
}

export interface OrderSummary {
    total: number;
    customerOwes: number;
    discount: number;
    payment: number;
    balance: number;
    noOfProducts: number;
}
