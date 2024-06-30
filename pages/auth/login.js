import { useState } from "react";
import { useRouter } from "next/router";
import { Input, Button } from '@chakra-ui/react';
import { FaArrowLeft } from "react-icons/fa";
import { login } from "@/operations/auth.fetch";

function Login() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [loginError, setLoginError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleLogin = async () => {
        console.log("Login button clicked");
        try {
            console.log("Attempting login with:", formData); // Debugging line
            const response = await login(formData);
            console.log("Login response:", response); // Debugging line

            if (response.error) {
                setLoginError(response.message || "An error occurred during login.");
                console.log("Login error:", response.message); // Debugging line
            } else {
                // Store user information in localStorage
                localStorage.setItem('userInfo', JSON.stringify(response.user));

                if (response.user.role === 'CUSTOMER') {
                    console.log("Login successful, redirecting to customer menu");
                    await router.push('/customer/menu').catch((error) => console.error("Router push error:", error));
                } else if (response.user.role === 'STAFF') {
                    console.log("Login successful, redirecting to staff order");
                    await router.push('/staff/order').catch((error) => console.error("Router push error:", error));
                } else {
                    setLoginError("Invalid user type.");
                }
            }
        } catch (error) {
            console.error("Login error:", error);
            setLoginError("An error occurred during login.");
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <FaArrowLeft className="text-2xl m-5 cursor-pointer text-gray-700" onClick={() => router.back()} />
            <div className="flex flex-col items-center justify-center p-6 space-y-6 bg-white shadow-lg rounded-lg mx-4 md:mx-auto my-10 max-w-md">
                <h1 className="text-3xl font-bold text-gray-800">Login</h1>
                <p className="text-gray-500">Access your account</p>
                {loginError && <p className="text-red-500">{loginError}</p>}
                <div className="w-full space-y-4">
                    <Input variant="filled" className="mb-4" name="email" placeholder="Email" onChange={handleChange} value={formData.email} bg="gray-50" _hover={{ bg: "gray-100" }} focusBorderColor="purple.500" />
                    <Input variant="filled" className="mb-4" name="password" placeholder="Password" type="password" onChange={handleChange} value={formData.password} bg="gray-50" _hover={{ bg: "gray-100" }} focusBorderColor="purple.500" />
                </div>
                <Button colorScheme="purple" size="lg" className="w-full" onClick={handleLogin}>Login</Button>
            </div>
        </div>
    );
}

export default Login;
