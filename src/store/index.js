import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    user: '',
    contra: '',
    correo: ''
  },
  mutations: {
    LOGEARSE(state, usuario) {
      state.user = usuario.usuario
      state.contra = usuario.contrasena
      state.correo = usuario.correo
    }
  },
  actions: {
    async login({ commit }, info) {
      try {
        const response = await axios.post('http://localhost:3000/identificarse', { ...info, action: 'login' })
        console.log(response.data)

        if (response.data.success) {

          commit('LOGEARSE', response.data.user) 
          return true
        } else {
          console.error('Login fallado')
        }
      } catch (error) {
        console.error(error)
        return false
      }
    },
    async register({ commit }, obj) {
      try {
        const response = await axios.post('http://localhost:3000/identificarse',{...obj,action:'register'})
        console.log(response.data)

        if (response.data.success ){

          commit('LOGEARSE', response.data.user) 
          return true 

        } else {

          console.error('Registro fallado')

        }
      } catch (error) {
        console.error(error)
        return false 
      }
    }
  }
})
