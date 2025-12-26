import { useState } from "react";


export default function AccountPrompt() {
const [showAccountPrompt, setShowAccountPrompt] = useState(true);


    return (
        <div>
            {showAccountPrompt && (
                <div className="mt-4 p-4 bg-blue-50 border border-blue-300 rounded-xl text-center">
                    <p className="mb-2">Your request has been sent! 🎉</p>
                    <p className="mb-4">Want to create an account to track this request and manage future trips?</p>
                    <div className="flex justify-center gap-4">
                    <button
                        onClick={() => { /* redirect to signup */ }}
                        className="bg-blue-600 text-white rounded-xl px-4 py-2"
                    >
                        Yes, Create Account
                    </button>
                    <button
                        onClick={() => setShowAccountPrompt(false)}
                        className="border border-gray-400 rounded-xl px-4 py-2"
                    >
                        Maybe Later
                    </button>
                    </div>
                </div>
         )}
        </div>
    )
}