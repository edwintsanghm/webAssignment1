const mongoose = require('mongoose');

const uri = "mongodb+srv://edwintsang:62800024@cluster0.v02we.mongodb.net/database?retryWrites=true&w=majority";

try {
  // Connect to the MongoDB cluster
   mongoose.connect(
    uri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log(" Mongoose is connected")
  );
} catch (e) {
  console.log("could not connect", e);
}

  const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    emailAddress: String,
    phone: String
  });

  userSchema.statics.login = async function(username, password) {
    
    const user = await this.findOne({username: username});

    console.log(user, '123')
    if (user) {
    //   const auth = await bcrypt.compare(password, user.password);
        const auth = password === user.password;
        if (auth) {
            return user;
        }
        throw Error('incorrect username/password');
    }
    throw Error('Login Fail');
  };


const LoginModel = mongoose.model('user', userSchema);

module.exports = {users: LoginModel};