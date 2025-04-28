import UserModel from "../models/users.js";
import bcrypt from "bcrypt";
class userController {
    static home = (req, res) => {
        const user = {
            name: "Home Page",
        }
        res.render('index', { user })
    };
    static registration = (req, res) => {
        const register = {
            name: "registeration",
        }
        res.render('registration', { register })
    };
    static login = (req, res) => {
        const message = req.query.message;
        // console.log(message);
        const log = {
            name: "Login Page",
        }
        res.render('login', { log, message })
    };
    static dashboard = (req, res) => {
        const dash = {
            name: "Welcome to Dashboard",
        }
        res.render('dashboard', { dash })
    };

    static createUserDoc = async (req, res) => {
        // console.log(req.body);
        const hashPassword = await bcrypt.hash(req.body.password, 10);

        try {
            if (req.method === "POST") {
                const { name, email, password } = await req.body;

                const user = new UserModel({ name: name, email: email, password: hashPassword });
                await user.save();
                res.redirect('/user/login' + "?message=You have successfully registered" + "?myclass = success ");
            };
        } catch (error) {
            console.log(error.message);
        }
    };

    static veryfyUser = async (req, res) => {
        try {
            const { email, password } = await req.body;
            const user = await UserModel.findOne({ email: email, password: password });
            if (user) {
                res.redirect('/user/dashboard');
            }
            else {
                res.redirect('/user/login' + "?message=You don't have an account");
            }
        } catch (error) {
            console.log(error.message);
        };
    };
};
export default userController;