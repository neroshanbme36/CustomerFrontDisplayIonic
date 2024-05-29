export interface PeripheralActionEposMiddlewareDto {
    id: number;
    deviceId: string;
    peripheralType: string;
    funcType: string;
    data: string | null;
    createdOn: Date;
}