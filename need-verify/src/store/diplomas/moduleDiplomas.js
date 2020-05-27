/*=========================================================================================
  File Name: moduleAuth.js
  Description: Auth Module
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import axios from '../../axios.js'
import requestUrls from '../requestUrls'

export default {
  isRegistered: false,
  namespaced: true,
  state: {

  },
  mutations: {
    setCreatorDiplomas(state, creatorDiplomas) {
      state.creatorDiplomas = creatorDiplomas
    },

    setUserDiplomas(state, userDiplomas) {
      state.userDiplomas = userDiplomas
    },
    
    setDiplomaRequests(state, diplomaRequests) {
      state.diplomaRequests = diplomaRequests
    },

    setAllDiplomas(state, allDiplomas) {
      state.allDiplomas = allDiplomas
    },

    

  },
  actions: {

    getCreatorDiplomas({ commit }, user_id) {
      /*
        return new Promise((resolve, reject) => {
          axios.get('http://localhost:3000/api/Diplomas?filter={"creator_id" : "' + user_id + '"}').then(response => {
            console.log(response);
            if (response.data != null) {
              commit('setCreatorDiplomas', response.data)
              resolve(response.data)
            }
          }).catch(error => { reject(error) })
        });
      */
      return new Promise((resolve, reject) => {
        const params = new URLSearchParams();
        params.append("func", "getCreatorDiplomas");
        params.append("user_id", user_id);
        axios.post(requestUrls.diplomas, params).then(response => {
          if (response.data != null) {
            commit('setCreatorDiplomas', response.data)
            resolve(response.data)
          }
        }).catch(error => { reject(error) }) 
      });
    },
    
    // get all creator diplomas to request
    getAllDiplomas({ commit }) {
      return new Promise((resolve, reject) => {
        const params = new URLSearchParams();
        params.append("func", "getAllDiplomas");
        axios.post(requestUrls.diplomas, params).then(response => {
          if (response.data != null) {
            commit('setAllDiplomas', response.data)
            resolve(response.data)
          }
        }).catch(error => { reject(error) }) 
      });
    },
     
    getUserDiplomas({ commit }, user_id) {
      return new Promise((resolve, reject) => {
        const params = new URLSearchParams();
        params.append("func", "getUserDiplomas");
        params.append("user_id", user_id);
        axios.post(requestUrls.diplomas, params).then(response => {
          if (response.data != null) {
            commit('setUserDiplomas', response.data)
            resolve(response.data)
          }
        }).catch(error => { reject(error) })
      });
    },

    
    addUserDiploma({ commit }, payload) {
      const { user_id, diploma_id, graduation_year } = payload;
      return new Promise((resolve, reject) => {
        const params = new URLSearchParams();
        params.append("func", "addUserDiploma");
        params.append("user_id", user_id);
        params.append("diploma_id", diploma_id);
        params.append("graduation_year", graduation_year);
        axios
          .post(requestUrls.diplomas, params)
          .then(response => {
            resolve(response.data == "TRUE");
          })
          .catch((error) => {
            reject(error)
            commit(); // commit kullanılmadı hatası için
          })
      })
    },


    getDiplomaRequests({ commit }, user_id) {
      return new Promise((resolve, reject) => {
        const params = new URLSearchParams();
        params.append("func", "getDiplomaRequests");
        params.append("user_id", user_id);
        axios.post(requestUrls.diplomas, params).then(response => {
          if (response.data != null) {
            console.log(response.data);
            commit('setDiplomaRequests', response.data)
            resolve(response.data)
          }
        }).catch(error => { reject(error) })
      });
    },

    addDiploma({ commit }, payload) {
      const { user_id, school_name, faculty_name, department_name } = payload;
      return new Promise((resolve, reject) => {
        const params = new URLSearchParams();
        params.append("func", "addDiploma");
        params.append("user_id", user_id);
        params.append("school_name", school_name);
        params.append("faculty_name", faculty_name);
        params.append("department_name", department_name);
        axios
          .post(requestUrls.diplomas, params)
          .then(response => {
            resolve(response.data == "TRUE");
          })
          .catch((error) => {
            reject(error)
            commit(); // commit kullanılmadı hatası için
          })
      })
    },

    approveRequest({ commit }, request_id) {
      return new Promise((resolve, reject) => {
        const params = new URLSearchParams();
        params.append("func", "approveRequest");
        params.append("request_id", request_id);
        axios
          .post(requestUrls.diplomas, params)
          .then(response => {
            resolve(response.data == "TRUE");
          })
          .catch((error) => {
            reject(error)
            commit(); // commit kullanılmadı hatası için
          })
      })
    },

    declineRequest({ commit }, request_id) {
      return new Promise((resolve, reject) => {
        const params = new URLSearchParams();
        params.append("func", "declineRequest");
        params.append("request_id", request_id);
        axios
          .post(requestUrls.diplomas, params)
          .then(response => {
            resolve(response.data == "TRUE");
          })
          .catch((error) => {
            reject(error)
            commit(); // commit kullanılmadı hatası için
          })
      })
    },

    

  },
  getters: {
  }
}
