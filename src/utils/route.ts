import Login from '../screens/Login';
import ChatList from '../screens/ChatList';
import Chat from '../screens/Chat';

const AUTH_ROUTE = {
    ChatList: {
        name: 'Chat List',
        screen: ChatList,
    },
    Chat: {
        name: 'Chat',
        screen: Chat,
    },
}

const GUEST_ROUTE = {
    Login: {
        name: 'Login',
        screen: Login,
    },
}

export { AUTH_ROUTE, GUEST_ROUTE }