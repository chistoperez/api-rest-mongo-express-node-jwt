import mongoose from "mongoose";

try {
  await mongoose.connect(process.env.URI);
  console.log("connect DB");
} catch (error) {
  console.log("connect error " + error);
}
