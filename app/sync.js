/* ------------------------------------------------------------------ *
 * ILSdoku — sincronització amb Firebase (opcional)
 *
 * Només s'activa si `app/firebase-config.js` té les claus del projecte.
 * Carrega l'SDK de Firebase des del CDN (mòduls ES) i desa el progrés a
 * `users/{uid}` de Firestore. Si el CDN no hi és o falla, el joc continua
 * funcionant amb el progrés local.
 *
 * Model de dades:
 *   users/{uid} = {
 *     nick:      string,
 *     updatedAt: timestamp,
 *     cases: { "<id-del-cas>": { solved, bestMs, hints, submits, at, board } }
 *   }
 * ------------------------------------------------------------------ */

const cfg = window.ILSDOKU_FIREBASE || {};
const configurat = !!(cfg.apiKey && cfg.projectId && cfg.appId);
const SDK = "https://www.gstatic.com/firebasejs/11.6.0/";

function avis(o) {
  if (window.ILSDOKU_SYNC_INFO) window.ILSDOKU_SYNC_INFO(o);
  if (window.ILSDOKU_ACCOUNT) window.ILSDOKU_ACCOUNT.update(o);
}

if (!configurat) {
  /* Sense configuració: el botó explica què cal fer. */
  if (window.ILSDOKU_REGISTER_SYNC) window.ILSDOKU_REGISTER_SYNC({ available: false });
  if (window.ILSDOKU_ACCOUNT) window.ILSDOKU_ACCOUNT.register({ available: false });
} else {
  try {
    const { initializeApp } = await import(SDK + "firebase-app.js");
    const { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } =
      await import(SDK + "firebase-auth.js");
    const { getFirestore, doc, getDoc, setDoc, serverTimestamp } =
      await import(SDK + "firebase-firestore.js");

    const app = initializeApp(cfg);
    const auth = getAuth(app);
    const db = getFirestore(app);
    let uid = null;

    function refUsuari() { return doc(db, "users", uid); }

    function progrésLocal() {
      return window.ILSDOKU_PROGRESS_DATA ? window.ILSDOKU_PROGRESS_DATA() : { cases: {}, player: {} };
    }

    function fusionaRemot(remot) {
      if (!remot) return;
      if (window.ILSDOKU_PROGRESS_MERGE) window.ILSDOKU_PROGRESS_MERGE(remot);
    }

    async function baixa() {
      const snap = await getDoc(refUsuari());
      return snap.exists() ? snap.data() : null;
    }

    async function puja(manual) {
      if (!uid) return;
      const local = progrésLocal();
      /* Baixem primer per no trepitjar el que hagi fet un altre dispositiu. */
      avis({ detail: "sincronitzant…" });
      try {
        const remot = await baixa();
        fusionaRemot(remot);
        const fusionat = progrésLocal();
        await setDoc(refUsuari(), {
          nick: (fusionat.player && fusionat.player.nick) || "",
          cases: fusionat.cases || {},
          updatedAt: serverTimestamp()
        }, { merge: true });
        avis({ signedIn: true, who: auth.currentUser ? auth.currentUser.email : "", detail: "al dia" });
      } catch (e) {
        avis({ detail: "no s'ha pogut sincronitzar" });
        if (manual) alert("No s'ha pogut sincronitzar: " + (e && e.message ? e.message : e));
        console.warn("ILSdoku: error de sincronització", e);
      }
    }

    const API = {
      available: true,
      signedIn: false,
      who: "",
      signIn: async function () {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: "select_account" });
        try {
          await signInWithPopup(auth, provider);
        } catch (e) {
          alert("No s'ha pogut iniciar la sessió: " + (e && e.message ? e.message : e));
        }
      },
      signOut: function () { signOut(auth); },
      push: function (manual) { puja(manual); }
    };
    if (window.ILSDOKU_REGISTER_SYNC) window.ILSDOKU_REGISTER_SYNC(API);
    if (window.ILSDOKU_ACCOUNT) window.ILSDOKU_ACCOUNT.register(API);

    onAuthStateChanged(auth, async function (user) {
      uid = user ? user.uid : null;
      if (!user) {
        avis({ signedIn: false, who: "", detail: "" });
        return;
      }
      avis({ signedIn: true, who: user.email || user.displayName || "", detail: "connectat" });
      await puja(false);
    });

    avis({ configured: true });
  } catch (e) {
    /* Sense xarxa o CDN bloquejat: seguim en local */
    if (window.ILSDOKU_REGISTER_SYNC) window.ILSDOKU_REGISTER_SYNC({ available: false });
    console.warn("ILSdoku: Firebase no disponible", e);
  }
}
