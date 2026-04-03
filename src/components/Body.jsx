import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const [loading, setLoading] = useState(true);
  const userData = useSelector((store) => store.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchUser = async () => {
      if (userData) {
          setLoading(false);
          return;
    }
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
        dispatch(addUser(res.data));
        setLoading(false);
    } catch (err) {
        if (err) {
          setLoading(false);
        return navigate("/home");
      }
      console.log(err);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
    if(loading) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          );
    }
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Body;
