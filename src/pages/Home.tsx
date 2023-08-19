import { signInWithPopup, getAuth, signOut } from "firebase/auth";
import { googleProvider } from "../assets/js/firebase";
import StorageLocal from "../assets/js/localStorage";

export interface HomeProps {
  uid: string;
  setUid: Function;
}

function Home({ uid, setUid }: HomeProps) {
  const prefs = new StorageLocal();
  const getLogin = async () => {
    const auth = getAuth();
    const data = await signInWithPopup(auth, googleProvider);
    setUid(data.user.uid);
  };
  const getLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
  };
  return (
    <div>
      {uid.length ? (
        <div>
          <button
            style={{
              borderColor: prefs.prefs.color.primary,
              borderWidth: "2px",
              borderStyle: "solid",
            }}
            className="btn "
            onClick={getLogout}
          >
            <img
              width={30}
              className="me-3"
              src="/google.png"
              alt="google logo"
            />
            logout
          </button>
        </div>
      ) : (
        <div>
          <div>
            กรุณาเข้าสู่ระบบเพื่อการใช้การเว็บไซต์ได้อย่างเต็มประสิทธิภาพ
          </div>
          <button
            className="btn "
            style={{
              borderColor: prefs.prefs.color.primary,
              borderWidth: "2px",
              borderStyle: "solid",
            }}
            onClick={getLogin}
          >
            <img
              width={30}
              className="me-3"
              src="/google.png"
              alt="google logo"
            />
            login
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
