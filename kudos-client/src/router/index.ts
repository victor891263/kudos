import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import SignUpView from '@/views/SignUpView.vue'
import LoginView from '@/views/LoginView.vue'
import InboxView from '@/views/InboxView.vue'
import InboxConversation from '@/views/InboxConversation.vue'
import NewConversation from '@/views/NewConversation.vue'
import NewGroup from '@/views/NewGroup.vue'
import JoinGroup from '@/views/JoinGroup.vue'
import AccountView from '@/views/AccountView.vue'
import ProfileView from '@/views/ProfileView.vue'
import EditProfile from '@/views/EditProfile.vue'
import GroupView from '@/views/GroupView.vue'
import EditGroup from '@/views/EditGroup.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
        beforeEnter: (to, from) => {
            if (localStorage.getItem('kudos-app:token')) return { name: 'inbox' }
        }
    },
    {
        path: '/signup',
        name: 'signup',
        component: SignUpView,
        beforeEnter: (to, from) => {
            if (localStorage.getItem('kudos-app:token')) return { name: 'inbox' }
        }
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView,
        beforeEnter: (to, from) => {
            if (localStorage.getItem('kudos-app:token')) return { name: 'inbox' }
        }
    },
    {
        path: '/inbox',
        name: 'inbox',
        component: InboxView,
        children: [
            {
                name: 'conversation',
                path: ':id',
                component: InboxConversation
            },
            {
                name: 'newConversation',
                path: 'newconversation',
                component: NewConversation
            },
            {
                name: 'newGroup',
                path: 'newgroup',
                component: NewGroup
            },
            {
                name: 'joinGroup',
                path: 'joingroup',
                component: JoinGroup
            },
            {
                name: 'userProfile',
                path: 'user/:id',
                component: ProfileView
            },
            {
                name: 'account',
                path: 'account',
                component: AccountView
            },
            {
                name: 'editProfile',
                path: 'account/edit',
                component: EditProfile
            },
            {
                name: 'groupProfile',
                path: 'group/:id',
                component: GroupView
            },
            {
                name: 'editGroup',
                path: 'group/:id/edit',
                component: EditGroup
            }
        ],
        beforeEnter: (to, from) => {
            if (!localStorage.getItem('kudos-app:token')) return { name: 'home' }
        }
    }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router