import { LeadModel } from "./lead.model";

export interface LeadAPIResponse{
    messages: string,
    isSuccess: boolean,
    leads: LeadModel[],
    editable_field: string[],
    selected_editable_field: string[],
    field_order: string[]    
}