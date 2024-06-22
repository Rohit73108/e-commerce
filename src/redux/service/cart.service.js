import { collection,addDoc ,query, getDocs,deleteDoc ,updateDoc,doc} from "firebase/firestore";
import { db } from "../../firebase.config";
import { defaultValue } from "../reducer/cart.reducer";

export const getCartToFirebase = async()=>{
   
    const q =   query(collection(db, "cart"))
    const querySnapshot = await getDocs(q);

    let currentCartId =  localStorage.getItem('current_cart_id')
    let currentCartObject = defaultValue

        querySnapshot.forEach((doc) => {
       if(doc.id === currentCartId){
          currentCartObject = doc.data();
       } 
 }); 

        return(currentCartObject)
   
}
   export const addCartToFirebase = async(payload)=>{
    
       let currentCartId =  localStorage.getItem('current_cart_id')
   if(currentCartId){
     const cartRef = doc(db, "cart",currentCartId);
    await updateDoc(cartRef,payload);
    console.log("Document updated with ID: ", cartRef.id);
   }else{
     const cartRef = await addDoc(collection(db, "cart"), payload);
        console.log("Document written with ID: ", cartRef.id);
        localStorage.setItem('current_cart_id' , cartRef.id)
   }
 }
 
 