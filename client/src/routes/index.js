import Homepage from "../pages/Homepage/Homepage"
import Profile from "../pages/Profile/Profile"
import NotFound from "../pages/NotFound/NotFound"
import SignUp from "../pages/SignUp/SignUp"
import LogIn from "../pages/LogIn/LogIn"
import SearchBox from "../components/SearchBox/SearchBox"
import CreatePost from "../components/CreatePost/CreatePost"

export const routes = [
    {
        path: '/',
        page: Homepage,
        isShowHeader: true
    },
    {
        path: '/profile',
        page: Profile,
        isShowHeader: true
    },
    {
        path: '/login',
        page: LogIn,
        isShowHeader: true
    },
    {
        path: '/signup',
        page: SignUp,
        isShowHeader: true
    },
    {
        path: '/search',
        page: SearchBox,
        isShowHeader: true
    },
    {
        path: '/create-post',
        page: CreatePost,
        isShowHeader: true
    },
    {
        path: '*',
        page: NotFound
    }
]