export const DisplayName = (value: string) => {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        descriptor.value = value;
    };
}