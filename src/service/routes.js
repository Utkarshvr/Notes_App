export const host =
  process.env.REACT_APP_HOST || `http://localhost:8800/api/v1`;
// export const host = `https://keepnotes-api-v2.onrender.com/api/v1`;

// Auth Routes
export const signupRoute = `${host}/auth/register`;
export const loginRoute = `${host}/auth/login`;
export const logoutRoute = `${host}/auth/logout`;

// User Routes
export const userRoute = `${host}/user`;

// Notes Route
export const notesRoute = `${host}/notes`; // if used without providing id, then all notes will be fetched
