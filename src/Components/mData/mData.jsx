import React, { useState } from "react";
import { FaRegWindowClose } from "react-icons/fa";
import Combinations from "../Combinations/Combinations";
import Parent from "../Parent/Parent";
import "./mData.css";
import Operations from "../Operations/Operations";
import PostSettings from "../PostSettings/PostSettings";

const MData = ({
  missingCombinations,
  setMissingCombinations,
  setShowMData,
  handleAction,
  setParentData,
  parentData,
  parent,
}) => {
  const [tab, setTab] = useState("combinations");
  const [products, setProducts] = useState([]);

  return (
    <div className="mdata-container">
      <div className="mdata-modal">
        <button
          className="db-data-close"
          onClick={() => {
            setShowMData(false);
            setMissingCombinations([]);
          }}
        >
          <FaRegWindowClose />
        </button>
        <div className="mdata-tabs">
          <button
            className={tab === "combinations" ? "active-tab" : ""}
            onClick={() => setTab("combinations")}
          >
            Missing Combinations
          </button>
          <button
            className={tab === "parent" ? "active-tab" : ""}
            onClick={() => setTab("parent")}
          >
            Parent Info
          </button>
          <button
            onClick={() => setTab("operations")}
            className={tab === "operations" ? "active-tab" : ""}
          >
            Formula Operations
          </button>
          <button
            onClick={() => setTab("post-settings")}
            className={tab === "post-sttings" ? "active-tab" : ""}
          >
            Post Settings
          </button>
        </div>
        <div className="mdata-content">
          {tab === "combinations" && (
            <Combinations
              missingCombinations={missingCombinations}
              parentData={parentData}
              parent={parent}
              products={products}
              setProducts={setProducts}
            />
          )}
          {tab === "parent" && <Parent parentData={parentData} />}
          {tab === "post-settings" && <PostSettings />}
          {tab === "operations" && (
            <Operations
              parentData={parentData}
              products={products}
              setProducts={setProducts}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MData;
