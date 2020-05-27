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
    setCreatorCertificates(state, creatorCertificates) {
      state.creatorCertificates = creatorCertificates
    },

    setUserCertificates(state, userCertificates) {
      state.userCertificates = userCertificates
    },

    setCertificateRequests(state, certificateRequests) {
      state.certificateRequests = certificateRequests
    },
    
    setInstitutions(state, institutions) {
      state.institutions = institutions
    },

  },
  actions: {

    getCreatorCertificates({ commit }, user_id) {
      return new Promise((resolve, reject) => {
        const params = new URLSearchParams();
        params.append("func", "getCreatorCertificates");
        params.append("user_id", user_id);
        axios.post(requestUrls.certificates, params).then(response => {
          if (response.data != null) {
            commit('setCreatorCertificates', response.data)
            resolve(response.data)
          }
        }).catch(error => { reject(error) }) 
      });
    },
     
    getUserCertificates({ commit }, user_id) {
      return new Promise((resolve, reject) => {
        const params = new URLSearchParams();
        params.append("func", "getUserCertificates");
        params.append("user_id", user_id);
        axios.post(requestUrls.certificates, params).then(response => {
          if (response.data != null) {
            commit('setUserCertificates', response.data)
            resolve(response.data)
          }
        }).catch(error => { reject(error) })
      });
    },

    
    addUserCertificate({ commit }, payload) {
      const { user_id, certificate_id } = payload;
      return new Promise((resolve, reject) => {
        const params = new URLSearchParams();
        params.append("func", "addUserCertificate");
        params.append("user_id", user_id);
        params.append("certificate_id", certificate_id);
        axios
          .post(requestUrls.certificates, params)
          .then(response => {
            resolve(response.data == "TRUE");
          })
          .catch((error) => {
            reject(error)
            commit(); // commit kullanılmadı hatası için
          })
      })
    },

    
    getCertificatesOfSelectedInstitution({ commit }, institution_id) {
      return new Promise((resolve, reject) => {
        const params = new URLSearchParams();
        params.append("func", "getCertificatesOfSelectedInstitution");
        params.append("institution_id", institution_id);
        axios.post(requestUrls.certificates, params).then(response => {
          if (response.data != null) {
            resolve(response.data)
          }
        }).catch(error => { reject(error); commit()})
      });
    },

    getCertificateRequests({ commit }, user_id) {
      return new Promise((resolve, reject) => {
        const params = new URLSearchParams();
        params.append("func", "getCertificateRequests");
        params.append("user_id", user_id);
        axios.post(requestUrls.certificates, params).then(response => {
          if (response.data != null) {
            commit('setCertificateRequests', response.data)
            resolve(response.data)
          }
        }).catch(error => { reject(error) })
      });
    },

    
    getInstitutions({ commit }) {
      return new Promise((resolve, reject) => {
        const params = new URLSearchParams();
        params.append("func", "getInstitutions");
        axios.post(requestUrls.certificates, params).then(response => {
          if (response.data != null) {
            commit('setInstitutions', response.data)
            resolve(response.data)
          }
        }).catch(error => { reject(error) })
      });
    },

    addCertificate({ commit }, payload) {
      const { user_id, institution_id, certificate_name, certificate_info, certificate_date } = payload;
      return new Promise((resolve, reject) => {
        const params = new URLSearchParams();
        params.append("func", "addCertificate");
        params.append("user_id", user_id);
        params.append("institution_id", institution_id);
        params.append("certificate_name", certificate_name);
        params.append("certificate_info", certificate_info);
        params.append("certificate_date", certificate_date);
        axios
          .post(requestUrls.certificates, params)
          .then(response => {
            console.log(response);
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
          .post(requestUrls.certificates, params)
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
          .post(requestUrls.certificates, params)
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
