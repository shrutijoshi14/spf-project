import React from "react"
import { Pagination } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";



function AppPagination() {

    return (
        <>
            <div className="d-flex justify-content-center mt-3">
                <Pagination>
                    <Pagination.First />
                    <Pagination.Prev />
                    <Pagination.Item active>{1}</Pagination.Item>
                    <Pagination.Item>{2}</Pagination.Item>
                    <Pagination.Item>{3}</Pagination.Item>
                    <Pagination.Next />
                    <Pagination.Last />
                </Pagination>
            </div>
        </>
    )
}
export default AppPagination;
