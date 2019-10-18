import React from 'react'
import {Pagination} from 'semantic-ui-react'

export default function PaginationExamplePagination(){


    return (
        <div aria-label="Pagination Navigation" role="navigation" className="ui pagination menu">
            <a
                aria-current="false"
                aria-disabled="false"
                tabIndex="0"
                value="1"
                aria-label="First item"
                type="firstItem"
                className="item"
            >
                «
            </a>
            <a
                aria-current="false"
                aria-disabled="false"
                tabIndex="0"
                value="4"
                aria-label="Previous item"
                type="prevItem"
                className="item"
            >
                ⟨
            </a>
            <a aria-current="false" aria-disabled="false" tabIndex="0" value="1" type="pageItem" className="item">
                1
            </a>
            <a
                aria-current="false"
                aria-disabled="true"
                tabIndex="-1"
                value="3"
                type="ellipsisItem"
                className="item"
            >
                ...
            </a>
            <a aria-current="false" aria-disabled="false" tabIndex="0" value="4" type="pageItem" className="item">
                4
            </a>
            <a
                aria-current="true"
                aria-disabled="false"
                tabIndex="0"
                value="5"
                type="pageItem"
                className="active item"
            >
                5
            </a>
            <a aria-current="false" aria-disabled="false" tabIndex="0" value="6" type="pageItem" className="item">
                6
            </a>
            <a
                aria-current="false"
                aria-disabled="true"
                tabIndex="-1"
                value="7"
                type="ellipsisItem"
                className="item"
            >
                ...
            </a>
            <a
                aria-current="false"
                aria-disabled="false"
                tabIndex="0"
                value="10"
                type="pageItem"
                className="item"
            >
                10
            </a>
            <a
                aria-current="false"
                aria-disabled="false"
                tabIndex="0"
                value="6"
                aria-label="Next item"
                type="nextItem"
                className="item"
            >
                ⟩
            </a>
            <a
                aria-current="false"
                aria-disabled="false"
                tabIndex="0"
                value="10"
                aria-label="Last item"
                type="lastItem"
                className="item"
            >
                »
            </a>
        </div>
    );
}

// export default PaginationExamplePagination

