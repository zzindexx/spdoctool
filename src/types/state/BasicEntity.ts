export abstract class BasicEntity {
    id: string;
    name: string;

    constructor(props: any) {
        this.id = props.id;
        this.name = props.name;
    }
}