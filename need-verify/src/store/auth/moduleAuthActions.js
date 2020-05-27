/*=========================================================================================
  File Name: moduleAuthActions.js
  Description: Auth Module Actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import router from '@/router'
import axios from '../../axios.js'
import requestUrls from '../requestUrls'
import store from '../store.js'

export default {

    updateUsername({ commit }, payload) {
        payload.user.updateProfile({
            displayName: payload.username
        }).then(() => {

            // If username update is success
            // update in localstorage
            let newUserData = Object.assign({}, payload.user.providerData[0])
            newUserData.displayName = payload.username
            commit('UPDATE_USER_INFO', newUserData, { root: true })

            // If reload is required to get fresh data after update
            // Reload current page
            if (payload.isReloadRequired) {
                router.push(router.currentRoute.query.to || '/')
            }
        }).catch((err) => {
            payload.notify({
                time: 8800,
                title: 'Error',
                text: err.message,
                iconPack: 'feather',
                icon: 'icon-alert-circle',
                color: 'danger'
            })
        })
    },


    // 
    login({ commit }, payload) {
        let email = payload.userDetails.email;
        let password = payload.userDetails.password;
        const params = new URLSearchParams();
        params.append("func", "getUser");
        params.append("email", email);
        params.append("password", password);
        return new Promise((resolve) => {
            axios.post(requestUrls.users, params).then(response => {
                try {
                    console.log(response.data);
                    if (response.data != null && typeof response.data[0] === 'object') {
                        var user = response.data[0];

                        var token = user["token"]
                        if (!router.currentRoute.query.to) {
                            router.currentRoute.query.to = "/certificates";
                        }
                        // Navigate User to homepage
                        router.push(router.currentRoute.query.to || '/')
                        // Set accessToken
                        localStorage.setItem("accessToken", token)
                        store.userObject = user;
                        // local'e de kaydet
                        localStorage.setItem("userObject", JSON.stringify(user))
                        // local'den geri almak için
                        // console.log(JSON.parse(localStorage.getItem("userObject")) )
                        // Set bearer token in axios
                        commit("SET_BEARER", token)
                        resolve("login_successful");
                        return;
                    }
                }
                catch (err) {
                    console.log("login response : " + err);
                }
                payload.notify({
                    title: 'Warning!',
                    text: "Wrong Password!",
                    iconPack: 'feather',
                    icon: 'icon-alert-circle',
                    position: 'top-right',
                    color: 'danger'
                })
                resolve("wrong_password");

            }).catch(error => {
                payload.notify({
                    title: 'Error',
                    text: error,
                    iconPack: 'feather',
                    icon: 'icon-alert-circle',
                    color: 'danger'
                })
            })
        })
    },

    // Profil sayfasına girildiğinde kullanıcı bilgilerinin tekrar alınması için
    fetchUser({ commit }, email) {
        const params = new URLSearchParams();
        params.append("func", "getUserByEmail");
        params.append("email", email);
        return new Promise((resolve) => {
            axios.post(requestUrls.users, params).then(response => {
                try {
                    if (response.data != null && typeof response.data[0] === 'object') {
                        var user = response.data[0];
                        store.userObject = user;
                        // local'e de kaydet
                        localStorage.setItem("userObject", JSON.stringify(user))
                        resolve("successful");
                        return;
                    }
                }
                catch (err) {
                    console.log("login response : " + err);
                }
            }).catch(error => {
                commit(); // commit kullanılmadı hatası için
                resolve(error);
            })
        })
    },

    registerUser({ commit }, payload) {
        const { name, surname, email, password, identity_number, birth_date } = payload;
        return new Promise((resolve, reject) => {
            const params = new URLSearchParams();
            params.append("func", "addUser");
            params.append("name", name);
            params.append("surname", surname);
            params.append("email", email);
            params.append("password", password);
            params.append("identity_number", identity_number);
            params.append("birth_date", birth_date);
            axios.post(requestUrls.users, params).then(response => {
                console.log(response.data);
                resolve(response.data == "TRUE");
            }).catch(error => {
                commit(); // commit kullanılmadı hatası için
                reject(error)
            })
        });
    },

    updateUser({ commit }, payload) {
        const { email, name, surname, phone } = payload;
        return new Promise((resolve, reject) => {
            const params = new URLSearchParams();
            params.append("func", "updateUser");
            params.append("email", email);
            params.append("name", name);
            params.append("surname", surname);
            params.append("phone", phone);
            axios.post(requestUrls.users, params).then(response => {
                resolve(response.data == "TRUE");
            }).catch(error => {
                commit(); // commit kullanılmadı hatası için
                reject(error)
            })
        });
    },

    sendPhoneVerificationMessage() {
        return new Promise((resolve, reject) => {
            var email = JSON.parse(localStorage.getItem("userObject")).email;
            const params = new URLSearchParams();
            params.append("func", "sendPhoneVerificationMessage");
            params.append("email", email);
            axios.post(requestUrls.sms, params).then(response => {
                console.log("response.data");
                console.log(response.data);
                resolve(response.data == "TRUE");
            }).catch(error => { reject(error) })
        });
    },


    isEmailAvailable({ commit }, email) {
        return new Promise((resolve, reject) => {
            const params = new URLSearchParams();
            params.append("func", "isEmailAvailable");
            params.append("email", email);
            axios.post(requestUrls.users, params).then(response => {
                resolve(response.data == "TRUE");
            }).catch(error => {
                reject(error)
                commit(); // commit kullanılmadı hatası için
            })
        });
    },


    sendResetPasswordCode({ commit }, email) {
        return new Promise((resolve, reject) => {
            const params = new URLSearchParams();
            params.append("func", "sendResetPasswordCode");
            params.append("email", email);
            axios.post(requestUrls.users, params).then(response => {
                console.log(response.data);
                resolve(response.data == "TRUE");
            }).catch(error => {
                commit(); // commit kullanılmadı hatası için
                reject(error)
            })
        });
    },

    resetPassword({ commit }, payload) {
        console.log("resetPassword")
        const { email, password, verificationCode } = payload;
        console.log(email)
        console.log(password)
        console.log(verificationCode)
        return new Promise((resolve, reject) => {
            const params = new URLSearchParams();
            params.append("func", "resetPassword");
            params.append("email", email);
            params.append("password", password);
            params.append("verification_code", verificationCode);
            axios.post(requestUrls.users, params).then(response => {
                console.log(response);
                resolve(response.data == "TRUE");
            }).catch(error => {
                commit(); // commit kullanılmadı hatası için
                reject(error)
            })
        });
    },

    sendVerificationMail({ commit }, email) {
        return new Promise((resolve, reject) => {
            const params = new URLSearchParams();
            params.append("func", "sendVerificationMail");
            params.append("email", email);
            axios.post(requestUrls.users, params).then(response => {
                resolve(response.data == "TRUE");
            }).catch(error => {
                commit(); // commit kullanılmadı hatası için
                reject(error)
            })
        });
    },



}
