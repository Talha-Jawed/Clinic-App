import actionTypes from '../Constant/Constant'

const INITIAL_STATE = {
    USERNAME: null,
    UID: null,
    CLINICDATA: null
}

export default (states = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'USERNAME':
            return ({
                ...states,
                USERNAME: action.payload
            })
        case 'UID':
            return ({
                ...states,
                UID: action.payload
            })
        case 'CLINICDATA':
            return ({
                ...states,
                CLINICDATA: action.payload
            })
        default:
            return states;
    }
}