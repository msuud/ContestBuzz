import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  updateEmail,
  updatePassword,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";

export const loginWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    throw mapFirebaseError(error);
  }
};

export const registerWithEmail = async (email, password, displayName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(userCredential.user, {
      displayName: displayName,
    });

    await sendEmailVerification(userCredential.user);

    return userCredential.user;
  } catch (error) {
    throw mapFirebaseError(error);
  }
};

export const loginWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    return userCredential.user;
  } catch (error) {
    throw mapFirebaseError(error);
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    throw mapFirebaseError(error);
  }
};

export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return true;
  } catch (error) {
    throw mapFirebaseError(error);
  }
};

export const updateUserProfile = async (displayName, photoURL = null) => {
  try {
    const user = auth.currentUser;

    if (!user) {
      throw new Error("No user is currently logged in");
    }

    await updateProfile(user, {
      displayName: displayName,
      photoURL: photoURL,
    });

    return true;
  } catch (error) {
    throw mapFirebaseError(error);
  }
};

export const updateUserEmail = async (newEmail) => {
  try {
    const user = auth.currentUser;

    if (!user) {
      throw new Error("No user is currently logged in");
    }

    await updateEmail(user, newEmail);

    return true;
  } catch (error) {
    throw mapFirebaseError(error);
  }
};

export const updateUserPassword = async (newPassword) => {
  try {
    const user = auth.currentUser;

    if (!user) {
      throw new Error("No user is currently logged in");
    }

    await updatePassword(user, newPassword);

    return true;
  } catch (error) {
    throw mapFirebaseError(error);
  }
};

const mapFirebaseError = (error) => {
  const errorMessages = {
    "auth/user-not-found": "No user found with this email address",
    "auth/wrong-password": "Invalid password",
    "auth/email-already-in-use": "Email address is already in use",
    "auth/weak-password": "Password should be at least 6 characters",
    "auth/invalid-email": "Invalid email address",
    "auth/user-disabled": "This account has been disabled",
    "auth/requires-recent-login": "Please log in again to perform this action",
    "auth/popup-closed-by-user": "Login canceled. Please try again",
    "auth/unauthorized-domain":
      "This domain is not authorized for Google authentication",
  };

  const errorCode = error.code;
  const errorMessage =
    errorMessages[errorCode] || error.message || "An unknown error occurred";

  return {
    code: errorCode,
    message: errorMessage,
  };
};

export default {
  loginWithEmail,
  registerWithEmail,
  loginWithGoogle,
  logout,
  resetPassword,
  updateUserProfile,
  updateUserEmail,
  updateUserPassword,
};
