export interface PlanModel {
    id: number;
    name: string;
    status: string;
    email: string;
    idType: number;
    idAccountable: number;
    interestedPeople: number[];
    start: string;
    end: string;
    idBelongsTo: number;
    description: string;
    costs: number;
}
