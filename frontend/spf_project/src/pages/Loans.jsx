// import React, { useState, useEffect } from "react";

// import SearchBar from "../SearchBar";
// import BorrowersTable from "../BorrowersTable";
// import AddLoan from "../AddLoan"
// import ActiveButton from "../ActiveButton";
// import InactiveButton from "../InactiveButton";
// import UploadButton from "../UploadButton";
// import DownloadButton from "../DownloadButton";
// import "bootstrap/dist/css/bootstrap.min.css";
// import OverDue from "../OverDue";
// import AppPagination from "../AppPagination";





// function Loans() {
// const [loans, setLoans] = useState([]);

// const [refresh, setRefresh] = useState(false);

// const refreshBorrowers = () => {
//     setRefresh(!refresh);
// };

// const getLoans = async () => {
//   try {
//     const res = await fetch("http://localhost:5000/loans");
//     const data = await res.json();
//     setLoans(data);
//   } catch (error) {
//     console.error("Error fetching loans:", error);
//   }
// };



//   return (
//     <>
//       <div className="add-button">
//         <SearchBar />
//         <AddLoan onAdd={getLoans} />
//       </div>
//       <div className=" d-flex justify-content-center flex-row buttons">

//         <ActiveButton />
//         <InactiveButton />
//         <OverDue />
//         <UploadButton />
//         <DownloadButton />

//       </div>
//       <div>
//         <BorrowersTable  loans={loans} />
//       </div>
//       <div>
//         <AppPagination/> 
//       </div>

//     </>
//   )
// }
// export default Loans;









import React, { useState, useEffect } from "react";



import SearchBar from "../SearchBar";
import BorrowersTable from "../BorrowersTable";
import AddLoan from "../AddLoan";
import ActiveButton from "../ActiveButton";
import InactiveButton from "../InactiveButton";
import UploadButton from "../UploadButton";
import DownloadButton from "../DownloadButton";
import "bootstrap/dist/css/bootstrap.min.css";
import OverDue from "../OverDue";
import AppPagination from "../AppPagination";



function Loans() {
  const [loans, setLoans] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [filteredLoans, setFilteredLoans] = useState([]);
  const [showingFiltered, setShowingFiltered] = useState(false);


  // 🔥 Proper refresh function
  const refreshBorrowers = () => {
    setRefresh((prev) => !prev);
  };

  // 🔥 Fetch borrowers from backend
  const getLoans = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/borrowers");
      const data = await res.json();
      setLoans(data);
    } catch (error) {
      console.error("Error fetching loans:", error);
    }
  };

  // 🔥 Load borrowers when page loads OR refresh toggles
  useEffect(() => {
    getLoans();
  }, [refresh]);

  const showActive = () => {
  const active = loans.filter((b) => b.status === "Active");

  setFilteredLoans(active);
  setShowingFiltered(true); // now table will use filtered data
};

const showInactive = () => {
  const inactiveLoans = loans.filter((b) => b.status === "Inactive");
  setFilteredLoans(inactiveLoans);
  setShowingFiltered(true);
};




  return (
    <>
    


      <div className="add-button">
        <SearchBar />
        {/* AddLoan ke baad refresh trigger */}
        <AddLoan onAdd={refreshBorrowers} />
      </div>

      <div className="d-flex  flex-row buttons">
        <ActiveButton onActive={showActive} />
        <InactiveButton  onInactive={showInactive}/>
        <OverDue />
        {/* <TopupButton/> */}
        <UploadButton onImportSuccess={refreshBorrowers} />
        {/* <DownloadButton onDownload={() => downloadCSV()}/> */}
        <DownloadButton />
      </div>

      <div>
        <BorrowersTable
          loans={showingFiltered ? filteredLoans : loans}
          refresh={refresh}
          refreshBorrowers={refreshBorrowers}   // delete ke baad refresh hoga
        />
      </div>

      <div>
        <AppPagination />
      </div>


    </>
  );
}

export default Loans;
