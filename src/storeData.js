// Stored Data contains all login information
const storedData = {};

// used in sign in component ot get user input
let state = {
    userType: "",
    username: "",
    password: "",
    firstName: "",
    lastName: ""
}

// export so that it can be used in other files
export {
    state,
    storedData
}
