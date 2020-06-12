import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from '../reducers/rootReducer'
import thunk from 'redux-thunk'
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
import firebaseConfig from '../../helper/firebaseConfig'


const configureStore = () => {
    const store = createStore(
        rootReducer,
        compose(
            reactReduxFirebase(firebaseConfig),
            applyMiddleware(thunk.withExtraArgument({ getFirebase }))
        )
    )
    // store.firebaseAuthIsReady.then(() => {
    //     console.log("loaded")
    // })
    return store;
}

export default configureStore;