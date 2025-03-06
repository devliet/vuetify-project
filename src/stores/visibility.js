import { defineStore} from 'pinia'
export const useVisibilityStore = defineStore('visibility', {
    state: () => ({closed: true}),
    getters: {
        friendlyState(state){
            return state.closed ? "Form closed" : "Form open"
        }
    },
    actions: {
        toggleForm(){
            this.closed= !this.closed
            localStorage.setItem('form', this.closed)
        },
        loadFormFromLocalStorage(){
            const closed = localStorage.getItem('form')
            this.closed = closed === 'true'
        }
    }
})

