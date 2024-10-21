import axios from "axios";
import React, { useState } from "react";
import { FaRegWindowClose } from "react-icons/fa";
import { MdUpdate } from "react-icons/md";
import "./CommonData.css";
import { toast } from "react-toastify";
import { BASE_URL } from "../../assets/constants";

const CommonData = ({ setCommonData, setShowCommonData, commonData }) => {
  const [loading, setLoading] = useState(false);

  async function handleDataUpdate() {
    let cnf = confirm("Do you want to update Database?");
    if (!cnf) {
      return;
    }
    setLoading(true);
    try {
      let res = await axios.put(
        `${BASE_URL}/data/update`,
        { data: commonData },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(res.data.message || "Update successful");
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "An error occurred"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="common-data-container">
      <button
        className="db-data-close"
        onClick={() => {
          setShowCommonData(false);
          setCommonData([]);
        }}
      >
        <FaRegWindowClose />
      </button>
      <div className="common-data-wrapper">
        <button
          className="common-update-button"
          onClick={async () => {
            await handleDataUpdate();
          }}
        >
          <MdUpdate style={{ fontSize: "22px" }} />{" "}
          {loading ? "Updating..." : "Update Urls and Price"}{" "}
        </button>
        <div className="common-table-wrapper">
          <table className="common-data-table">
            <thead>
              <tr>
                <th>Csv Price</th>
                <th>Csv Url</th>
                <th>Db Price</th>
                <th>Db Url</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {(commonData || []).map((cd) => {
                const isUrlDifferent =
                  cd.csvData.URL.toString() !== cd.dbData.url.toString();
                const isPriceDifferent =
                  cd.csvData.price.toString() !==
                  cd.dbData.price_rmb.toString();
                const result =
                  isUrlDifferent || isPriceDifferent ? "Different" : "Matches";

                return (
                  <tr key={cd.dbData.item_id}>
                    <td className={isPriceDifferent ? "match-different" : ""}>
                      {cd.csvData.price}
                    </td>
                    <td className={isUrlDifferent ? "match-different" : ""}>
                      {cd.csvData.URL}
                    </td>
                    <td className={isPriceDifferent ? "match-different" : ""}>
                      {cd.dbData.price_rmb}
                    </td>
                    <td className={isUrlDifferent ? "match-different" : ""}>
                      {cd.dbData.url}
                    </td>
                    <td
                      className={
                        result === "Different" ? "result-mismatch" : ""
                      }
                    >
                      {result}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CommonData;
