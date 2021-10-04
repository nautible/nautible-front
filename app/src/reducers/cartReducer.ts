import { Action, State } from '../types/cart'

export const initialState: State = {
  count: 0,
  product: []
}

export const reducer = (state: State, action: Action): State => {
  switch(action.type){
    case 'insert':
      return state
    case 'delete':
      return state
    default:
      throw new TypeError(`Illegal type of action: ${action.type}`)
  }  
}
