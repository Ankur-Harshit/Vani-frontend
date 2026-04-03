import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Body from "./components/Body";
import MainPage from "./components/MainPage";
import Profile from "./components/Profile";
import appStore from "./utils/appStore";
import { Provider } from "react-redux";
import Feed from "./components/Feed";
import EditProfile from "./components/EditProfile";
import Post from "./components/Post";
import Notifications from "./components/Notifications";
import Requests from "./components/Requests";
import Followers from "./components/Followers";
import Followings from "./components/Followings";
import Explore from "./components/Explore";
import ExploreProfile from "./components/ExploreProfile";
import Hinge from "./components/Hinge";

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/home" element={<Home />} />

          <Route path="/" element={<Body />}>
            <Route path="/" element={<MainPage />}>
              <Route index element={<Feed />} />
              <Route path="/profile/:userId" element={<Profile />} />
              <Route path="/edit" element={<EditProfile />} />
              <Route path="/post/:postId" element={<Post />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/requests" element={<Requests />} />
              <Route path="/followers/:userId" element={<Followers />} />
              <Route path="/followings/:userId" element={<Followings />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/explore/profiles/:text" element={<ExploreProfile />} />
              <Route path="/hinge" element={<Hinge />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
