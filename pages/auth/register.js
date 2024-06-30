import React, { useState } from "react";
import { useRouter } from "next/router";
import { Input, Button, Radio, RadioGroup, Stack, InputGroup, InputRightElement } from '@chakra-ui/react';
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import { register } from "@/operations/auth.fetch";

function Register() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        role: 'CUSTOMER',
    });
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleRegister = async () => {
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        const res = await register({ email: formData.email, password: formData.password, name: formData.name, role: formData.role });
        if (res.status === 200) {
            alert('Registration successful');
            router.push('/login');
        } else {
            alert(res.message);
        }
    };

    const handlePasswordVisibility = () => setShowPassword(!showPassword);
    const handleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <FaArrowLeft className="text-2xl m-5 cursor-pointer text-gray-700" onClick={() => router.back()} />
            <div className="flex flex-col items-center justify-center p-6 space-y-6 bg-white shadow-lg rounded-lg mx-4 md:mx-auto my-10 max-w-md">
                <h1 className="text-3xl font-bold text-gray-800">Register</h1>
                <p className="text-gray-500">Create Account to start ordering Deliciouzzz Dishes</p>
                <div className="w-full space-y-4">
                    <Input variant="filled" className="mb-0" name="name" placeholder="Name" onChange={handleChange} value={formData.name} bg="gray-50" _hover={{ bg: "gray-100" }} focusBorderColor="purple.500" />
                    <Input variant="filled" className="mb-4" name="email" placeholder="Email" onChange={handleChange} value={formData.email} bg="gray-50" _hover={{ bg: "gray-100" }} focusBorderColor="purple.500" />
                    <InputGroup>
                        <Input
                            name="password"
                            placeholder="Password"
                            type={showPassword ? "text" : "password"}
                            onChange={handleChange}
                            value={formData.password}
                            bg="gray-50" _hover={{ bg: "gray-100" }} focusBorderColor="purple.500"
                        />
                        <InputRightElement onClick={handlePasswordVisibility}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </InputRightElement>
                    </InputGroup>
                    <InputGroup>
                        <Input
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            type={showConfirmPassword ? "text" : "password"}
                            onChange={handleChange}
                            value={formData.confirmPassword}
                            bg="gray-50" _hover={{ bg: "gray-100" }} focusBorderColor="purple.500"
                        />
                        <InputRightElement onClick={handleConfirmPasswordVisibility}>
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </InputRightElement>
                    </InputGroup>
                    <RadioGroup onChange={value => setFormData(prev => ({ ...prev, role: value.toUpperCase() }))} value={formData.role}>
                        <Stack direction="row" mb="4">
                            <Radio value="CUSTOMER">Customer</Radio>
                            <Radio value="STAFF">Staff</Radio>
                        </Stack>
                    </RadioGroup>
                </div>
                <Button colorScheme="purple" size="lg" className="w-full" onClick={handleRegister}>Register</Button>
            </div>
        </div>
    );
}

export default Register;