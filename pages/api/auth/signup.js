import { hashSync } from "bcrypt";
import { createUser, fetchUser } from "@/services/user.service";
import { withSessionRoute } from "@/lib/ironOptions";

export default withSessionRoute(SignUp);

BigInt.prototype.toJSON = function () {
    return this.toString();
};

async function SignUp(req, res) {
    const { email, name, password, role } = req.body;

    try {
        const existingUser = await fetchUser(email);
        if (existingUser) {
            return res.status(409).send({ message: "User already exists" });
        }
        const response = await createUser({
            name,
            email,
            password: hashSync(password, 10),
            role,
        });
        const user = await fetchUser(email);
        const userForSession = Object.fromEntries(
            Object.entries(user).map(([key, value]) => [
                key,
                typeof value === 'bigint' ? value.toString() : value,
            ])
        );

        req.session.user = userForSession;
        await req.session.save();

        res.status(200).send({ message: "Registration successful" });
    } catch (error) {
        console.error(error);
        res.status(400).send({ message: "An error occurred during registration" });
    }
}