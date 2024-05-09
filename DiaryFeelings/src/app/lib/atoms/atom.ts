import { atom } from 'recoil'

interface User {
    pk: number
    username: string
}

export const textState = atom({
    key: 'textState', // unique ID (with respect to other atoms/selectors)
    default: 'test test test', // default value (aka initial value)
})

export const calState = atom({
    key: 'calendar open',
    default: false,
})

export const userInfo = atom<User>({
    key: 'userinfo',
    default: {
        pk: 1,
        username: '',
    },
})
