const ActionType = {
    SET_TOKEN: "SET_TIMER",
}

function setToken(token) {
    return {
        type: ActionType.SET_TOKEN,
        payload: {
            token
        },
    }
}

export {
    ActionType,
    setToken
}