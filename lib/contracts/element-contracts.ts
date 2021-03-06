import { SharedContracts } from './shared-contracts';

export namespace ElementContracts {

    export interface IContentTypeElementMultipleChoiceElementOptionsContract {
        name: string;
        id: string;
        codename: string;
    }

    export enum IContentTypeElementModeTypeContract {
        single = 'single',
        multiple = 'multiple'
    }

    export interface IContentTypeElementContract {
        name: string;
        type: string;

        id?: string;
        external_id?: string;
        codename?: string;
    }

    export interface IContentItemElementContract {
        element: SharedContracts.IReferenceObjectContract;
        value: string | number | SharedContracts.IReferenceObjectContract[];
    }

    export interface IContentItemElementComponent {
        id: string;
        type: SharedContracts.IReferenceObjectContract;
        elements: IContentItemElementWithComponentsContract[];
    }

    export interface IContentItemElementWithComponentsContract {
        element: SharedContracts.IReferenceObjectContract;
        value: string | number | SharedContracts.IReferenceObjectContract[];
        components?: IContentItemElementComponent[];
    }

}
