import mongoose from "mongoose"
//model schema for storing user data 
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        password: {
            type: String,
            minLength: 6,
            required: true
        },
        role: {
            type: String,
            required: true,
            default: "client"
        },
        phone: {
            type: String,
            default: ""
        },
        department: {
            type: String,
            default: "General"
        },
        designation: {
            type: String,
            default: "Employee"
        },
        address: {
            type: String,
            default: ""
        }
    }
)

const User = mongoose.model("User", userSchema) // assigning the schema to a name . the name should be in the upper case. 
export default User; //exports