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
    setMyNotaryDocuments(state, myNotaryDocuments) {
      state.myNotaryDocuments = myNotaryDocuments
    },

    setNotaryDocumentsToApprove(state, notaryDocumentsToApprove) {
      state.notaryDocumentsToApprove = notaryDocumentsToApprove
    },

    setAllUsers(state, allUsers) {
      state.allUsers = allUsers
    },

  },
  actions: {
    getMyNotaryDocuments({ commit }, user_id) {
      return new Promise((resolve, reject) => {
        const params = new URLSearchParams();
        params.append("func", "getMyNotaryDocuments");
        params.append("user_id", user_id);
        axios.post(requestUrls.notary, params).then(response => {
          if (response.data) {
            commit('setMyNotaryDocuments', response.data)
            resolve(response.data)
          }
        }).catch(error => { reject(error) })
      });
    },

    getNotaryDocumentsToApprove({ commit }, user_id) {
      return new Promise((resolve, reject) => {
        const params = new URLSearchParams();
        params.append("func", "getNotaryDocumentsToApprove");
        params.append("user_id", user_id);
        axios.post(requestUrls.notary, params).then(response => {
          if (response.data) {
            commit('setNotaryDocumentsToApprove', response.data)
            resolve(response.data)
          }
        }).catch(error => { reject(error) })
      });
    },

    getAllUsers({ commit }, user_id) {
      return new Promise((resolve, reject) => {
        const params = new URLSearchParams();
        params.append("func", "getAllUsers");
        params.append("user_id", user_id);
        axios.post(requestUrls.notary, params).then(response => {
          console.log(response);
          if (response.data) {
            commit('setAllUsers', response.data)
            resolve(response.data)
          }
        }).catch(error => { reject(error) })
      });
    },

    addNotaryDocument({ commit }, payload) {
      const { user_id, user_to_approve_id, document_type, document_info } = payload;
      return new Promise((resolve, reject) => {
        const params = new URLSearchParams();
        params.append("func", "addNotaryDocument");
        params.append("user_id", user_id);
        params.append("user_to_approve_id", user_to_approve_id);
        params.append("document_type", document_type);
        params.append("document_info", document_info);
        axios
          .post(requestUrls.notary, params)
          .then(response => {
            resolve(response.data == "TRUE");
          })
          .catch((error) => {
            reject(error)
            commit(); // commit kullanılmadı hatası için
          })
      })
    },

    approveDocument({ commit }, nd_id) {
      return new Promise((resolve, reject) => {
        const params = new URLSearchParams();
        params.append("func", "approveDocument");
        params.append("nd_id", nd_id);
        axios
          .post(requestUrls.notary, params)
          .then(response => {
            resolve(response.data == "TRUE");
          })
          .catch((error) => {
            reject(error)
            commit(); // commit kullanılmadı hatası için
          })
      })
    },

    declineDocument({ commit }, nd_id) {
      return new Promise((resolve, reject) => {
        const params = new URLSearchParams();
        params.append("func", "declineDocument");
        params.append("nd_id", nd_id);
        axios
          .post(requestUrls.notary, params)
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
