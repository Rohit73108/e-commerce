import { collection,addDoc ,query, getDocs,deleteDoc ,updateDoc,doc} from "firebase/firestore";
import { db } from "../../firebase.config";

export const getCategoryToFirebase = async()=>{
    let categories = [];
    const q = query(collection(db, "categories"))
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        let category =   doc.data();
        category.id =  doc.id;
        categories.push(category)
 }); 
        return categories
   
}
   export const addCategoryToFirebase = async(payload)=>{
    try {
        const categoryRef = await addDoc(collection(db, "categories"), payload);
        console.log("Document written with ID: ", categoryRef.id);
    } catch (error) {
        console.error("Error adding category to Firestore: ", error);
        throw error;
    }
 }

 export const deleteCategoryFromFirebase = async({id})=>{
   return await deleteDoc(doc(db, "categories", id));
 }

export const updateCategoryFromFirebase = async(category)=>{
    const categoryRef = doc(db, "categories",category.id);
    await updateDoc(categoryRef,category);
}