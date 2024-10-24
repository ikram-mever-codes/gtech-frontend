import React from "react";
import "./Parent.css";

const Parent = ({ parentData, parent }) => {
  const isActive = parentData.isActive === "Y";
  return (
    <div className="parent-container">
      <div className="parent-row">
        <div className="parent-label">Parent Name (EN):</div>
        <div className="parent-value">{parentData.parent_name_en}</div>
      </div>

      <div className="parent-row">
        <div className="parent-label">Parent ID:</div>
        <div className="parent-value">{parentData.id}</div>
      </div>

      <div className="parent-row">
        <div className="parent-label">Parent ID (DE):</div>
        <div className="parent-value">{parentData.parent_id_de}</div>
      </div>

      <div className="parent-row">
        <div className="parent-label">Parent No (DE):</div>
        <div className="parent-value">{parentData.parent_no_de}</div>
      </div>
      <div className="parent-row">
        <div className="parent-label">Taric Id</div>
        <div className="parent-value">{parent[0].taric_id}</div>
      </div>
      <div className="parent-row">
        <div className="parent-label">Tariff Code</div>
        <div className="parent-value">{parent[0].tariff_code}</div>
      </div>

      <div className="parent-row">
        <div className="parent-status">
          <button
            className={`status-btn ${isActive ? "active" : "not-active"}`}
          >
            {isActive ? "Active" : "Not Active"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Parent;
