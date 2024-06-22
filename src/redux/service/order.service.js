import { collection,addDoc ,query, getDocs} from "firebase/firestore";
import { db } from "../../firebase.config";
 

export const getOrderToFirebase = async()=>{
   
  let orders = [];
  const q = query(collection(db, "orders"))
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
      let order =   doc.data();
      order.id =  doc.id;
      orders.push(order)
}); 
      return orders
   
}
   export const palceOrderToFirebase = async(payload)=>{
  
    const orderRef = await addDoc(collection(db, "orders"), payload);
        console.log("Document written with ID: ", orderRef.id);
        localStorage.removeItem('current_cart_id')
        localStorage.removeItem('cart')
   
 }
 
 