"use client";
import { useState } from "react";


export default function Page() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const validEmail = /[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]/.test(email);
    const lengthGreater = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialCharacter = /[!@#$%^&*(){}_+:"<>?]/.test(password);

    const isValid =
        lengthGreater &&
        lengthGreater &&
        hasUpperCase &&
        hasLowerCase &&
        hasNumber &&
        hasSpecialCharacter &&
        validEmail;

    console.log("here: ", { email, password });

    function Submit() {
        fetch("http://localhost:4000/Auth/SignUp", {
            method: "POST",
            body: JSON.stringify({
                email,
                password,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => {
            if (res.ok) {
                console.log("Success");
                console.log("Success");
            } else {
                console.log("Error");
                console.log("Error");
            }
        });
    }

    return (
        <div className=" vh-100% mx-auto">
            <div className="w-[250px] border-[1px] border-slate-50 rounded-md shadow p-4">
                <div> LOGIN</div>

                {/* <Mail />
                <Lock /> */}
                <input></input>
                <div className="text-red"> forget password?</div>


            </div>

        </div>
    );
}
