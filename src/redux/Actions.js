import { CART_COUNT } from "./Types"

export const addCart = (num) => {
    return {
        type:CART_COUNT,
        payload:num
    }
}