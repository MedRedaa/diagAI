import React from 'react'

const FilterOptions = ({keywords,setKeywords}) => {
    const specialities = [
        "Dentist",
        "Heart",
        "Mental",
        "Physco",
        "Physical",
        "Orthodontist",
        "Dinasour",
      ];
      const options = [
        {
          title: "Speciality",
          options: [
            "Dentist",
            "Heart",
            "Mental",
            "Psycho",
            "Physical",
            "Orthodontist",
          ],
          height : 150
        },
        {
          title: "Location",
          options: ["Rabat", "Salé", "Agadir", "Kenitra","Oujda","Meknes","Tanger","Fes"],
          height : 140
        },
        {
          title: "Disease",
          options: ["Fever","Stomach Ache", "Headache","Diarrhea","Skin rash or hives","Sore throat"],
          height : 100
        },
      ];
      const handleChange = (e)=>{
        if (e.target.checked) {
          setKeywords(prev=>([...prev,e.target.name]));
        }
        else {
          setKeywords(prev=>prev.filter(p=>e.target.name!==p));
        }
      }
      
  return (
    <div className="bg-white dark:bg-darkElevation-200 p-3 px-4 rounded-md w-[21vw]">
    <div className="flex justify-between items-center">
      <div className="text-gray-600 dark:text-gray-400 font-medium">Filters</div>
      <div className="text-sm text-black underline dark:text-gray-500">Clear All</div>
    </div>
    {options.map((option,idx) => (
      <div key={idx}>
        <hr className="mt-5 mb-5 dark:border-gray-600" />
        <div>
          <div className="text-sm">{option.title}</div>
          <div className="mt-2">
            <input
              type="text"
              className="border-2 w-full h-[35px] dark:bg-darkElevation-500 dark:text-xs dark:placeholder:text-gray-600 border-none outline-none rounded-md text-sm p-2"
              placeholder={`Search by ${option.title}`}
            />
          </div>
          <div className="mt-4 space-y-2 overflow-y-auto scrollbar" style={{height :` ${option.height}px`}}>
            {option.options.map((name,idx) => (
              <div key={idx} className="flex space-x-2 items-center">
                <div>
                  <input
                    type="checkbox"
                    name={name}
                    onChange={handleChange}
                    className="appearance-none border-2 h-4 w-4 checked:bg-primary dark:checked:bg-darkPrimary"
                  />
                </div>
                <div className="-mt-1 text-sm dark:text-gray-400">{name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ))}
  </div>
  )
}

export default FilterOptions