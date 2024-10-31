import { defineStore } from 'pinia'

import state from '$/state'
import actions from '$/actions'
import getters from '$/getters'

const getStore = defineStore({
  id: 'game',
  state: () => state,
  getters: getters,
  actions: actions,
})

let store
const useStore = function () {
  return store || getStore()
}

export default useStore
