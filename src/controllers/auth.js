import { ONE_DAY } from "../constants/index.js";
import { registerUser, loginUser, refreshUserSession, logoutUser } from "../services/auth.js";

export const registerUserController = async (req, res) => {
    const user = await registerUser(req.body);


    res.json({
        status: 201,
        message: "Successfully registered a user!",
        data: user,
    })
};

export const loginUserController = async (req, res) => {
  try {
    const user = await loginUser(req.body);



  res.cookie('refreshToken', user.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY ),
  });

  res.cookie('sessionId', user._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY ),
  });


    res.status(200).json({
      message: 'Successfully logged in a user!',
      data: {
        accessToken: user.accessToken,
      },
    });
  } catch (error) {
    res.status(401).json({ message: "Failed to login user", error: error.message });
  }
};

const setupSession = (res, session) => {
    res.cookie('refreshToken', session.refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + ONE_DAY)
    });
    res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
};
export const refreshUserSessionController = async (req, res) => {
  const session = await refreshUserSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const logoutUserController = async (req, res) => {
    if (req.cookies.sessionId) { await logoutUser(req.cookies.sessionId) };
    res.clearCookie('sessionId');
    res.clearCookie('refreshToken');
    res.status(204).send();
};
