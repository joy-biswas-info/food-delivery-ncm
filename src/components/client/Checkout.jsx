// /src/components/client/Checkout.jsx
import { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { auth, db, setupRecaptcha } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";
import {
  signInWithPhoneNumber,
  updateProfile,
  onAuthStateChanged,
  PhoneAuthProvider,
  signInWithCredential,
} from "firebase/auth";

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [verificationId, setVerificationId] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [user, setUser] = useState(null);

  // Keep user logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        console.log("User logged in:", currentUser.displayName || currentUser.phoneNumber);
      }
    });
    return () => unsubscribe();
  }, []);

  // Step 1: Send OTP
  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (!phone) return alert("Enter a valid phone number.");

    try {
      const appVerifier = setupRecaptcha("recaptcha-container");
      const confirmation = await signInWithPhoneNumber(auth, phone, appVerifier);
      setVerificationId(confirmation.verificationId);
      setStep(2);
    } catch (err) {
      alert("Failed to send verification code: " + err.message);
    }
  };

  // Step 2: Verify OTP and place order
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    console.log(cart);

    if (!otp) return alert("Enter OTP code.");

    try {
      const credential = PhoneAuthProvider.credential(verificationId, otp);
      await signInWithCredential(auth, credential);

      // Update display name for new user
      if (name && !auth.currentUser.displayName) {
        await updateProfile(auth.currentUser, { displayName: name });
      }

      // Place order in Firestore
      await addDoc(collection(db, "orders"), {
        userId: auth.currentUser.uid,
        name: auth.currentUser.displayName,
        phone: auth.currentUser.phoneNumber,
        cart,
        createdAt: new Date(),
      });

      clearCart();
      alert("Order placed successfully!");
      setStep(1);
      setName("");
      setPhone("");
      setOtp("");
    } catch (err) {
      alert("Verification failed: " + err.message);
    }
  };

  return (
    <div className="p-6 border rounded mt-6 max-w-md mx-auto bg-white shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Checkout</h2>

      {!user && step === 1 && (
        <form onSubmit={handleSendOTP} className="space-y-4">
          <input
            name="name"
            placeholder="Your name"
            className="border p-2 w-full rounded"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            name="phone"
            placeholder="+1234567890"
            className="border p-2 w-full rounded"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <div id="recaptcha-container"></div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Send Verification Code
          </button>
        </form>
      )}

      {!user && step === 2 && (
        <form onSubmit={handleVerifyOTP} className="space-y-4">
          <input
            name="otp"
            placeholder="Enter OTP"
            className="border p-2 w-full rounded"
            required
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
          >
            Verify & Place Order
          </button>
        </form>
      )}

      {user && (
        <div className="text-center space-y-2">
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
            Place Order
          </button>
        </div>
      )}
    </div>
  );
}
