import { collection,addDoc ,query, getDocs,deleteDoc ,updateDoc,doc} from "firebase/firestore";
import { db } from "../../firebase.config";

export const getProductToFirebase = async()=>{
    let products = [];
    const q = query(collection(db, "products"))
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        let product =   doc.data();
        product.id =  doc.id;
        products.push(product)
 }); 
        return products
   
}
   export const addProductToFirebase = async(payload)=>{
    try {
        const productRef = await addDoc(collection(db, "products"), payload);
        // console.log("Document written with ID: ", productRef.id);
    } catch (error) {
        console.error("Error adding product to Firestore: ", error);
        throw error;
    }
 }

 export const deleteProductFromFirebase = async({id})=>{
   return await deleteDoc(doc(db, "products", id));
 }

export const updateProductFromFirebase = async(product)=>{
    const productRef = doc(db, "products",product.id);
    await updateDoc(productRef,product);
}