export interface UserModel{
    messages : string, 
    is_success : boolean, 
    is_error : boolean, 
    data :
    { 
        id : number, 
        email : string , 
        first_name : string , 
        last_name : string , 
        auth_token : string , 
        role : string 
    }
}