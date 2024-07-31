import { defineStore } from "pinia";

export const useAuthStore = defineStore('authStore', {
    state: () => {
        return {
            user: null,
            errors: {}
        }
    },
    actions: {

        async getUser() {
            if (localStorage.getItem('token')) {
                const res = await fetch('/api/user',{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })

                const data = await res.json()

                if (res.ok) {
                    this.user = data
                }
            }
        },

        async authenticate(apiRoute, formData) {
            const res = await fetch(`/api/${apiRoute}`,{
                method: 'POST',
                body: JSON.stringify(formData)
            })

            const data = await res.json()
            
            if (data.errors) {
                this.errors = data.errors
            } else {
                localStorage.setItem('token', data.token)
                this.user = data.user
                this.router.push({ name: 'home'})
            }
        },

        async logout() {
            const res = await fetch(`/api/auth/logout`,{
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            if (res.ok) {
                this.user = null
                this.errors = {}
                localStorage.removeItem('token')
                this.router.push({ name: 'home' })
            }
        }
    }
})