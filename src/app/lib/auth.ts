import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from "firebase/auth";
import { auth } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

export type User = {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
};

export async function loginWithEmail(
  email: string,
  password: string
): Promise<{ success: boolean; message: string; user?: FirebaseUser }> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return {
      success: true,
      message: "Login successful",
      user: userCredential.user,
    };
  } catch (error: any) {
    let message = "Login failed";
    if (error.code === "auth/user-not-found") {
      message = "User not found";
    } else if (error.code === "auth/wrong-password") {
      message = "Incorrect password";
    } else if (error.code === "auth/invalid-email") {
      message = "Invalid email address";
    } else if (error.code === "auth/too-many-requests") {
      message = "Too many login attempts. Please try again later.";
    }
    return { success: false, message };
  }
}

export async function signupWithEmail(
  email: string,
  password: string,
  name: string
): Promise<{ success: boolean; message: string; user?: FirebaseUser }> {
  try {
    // Create user account
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Update profile with name
    await updateProfile(userCredential.user, {
      displayName: name,
    });

    // Create user document in Firestore
    await setDoc(doc(db, "users", userCredential.user.uid), {
      uid: userCredential.user.uid,
      name: name,
      email: email,
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return {
      success: true,
      message: "Account created successfully",
      user: userCredential.user,
    };
  } catch (error: any) {
    let message = "Signup failed";
    if (error.code === "auth/email-already-in-use") {
      message = "Email is already registered";
    } else if (error.code === "auth/weak-password") {
      message = "Password is too weak (min 6 characters)";
    } else if (error.code === "auth/invalid-email") {
      message = "Invalid email address";
    } else if (error.code === "auth/operation-not-allowed") {
      message = "Account creation is disabled";
    }
    return { success: false, message };
  }
}

export async function logoutUser(): Promise<void> {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
}

export function getCurrentUserSync(): FirebaseUser | null {
  return auth.currentUser;
}

export async function getCurrentUser(): Promise<User | null> {
  /**
   * 🔒 Gets the current logged-in user from Firebase
   * and fetches extended user data from Firestore if available.
   */
  const firebaseUser = auth.currentUser;
  if (!firebaseUser) return null;

  try {
    const userDocRef = doc(db, "users", firebaseUser.uid);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      return {
        id: firebaseUser.uid,
        name: userData.name || firebaseUser.displayName || "User",
        email: firebaseUser.email || "",
        role: userData.role || "user",
      };
    } else {
      // Return basic user info if no Firestore doc exists
      return {
        id: firebaseUser.uid,
        name: firebaseUser.displayName || "User",
        email: firebaseUser.email || "",
        role: "user",
      };
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return {
      id: firebaseUser.uid,
      name: firebaseUser.displayName || "User",
      email: firebaseUser.email || "",
      role: "user",
    };
  }
}

export function subscribeToAuthChanges(
  callback: (user: User | null) => void
): () => void {
  return onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      const user = await getCurrentUser();
      callback(user);
    } else {
      callback(null);
    }
  });
}
