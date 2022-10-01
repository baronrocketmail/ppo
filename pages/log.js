import Nav from "./components/Nav";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, onSnapshot, addDoc, deleteDoc, doc, getDocs , query, where} from "firebase/firestore"

export async function getStaticProps() {
    // fetch unpaid payments and return as unpaid
    const firebaseConfig = {
        apiKey: "AIzaSyDPGmgTxlAsVkakZrGbs8NTF2r0RcWu_ig",
        authDomain: "luminous-lambda-364207.firebaseapp.com",
        projectId: "luminous-lambda-364207",
        storageBucket: "luminous-lambda-364207.appspot.com",
        messagingSenderId: "518969290682",
        appId: "1:518969290682:web:d7be744cb378ec83d4f783"
    };
    const app = initializeApp(firebaseConfig);
    const firestore = getFirestore()
    const colRef = collection(firestore,'units/10144-boca-entrada/payments')
    const q = query(colRef, where("status", "==", "unpaid"))
    let unpaid = [];
    await getDocs(q).then(snapshot => {
        snapshot.docs.forEach(doc => {
            unpaid.push({...doc.data(), id: doc.id});
        })
    })
    const q2 = query(colRef, where("status", "!=", "unpaid"))
    let notUnpaid = [];
    await getDocs(q2).then(snapshot => {
        snapshot.docs.forEach(doc => {
            notUnpaid.push({...doc.data(), id: doc.id});
        })
    })
    return {
        props: { unpaid, notUnpaid}
    }
}

export default function Log(props) {

    // create 2D array, push address and autopay
    let elements = [["<-----", "/", "title"], ["","/autopay","autopay"]]
    // push unpaid payments
    for (let i in props.unpaid) {
        elements.push([" ", props.unpaid[i].url, "unpaid"])
    }
    // push log
    elements.push(["...", "/", "log"])
    console.log("s")
    console.log(props.notUnpaid)
    console.log(props.unpaid)

    let table = []

    for (let i in props.notUnpaid) {
        table.push(<tr><td>{props.notUnpaid[i].name}</td> <td>{props.notUnpaid[i].amount}</td> <td>{props.notUnpaid[i].status}</td></tr>);
    }

    return (
        <div>


            <Nav elements = {elements}/>
            <table>{table}</table>
        </div>
    )
}