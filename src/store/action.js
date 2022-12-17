import axios from "axios";
import * as actionTypes from "./actionTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (res) => {
  console.log(res.timestamp);
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: res.token,
    userId: res._id,
    imageURL: res.profile_image,
    username: res.username,
    bio: res.bio,
    email: res.email,
    joinDate: res.timestamp
  };
};

export const saveSuccess = (res) => {
  return {
    type: actionTypes.SAVE_SUCCESS,
    imageURL: res.profile_image,
    username: res.username,
    bio: res.bio,
    email: res.email,
    message: res.message,
  };
};

export const saveDetails = (details) => {
  const button = document.querySelector("#saveDetails");
  return (dispatch, getState) => {
    let url = `https://tweeter-test-yin.herokuapp.com/${getState().userId
      }/profile`;
    axios
      .post(url, details, {
        headers: {
          Authorization: getState().token,
        },
      })
      .then((response) => {
        dispatch(saveSuccess(response.data));
        button.disabled = false;
      })
      .catch((error) => {
        dispatch(authFail(error.message));
        button.disabled = false;
      });
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

// export const auth = (email, password, method) => {
//   return (dispatch) => {
//     dispatch(authStart());
//     const authData = {
//       email: email,
//       password: password,
//     };
//     let response = { email: "abc@gmail.com", password: "123456", username: "yufan", imageURL: "https://gravatar.com/avatar/7c5673f4f01a16a452e3c14ac6a1db82?s=400&d=robohash&r=x" };
//     // let response = { email: "abc@gmail.com", password: "123456" };
//     dispatch(authSuccess(response));

//   };
// };

export const auth = (email, password, method) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
    };
    // let url = "https://tweeter-test-yin.herokuapp.com/register";
    let url = "http://localhost:8000/api/account/register";
    if (!method) {
      url = "http://localhost:8000/api/account/login";
    }
    axios
      .post(url, authData)
      .then((response) => {
        console.log(response);
        if (response.status === 400 || response.status === 500) {
          throw response
        }
        else {
          dispatch(authSuccess(response.data));
        }
      })
      .catch((error) => {
        dispatch(authFail(error.response.data.message));
      });
  };
};

export const postTweet = (tweet) => {
  return (dispatch, getState) => {
    let url = "http://localhost:8000/api/tweet";
    axios({
      method: "post",
      url: url,
      data: tweet,
      headers: {
        "Content-Type": "application/json",
        Authorization: getState().token,
      },
    })
      .then(dispatch({ type: actionTypes.TWEET_SUCCESS }))
      .catch(dispatch({ type: actionTypes.TWEET_FAIL }));
  };
};
