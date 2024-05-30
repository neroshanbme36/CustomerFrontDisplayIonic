export interface StoreDto {
    id: string;
    name: string;
    appCompanyId: string;
    logoImgUrl: string | null;
    vatRegistrationNo: string | null;
    type: string;
    addressLine1: string;
    addressLine2: string | null;
    addressLine3: string | null;
    addressLine4: string | null;
    city: string;
    state: string;
    postcode: string;
    phone: string | null;
    email: string | null;
    isActive: boolean;
    countryId: string;
    customerId: string | null;
    guid: string | null;
}
