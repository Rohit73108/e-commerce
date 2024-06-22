import { collection,addDoc ,query, getDocs,deleteDoc ,updateDoc,doc} from "firebase/firestore";
import { db } from "../../firebase.config";

export const getUserToFirebase = async()=>{
    let users = [];
    const q = query(collection(db, "users"))
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        let user =   doc.data();
        user.id =  doc.id;
        users.push(user)
 }); 
        return users
   
}
   export const addUserToFirebase = async(payload)=>{
    try {
        const userRef = await addDoc(collection(db, "users"), payload);
        console.log("Document written with ID: ", userRef.id);
    } catch (error) {
        console.error("Error adding user to Firestore: ", error);
        throw error;
    }
 }

 export const deleteUserFromFirebase = async({id})=>{
   return await deleteDoc(doc(db, "users", id));
 }

export const updateUserFromFirebase = async(user)=>{
    const userRef = doc(db, "users",user.id);
    await updateDoc(userRef,user);
}