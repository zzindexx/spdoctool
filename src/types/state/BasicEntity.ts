export abstract class BasicEntity implements IBasicEntity {
    id: string;
    name: string;

    constructor(props: any) {
        this.id = props.id;
        this.name = props.name;
    }
}

export interface IBasicEntity {
    id: string;
    name: string;
}