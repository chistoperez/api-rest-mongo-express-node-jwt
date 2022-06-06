import { User } from "../models/User.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    //alternativa buscando por email
    let user = await User.findOne({ email });
    if (user) throw { code: 11000 };
    user = new User({ email, password });
    await user.save();
    //generar jwt token
    res.status(201).json({ ok: true });
  } catch (error) {
    console.log(error);
    //alternativa por defecto mongoose
    if (error.code === 11000) {
      return res.status(400).json({ error: "user already exist" });
    }

    return res.status(500).json({ error: "Server error" });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) return res.status(403).json({ error: "user doesn't exist" });

    const respuestaPassword = await user.comparePassword(password);
    if (!respuestaPassword) {
      return res.status(403).json({ error: "Wrong Password" });
    }
    //Generar token
    const token = jwt.sign({ uid: user._id }, process.env.JWT_SECRET);

    return res.json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server error" });
  }
};
