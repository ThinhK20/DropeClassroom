import { User } from "../../models/User";
import Header from "./header/Header";
import Sidebar from "./side3/Sidebar";

export default function Home() {

   const user: User = {
      fullName: 'Minh An',
   }

   return (
      <div>
         <Header fullName={user.fullName}/>

         <div>
            <Sidebar />
         </div>

      </div>
   );
}
