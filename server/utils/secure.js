const { verifyJWT } = require("./jwt");
const UserModel = require("../modules/users/user.model");

const compareRoles = (user_perm, access_perm) => {
  if (access_perm.length === 0) return true;
  return user_perm.some((v) => access_perm.indexOf(v) !== -1);
};

const secureAPI = (roles) => {
  return async (req, res, next) => {
    try {
      const bearerToken = req?.headers?.authorization;
      if (!bearerToken) throw new Error("Acess Token is required");
      const token = bearerToken.split("Bearer ")[1];
      const tokenData = verifyJWT(token);
      if (!tokenData) throw new Error("Token invalid");
      const { data } = tokenData;
      // Find the user , check the user, gets it role
      const user = await UserModel.findOne({
        email: data.email,
        isActive: true,
        isArchived: false,
        isEmailVerified: true,
      });
      if (!user) throw new Error("User not found");
      const isAllowed = compareRoles(user.roles, roles ?? []);
      req.currentUser = user._id;
      req.currentRole = user.roles;
      if (!isAllowed) throw new Error("User Unauthorized");
      next();
    } catch (e) {
      next(e);
    }
  };
};

module.exports = secureAPI;
