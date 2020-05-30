import { BasicEntity } from "./BasicEntity";

export class ServiceApplicationProxy extends BasicEntity {
    typeName: string;
    serviceApplicationId: string;

    constructor(props: any) {
        super(props);
        this.typeName = props.typeName;
        this.serviceApplicationId = props.serviceApplicationId;
    }
}