import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    value: 0,
}
//The "counter" name + the "increment" reducer function gen an action type of {type: "counter/increment"}
export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers:{
        increment: state => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
        }
    }
})
export const { increment, decrement, incrementByAmount } = counterSlice.actions
export const selectCount = state => state.counter.value;
export default counterSlice.reducer

// Actions đơn giản là các events. Chúng là cách mà chúng ta send data từ app đến Redux store. 
// Những data này có thể là từ sự tương tác của user vs app, API calls hoặc cũng có thể là từ form submission.
// Action phải là một object. Một Action luôn luôn có giá trị trả về type và giá trị payload có thể có hoặc không.
// VD:
// export const selectedSong = song => {
//     return {
//         type: "SONG_SELECTED",
//         payload: song
//     };
// };

// Nhưng đôi lúc trong ứng dụng của chúng ta nó lại không đơn giản như vậy, các action cần trả về một "function" chẳng hạn, 
// các action này được gọi là Async Action, thì đây là nơi mà Redux Thunk làm việc

// Redux Thunk cho phép trả về các Action là một function thay vì chỉ là một PJO, 
// nó đóng vai trò là một Middleware được đặt trước thời điểm reducer nhận request để nhận biết các action có trả về một PJO hay không, 
// nếu đó là một PJO, Thunk sẽ chuyển action đó đến Reducer như thường lệ, 
// nếu action trả về là một function, Redux Thunk sẽ "chặn" action đó lại và đợi cho đến khi một lệnh asynchronous nào đó trong function hoàn tất và trả về kết quả 
// (như giá trị response ở trên). Đến đây chúng ta đã nhận được một PJO và Redux Thunk sẽ cho action này đến Reducer như bình thường. 
// vd
// impport dataUsers from '../api/datausers';

// export const getUsers = async () => {
//     const response = await dataUsers.get('/users');
//     return {
//         type: 'GET_USERS',
//         payload: response
//     }
// };    