import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import './App.css'
import Navbar from './components/Navbar'
import { FaEdit } from "react-icons/fa";
import { TiPin } from "react-icons/ti";
import { MdDeleteSweep } from "react-icons/md";


function App() {

  const [Errand, setErrand] = useState("")
  const [HoldErrand, setHoldErrand] = useState([])

  const [Showfinished, setShowfinished] = useState([])





  useEffect(() => {
      let todoContent = localStorage.getItem("HoldErrand")

      if(todoContent){

        try{

          let Errands = JSON.parse(localStorage.getItem("HoldErrand"))
          setHoldErrand(Errands)
        }catch(error){
          console.error("Error parsing LocalStorage Data", error);
          
        }
        
      }
    },[])  

    
        useEffect(() => {
          if (HoldErrand.length) {
            localStorage.setItem("HoldErrand", JSON.stringify(HoldErrand))
            
          }
        
          
        }, [HoldErrand])


        const toggelFinished =  (e) => {
              setShowfinished (!Showfinished)
        }
        




  const handleEdit = (e, itemsId) => {
    
    let anotherErrandVariable = HoldErrand.filter(items=>items.id === itemsId)
      setErrand(anotherErrandVariable[0].Errand)

      let newErrand = HoldErrand.filter(item=> item.id !== itemsId);
      setHoldErrand(newErrand)
  }


  const handleDelete = (e, itemId) => {
    let newErrand = HoldErrand.filter(item=> item.id !== itemId);
    setHoldErrand(newErrand)

    localStorage.setItem("HoldErrand", JSON.stringify(newErrand))

  }




  const handleChange = (e) => {
    setErrand(e.target.value)

  }



  const handleAdd = () => {

    if (Errand.trim() === "") {

      alert("The Input Field is required")

      return;
      
    }



    setHoldErrand([...HoldErrand, { id: uuidv4(), Errand, isCompleted: false }])
    setErrand("")

  }


  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = HoldErrand.findIndex(item => item.id === id)

    let newErrand = [...HoldErrand];
    newErrand[index].isCompleted = !newErrand[index].isCompleted;
    setHoldErrand(newErrand)

  }



  return  (
    <>
      <Navbar />
      <div className="container mx-auto bg-violet-200 my-8 p-4 rounded-lg w-full md:w-10/12 lg:w-8/12">
  <h1 className="text-xl md:text-2xl font-bold">
    Errands - <span className="text-sm md:text-base font-medium">Run Your Errand But Save Them Also!</span>
  </h1>
  <div className="add-errand my-5">
    <h2 className="text-lg md:text-xl font-bold my-4">What's today's Errand?</h2>
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <input
        required={true}
        onChange={handleChange}
        value={Errand}
        type="text"
        placeholder="Got any errands for the day?"
        className="w-full sm:w-80 lg:w-96 px-4 py-2 rounded-md"
      />
      <button
        onClick={handleAdd}
        className="btn bg-violet-800 hover:bg-violet-950 text-white py-2 px-5 rounded-md flex items-center justify-center text-lg md:text-xl lg:text-2xl font-bold"
      >
        <TiPin />
      </button>
    </div>
  </div>
  <div className="flex items-center gap-2 mb-4">
    <input onChange={toggelFinished} type="checkbox" checked={Showfinished} />
    <label className="text-sm md:text-base font-medium">Show Finished</label>
  </div>
  <div>
    <h2 className="text-lg md:text-xl font-bold">Your Errands</h2>
  </div>
  {HoldErrand.length === 0 && (
    <div className="text-sm md:text-md font-medium mx-3 my-2">No Errands Today? Interesting.</div>
  )}
  {HoldErrand.map(
    (item) =>
      (Showfinished || !item.isCompleted) && (
        <div
          key={item.id}
          className="parentElement flex flex-col sm:flex-row justify-between my-4 items-start sm:items-center gap-4"
        >
          <input
            name={item.id}
            onChange={handleCheckbox}
            type="checkbox"
            checked={item.isCompleted}
            className="w-6 h-6"
          />
          <div className="errand flex-grow font-bold text-base md:text-lg lg:text-xl mx-2">
            <div className={item.isCompleted ? "line-through" : ""}>{item.Errand}</div>
          </div>
          <div className="button flex gap-2">
            <button
              disabled={item.isCompleted}
              onClick={(e) => handleEdit(e, item.id)}
              className="button-edit bg-violet-800 hover:bg-violet-950 text-white py-2 px-3 rounded-md text-sm md:text-base font-bold flex items-center"
            >
              <FaEdit />
            </button>
            <button
              disabled={item.isCompleted}
              onClick={(e) => {
                handleDelete(e, item.id);
              }}
              className="button-delete bg-violet-800 hover:bg-violet-950 text-white py-2 px-3 rounded-md text-sm md:text-base font-bold flex items-center"
            >
              <MdDeleteSweep />
            </button>
          </div>
        </div>
      )
  )}
</div>


    </>
  )
}

export default App