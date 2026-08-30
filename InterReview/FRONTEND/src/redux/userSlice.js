import { createSlice } from '@reduxjs/toolkit' ;


const userSlice = createSlice({

    name:"user" ,
    initialState:{
        userData: null 
    },
    reducers:{
        SetUserData:( state, action ) => {
            state.userData = action.payload
        } 
    }

})


export const { SetUserData } = userSlice.actions ; 

export default userSlice.reducer

