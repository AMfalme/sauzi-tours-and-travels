import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "./firebase";
import { collection, doc, getDoc, getDocs, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

export type User = {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  phone: string;
  location: string;
  bio: string;
};

export type UserRecord = User & {
  createdAt?: string | null;
  updatedAt?: string | null;
};

function normalizeText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

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
  } catch (error: unknown) {
    const firebaseError = error as { code?: string; message?: string };
    let message = "Login failed";

    if (firebaseError.code === "auth/user-not-found") {
      message = "No account found for that email address.";
    } else if (firebaseError.code === "auth/wrong-password") {
      message = "The password is incorrect. Please try again.";
    } else if (firebaseError.code === "auth/invalid-email") {
      message = "Please enter a valid email address.";
    } else if (firebaseError.code === "auth/invalid-credential") {
      message = "Invalid login credentials. Please check your email and password.";
    } else if (firebaseError.code === "auth/too-many-requests") {
      message = "Too many failed login attempts. Please wait a minute and try again.";
    } else {
      message = "Unable to sign in right now. Please try again later.";
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
      phone: "",
      location: "",
      bio: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return {
      success: true,
      message: "Account created successfully",
      user: userCredential.user,
    };
  } catch (error: unknown) {
    const firebaseError = error as { code?: string; message?: string };
    let message = "Signup failed";

    if (firebaseError.code === "auth/email-already-in-use") {
      message = "Email is already registered";
    } else if (firebaseError.code === "auth/weak-password") {
      message = "Password is too weak (min 6 characters)";
    } else if (firebaseError.code === "auth/invalid-email") {
      message = "Invalid email address";
    } else if (firebaseError.code === "auth/operation-not-allowed") {
      message = "Account creation is disabled";
    } else if (firebaseError.message) {
      message = firebaseError.message;
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

export async function forgotPassword(email: string): Promise<{ success: boolean; message: string }> {
  try {
    await sendPasswordResetEmail(auth, email);
    return {
      success: true,
      message: "Password reset email sent. Please check your inbox.",
    };
  } catch (error: unknown) {
    const firebaseError = error as { code?: string; message?: string };
    let message = "Failed to send password reset email";

    if (firebaseError.code === "auth/user-not-found") {
      message = "No account found for that email address.";
    } else if (firebaseError.code === "auth/invalid-email") {
      message = "Please enter a valid email address.";
    } else if (firebaseError.code === "auth/too-many-requests") {
      message = "Too many requests. Please wait a minute and try again.";
    } else {
      message = firebaseError.message?firebaseError.message:'';
    }

    return { success: false, message };
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
        phone: normalizeText(userData.phone),
        location: normalizeText(userData.location),
        bio: normalizeText(userData.bio),
      };
    } else {
      // Return basic user info if no Firestore doc exists
      return {
        id: firebaseUser.uid,
        name: firebaseUser.displayName || "User",
        email: firebaseUser.email || "",
        role: "user",
        phone: "",
        location: "",
        bio: "",
      };
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return {
      id: firebaseUser.uid,
      name: firebaseUser.displayName || "User",
      email: firebaseUser.email || "",
      role: "user",
      phone: "",
      location: "",
      bio: "",
    };
  }
}

export async function getUserByUid(uid: string): Promise<User | null> {
  try {
    const userDocRef = doc(db, "users", uid);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
      return null;
    }

    const userData = userDocSnap.data();
    return {
      id: uid,
      name: userData.name || "User",
      email: userData.email || "",
      role: userData.role || "user",
      phone: normalizeText(userData.phone),
      location: normalizeText(userData.location),
      bio: normalizeText(userData.bio),
    };
  } catch (error) {
    console.error("Error fetching user by uid:", error);
    return null;
  }
}

export async function getAllUsers(): Promise<UserRecord[]> {
  try {
    const usersSnap = await getDocs(collection(db, "users"));

    return usersSnap.docs.map((userDoc) => {
      const userData = userDoc.data();

      return {
        id: userDoc.id,
        name: userData.name || "User",
        email: userData.email || "",
        role: userData.role || "user",
        phone: normalizeText(userData.phone),
        location: normalizeText(userData.location),
        bio: normalizeText(userData.bio),
        createdAt: userData.createdAt?.toDate?.()?.toISOString?.() ?? null,
        updatedAt: userData.updatedAt?.toDate?.()?.toISOString?.() ?? null,
      };
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}

export async function updateCurrentUserProfileDetails(input: {
  name: string;
  phone: string;
  location: string;
  bio: string;
}): Promise<{ success: boolean; message: string; user?: User }> {
  const firebaseUser = auth.currentUser;
  if (!firebaseUser) {
    return { success: false, message: "You must be logged in to update your profile." };
  }

  const normalizedName = input.name.trim();
  const normalizedPhone = input.phone.trim();
  const normalizedLocation = input.location.trim();
  const normalizedBio = input.bio.trim();

  if (!normalizedName) {
    return { success: false, message: "Name is required." };
  }

  try {
    await updateProfile(firebaseUser, { displayName: normalizedName });

    const userDocRef = doc(db, "users", firebaseUser.uid);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      await updateDoc(userDocRef, {
        name: normalizedName,
        phone: normalizedPhone,
        location: normalizedLocation,
        bio: normalizedBio,
        updatedAt: serverTimestamp(),
      });
    } else {
      await setDoc(userDocRef, {
        uid: firebaseUser.uid,
        name: normalizedName,
        email: firebaseUser.email || "",
        role: "user",
        phone: normalizedPhone,
        location: normalizedLocation,
        bio: normalizedBio,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }

    const refreshedUser = await getCurrentUser();

    return {
      success: true,
      message: "Profile updated successfully.",
      user: refreshedUser ?? {
        id: firebaseUser.uid,
        name: normalizedName,
        email: firebaseUser.email || "",
        role: "user",
        phone: normalizedPhone,
        location: normalizedLocation,
        bio: normalizedBio,
      },
    };
  } catch (error) {
    console.error("Error updating profile:", error);
    return { success: false, message: "Failed to update profile." };
  }
}

export async function updateCurrentUserProfileName(
  name: string
): Promise<{ success: boolean; message: string; user?: User }> {
  const current = await getCurrentUser();

  return updateCurrentUserProfileDetails({
    name,
    phone: current?.phone || "",
    location: current?.location || "",
    bio: current?.bio || "",
  });
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
