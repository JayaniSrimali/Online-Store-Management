const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},

	email: {
		type: String,
		required: true,
		unique: true,
	},

	lname: {
		type: String,
		required: true,
		
	},
    password: {
		type: String,
		required: true,
	},

	userRole: {
		type: String,
		required: true,
	},
	
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = user = mongoose.model("Users", UserSchema);