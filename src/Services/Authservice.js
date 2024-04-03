import Api from '../Axios/Api';
const USER_API = "/users";

export const signup = async (user) => {
    const u = {}
    for (var pair of user.entries()) {
        u[pair[0]] = pair[1]
    }
    return await Api.post(USER_API + '/register', u);
}





export const signin = async (user) => {
    return await Api.post(USER_API + "/login", user);
}


// export const signin = async (user) => {
//     try {
//       const response = await Api.post(USER_API + "/login", user);

//       return response.data;
//     } catch (error) {
//       throw new Error(error.response.data.message);
//     }
//   }







// export const signin = async (user) => {
//     try {
//       const response = await Api.post(USER_API + "/login", user);

//       return response.data;
//     } catch (error) {
//       throw new Error(error.response.data.message);
//     }
//   }