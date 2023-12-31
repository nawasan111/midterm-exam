import { signInWithPopup, getAuth, signOut } from "firebase/auth";
import { googleProvider } from "../assets/js/firebase";
import StorageLocal from "../assets/js/localStorage";

export interface HomeProps {
  uid: string;
  setUid: Function;
  uname: {
    set: Function;
    value: string;
  };
}

function Home({ uid, setUid, uname }: HomeProps) {
  const prefs = new StorageLocal();
  const getLogin = async () => {
    const auth = getAuth();
    const data = await signInWithPopup(auth, googleProvider);
    setUid(data.user.uid);
    uname.set(data.user.displayName);
  };
  const getLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
  };
  return (
    <div>
      {uid.length ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "60vh",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="text-center"
        >
          <h3>คุณเข้าสู่ระบบในชื่อ {uname.value}</h3>
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
              className="me-2"
              src="/google.png"
              alt="google logo"
            />
           ออกจากระบบ 
          </button>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "60vh",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="text-center"
        >
          <h3>กรุณาเข้าสู่ระบบเพื่อการใช้งานเว็บไซต์</h3>
          <div className="text-center">
            <button
              className="btn my-2"
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
              เข้าสู่ระบบ
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
