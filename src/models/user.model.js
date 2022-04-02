const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.pre("save", (next) => {
    const hash = bcrypt.hashSync(this.password, 4);
    this.password = hash;
    return next;
})


userSchema.methods.checkPassword = () => {
    return bcrypt.compareSync(password, this.password);
}
const User = mongoose.model("user", userSchema);

module.exports = User;
