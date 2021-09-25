import React from "react";

export interface IProps {
    totalResults: number;
    limitPerPage: number;
    currentPage: number;
    onChangePage: (pageNum: number) => void;
}

const Pagination = (props: IProps) => {
    const total = Math.ceil(props.totalResults / props.limitPerPage)
    const pages: number[] = []
    for (let i = 1; i <= total; i++) {
        pages.push(i);
    }
    const change = (pageNum: number) => {
        props.onChangePage(pageNum)
    }
    return (
        <>
            <ul className="pagination pagination-sm">
                {props.currentPage !== 1 &&
                    <li key="prev" className="page-item" ><button className="page-link" onClick={() => change(props.currentPage - 1)} >Prev</button></li>
                }

                {pages.map((page, index: number) => (
                    <li key={index} className={(props.currentPage - 1) === index ? "page-item active" : "page-item"} aria-current="page" > <button className="page-link" onClick={() => change(page)} >{page}</button></li>
                ))}

                {props.currentPage !== total &&
                    <li key="next" className="page-item"><button className="page-link" onClick={() => change(props.currentPage + 1)} >Next</button></li>
                }
            </ul>
        </>
    )
}

export default Pagination;
