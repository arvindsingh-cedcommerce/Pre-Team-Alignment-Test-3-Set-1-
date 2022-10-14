import { connect } from 'react-redux';
import { addCart } from './Actions';

export const mapStateToProps = (state) => {
    return {
        ...state
    }
}

export const mapStateToDispatch = (dispatch) => {
    return {
        addCart: (e) => dispatch(addCart(e))
    }
}
