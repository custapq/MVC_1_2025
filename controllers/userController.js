import { createUser, getAllUsers, getAdminUsersById,getStudentUsersById } from "../models/userModel.js";

export const registerUser = async (req, res) => {
  try {
    const { user_name, user_password, user_role } = req.body;
    const newUser = await createUser({ user_name, user_password, user_role });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "error in registerUser" });
  }
};

export const loginUserAdmin = async (req, res) => {
  try {
    const { user_name, user_password } = req.body;
    console.log(req.body);
    const user = await getAdminUsersById(user_name,user_password);
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }
    if (user_name == user[0].user_name && user_password == user[0].user_password) {
      // console.log("Login successful");
      return res.status(200).json(user);
    }
    res.status(404).json({ error: "Admin user not found" });
  } catch (error) {
    res.status(500).json({ error: "error in loginUserAdmin" });
  }
};

export const loginUserStudent = async (req, res) => {
  try {
    const { user_name, user_password } = req.body;
    const user = await getStudentUsersById(user_name,user_password);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "error in loginUserStudent" });
  }
};


export const getAllUers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "error in getAllUsers" });
  }
};