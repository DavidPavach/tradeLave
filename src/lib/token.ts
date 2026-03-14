import Cookies from "js-cookie";

// Save tokens
export const setTokens = (accessToken: string) => {
  Cookies.set("_r2m", accessToken, {
    secure: true,
    sameSite: "strict",
    expires: 7,
  });
};

// Get token
export const getAccessToken = () => Cookies.get("_r2m");

// Clear tokens
export const clearTokens = () => {
  Cookies.remove("_r2m");
};


// Save Id
export const setId = (id: string) => {
  Cookies.set("trd.ast", `trdAst${id}`, {
    secure: true,
    sameSite: "strict",
    expires: 7,
  })
}

// Get UserId
export const getId = () => {
  const original = Cookies.get("trd.ast");
  if (original) {
    const userId = original.slice(6);
    return userId
  } else {
    return null
  }
}

// Delete UserId
export const deleteId = () => {
  Cookies.remove("trd.ast")
}

//Save Admin Token
export const setAdminTokens = (accessToken: string) => {
  Cookies.set("_vpx", accessToken, {
    secure: true,
    sameSite: "strict",
    expires: 7,
  });
};

// Get admin token
export const getAdminAccessToken = () => Cookies.get("_vpx");

// Clear tokens
export const clearAdminTokens = () => {
  Cookies.remove("_vpx");
};