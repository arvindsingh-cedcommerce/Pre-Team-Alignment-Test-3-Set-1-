import { CART_COUNT } from "./Types"

const inititailState = {
    cartCount: 0
}

export const Reducer = (state = inititailState, action) => {
    switch (action.type) {
        case CART_COUNT:
            return {
                ...state,
                cartCount: state.cartCount + action.payload
            }
        default:
            return state
    }
}