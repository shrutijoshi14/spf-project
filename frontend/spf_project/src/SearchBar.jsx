import React from "react";
import { FaSearch } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";




function SearchBar() {



    return (
        <>
            
               
                <div className="container mt-3 searchbar">
                     
                    <div className="input-group">
                        <span className="input-group-text bg-light">
                            <FaSearch />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search borrowers, loans, etc..."
                        />
                    </div>
                </div>


    
        </>
    )
}
export default SearchBar;
