import { useContext, useState } from "react";
import { ShieldCheck, Smartphone, Lock, X } from "lucide-react";
import { updatePassword } from "../redux/action";
import { Theme } from "../Contexts/Theme";
import { useDispatch,useSelector } from "react-redux";




const Updatepass = () => {
  const {theme,setTheme} =useContext(Theme)
  const [open2FA, setOpen2FA] = useState(false);
  const [openDevice, setOpenDevice] = useState(false);
  const [passopen, setPassopen] = useState(false);
  const [updatedpass, setUpdatedpass] = useState("");
  const [confirmpass, setConfirmpass] = useState("");
  console.log(17,updatedpass);

  console.log(passopen);

 
  const dispatch = useDispatch();

  const handelpassopen = ()=>{
    
    setPassopen((prev)=>!prev)
  }


  const passupdate = (e)=>{
    e.preventDefault()
    if (confirmpass!==updatedpass) {
      alert("Password is not matching with confirm password")
     
    }else{
      try {
    
     
        dispatch(updatePassword(updatedpass))
    } catch (error) {
        alert(error)
        
    }finally{
        setUpdatedpass("")
        setPassopen(false)
        setConfirmpass("")
        

    }
    }

   

   
  }



  return (
<div
className={`w-[100%] 2xl:h-[85%] xl:h-[80%] h-[78%] flex flex-col ${theme === "dark" ? "bg-gray-900 text-gray-300" : "bg-white text-gray-800"
  }`}
>


<main className="w-full h-full flex flex-col overflow-y-scroll">

  <section className="w-full p-2 py-4 px-2 h-[200px]">
    <div className="mx-auto px-[20px] gap-2 flex flex-col">
    <div className="relative overflow-hidden  rounded-xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-700 shadow-2xl">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:40px_40px]"></div>

      <div className="flex flex-col gap-4 text-center md:text-left max-w-2xl">
        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
          Security Settings
        </h1>
        <p className="text-sm md:text-base text-gray-200 leading-relaxed">
          Protect your account with advanced security features including
          two-factor authentication, password controls, and device management.
        </p>
      </div>

      <ShieldCheck className="w-24 h-24 text-indigo-300 drop-shadow-lg" />
    </div>

    {/* Change Password */}
    <div className={`flex flex-col md:flex-row justify-between items-center gap-6 border border-gray-200 rounded-2xl ${theme==="dark"?"bg-gray-900 text-white":"bg-white text-gray-900"}  shadow-lg p-6 hover:shadow-xl transition`}>
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold z-30 flex items-center gap-2">
          <Lock className="w-5 h-5 text-indigo-600" />
          Change Password
        </h2>
        <p className="text-sm">
          Update your password regularly to keep your account secure.
        </p>
      </div>
      <button onClick={handelpassopen} className="px-4 py-2 z-30 bg-violet-600 text-white rounded-lg shadow hover:bg-violet-700 transition">
        Update Password
      </button>
    </div>

    {/* Two-Factor Authentication */}
    <div className={`flex flex-col md:flex-row justify-between items-center gap-6 border border-gray-200 rounded-2xl ${theme==="dark"?"bg-gray-900 text-white":"bg-white text-gray-900"} shadow-lg p-6 hover:shadow-xl transition`}>
     
    {passopen && (
      <form onSubmit={(e)=>{passupdate(e)}} className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div className={`${theme==="dark"?"bg-gray-900 text-white":"bg-white text-gray-900"} rounded-2xl shadow-2xl p-6 w-[90%] md:w-[400px] relative`}>
          <button
            onClick={handelpassopen}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          >
            <X />
          </button>
          <h2 className="text-lg font-bold mb-4">Update Password</h2>
          <p className="text-sm text-gray-600 mb-4">
             Enter your updated password
            below to update your password.
          </p>
          <input required onChange={(e)=>{setUpdatedpass(e.target.value)}}
            type="text"
            value={updatedpass}
            placeholder="Enter Updated pass"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
          />
          <input required onChange={(e)=>{setConfirmpass(e.target.value)}}
            type="text"
            value={confirmpass}
            placeholder="Confirm pass"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
          />
          <button type="submit" className="w-full py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition">
            Confirm
          </button>
        </div>
      </form>
    )}
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold  flex items-center gap-2">
          <Smartphone className="w-5 h-5 text-indigo-600" />
          Two-Factor Authentication (2FA)
        </h2>
        <p className="text-sm ">
          Add an extra layer of security by requiring a code when you sign in.
        </p>
      </div>
      <button
        onClick={() => setOpen2FA(true)}
        className="px-4 py-2 bg-violet-600 text-white rounded-lg shadow hover:bg-violet-700 transition"
      >
        Enable 2FA
      </button>

    </div>
    </div>
  </section>

  <section className="w-full flex flex-col sm:flex-col gap-[20px] mt-[20px] sm:min-h-[600px] 2xl:h-[780px] sm:h-[600px] px-[2px] sm:px-[20px]">
 

   
    

   
  </section>
</main>


</div>
  );
};

export default Updatepass;



