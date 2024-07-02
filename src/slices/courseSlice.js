import { createSlice } from "@reduxjs/toolkit"


const initialState ={
    step:1,
    editCourse:false,
    course:null
}

 const courseSlice = createSlice({
    name:'course',
    initialState,
    reducers:{
        setStep: (state,action) => {
            state.step = action.payload;
        },
        setEditCourse: (state,action) => {
            state.editCourse = action.payload
        },
        setCourse(state,action){
            state.course = action.payload
        }
    }
 })

export const {setCourse,setStep,setEditCourse} = courseSlice.actions;

export default courseSlice.reducer; 