import React, { useState, useEffect } from "react";
import "./Home.css";
import CsvData from "../../Components/CsvData/CsvData.jsx";
import DbData from "../../Components/DbData/DbData.jsx";
import MData from "../../Components/mData/mData";
import { FaExchangeAlt } from "react-icons/fa";
import CommonData from "../../Components/CommonData/CommonData";
import { toast } from "react-toastify";

const Home = () => {
  const [dbData, setDbData] = useState(null);
  const [csvData, setCsvData] = useState([]);
  const [missingCombinations, setMissingCombinations] = useState([]);
  const [commonData, setCommonData] = useState([]);
  const [showCommonData, setShowCommonData] = useState(false);
  const [showMData, setShowMData] = useState(false);
  const [orgCsvData, setOrgCsvData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [parentData, setParentData] = useState([]);

  const compareValues = () => {
    let currentFilteredData = [...csvData];
    let foundCommonData = [];

    dbData.forEach((item) => {
      const matches = [
        (item2) => item2.Attributes1 === item.value_de,
        (item2) => item2.Attributes2 === item.value_de_2,
        (item2) => item2.Attributes3 === item.value_de_3,
      ];

      let matchIndex = currentFilteredData.findIndex((item2) =>
        matches.every((fn) => fn(item2))
      );

      if (matchIndex !== -1) {
        foundCommonData.push({
          dbData: item,
          csvData: currentFilteredData[matchIndex],
        });

        currentFilteredData.splice(matchIndex, 1);
      }
    });

    setMissingCombinations(currentFilteredData);
    setCommonData(foundCommonData);

    console.log("Missing combinations:", currentFilteredData);
    console.log("Common data:", foundCommonData);
  };

  const checkAttributesEquality = () => {
    const csvAttributesCount = Math.max(
      csvData[0]?.Attributes1 ? 1 : 0,
      csvData[0]?.Attributes2 ? 2 : 0,
      csvData[0]?.Attributes3 ? 3 : 0
    );

    const dbAttributesCount = Math.max(
      dbData[0]?.value_de ? 1 : 0,
      dbData[0]?.value_de_2 ? 2 : 0,
      dbData[0]?.value_de_3 ? 3 : 0
    );

    return csvAttributesCount === dbAttributesCount;
  };

  return (
    <div className="home-container">
      {missingCombinations.length !== 0 && showMData && (
        <MData
          setShowMData={setShowMData}
          missingCombinations={missingCombinations}
          setMissingCombinations={setMissingCombinations}
          parentData={parentData}
          parent={dbData}
          setParentData={setParentData}
        />
      )}
      {commonData.length !== 0 && showCommonData && (
        <CommonData
          setShowCommonData={setShowCommonData}
          commonData={commonData}
          setCommonData={setCommonData}
        />
      )}
      <h1 className="home-head">Data Comparer and Updater</h1>
      <div className="attribute-selection">
        <button
          onClick={() => {
            if (csvData.length === 0 || dbData === null) {
              toast.error("Please Load Master Data and Csv Data!");
              return;
            }

            if (!checkAttributesEquality()) {
              toast.error(
                "The number of attributes in CSV and DB data are not equal. Please make sure both have the same number of attributes."
              );
              return;
            }

            compareValues();
            setShowMData(true);
          }}
        >
          <FaExchangeAlt /> Perform Comparison
        </button>
        <button
          onClick={() => {
            if (csvData.length === 0 || dbData === null) {
              toast.error("Please Load Master Data and Csv Data!");
              return;
            }

            if (!checkAttributesEquality()) {
              toast.error(
                "The number of attributes in CSV and DB data are not equal. Please make sure both have the same number of attributes."
              );
              return;
            }

            compareValues();
            setShowCommonData(true);
          }}
        >
          <FaExchangeAlt /> Update Common
        </button>
      </div>
      <div className="home-box">
        <DbData
          setDbData={setDbData}
          dbData={dbData}
          parentData={parentData}
          setParentData={setParentData}
        />
        <CsvData
          dbData={dbData}
          csvData={csvData}
          setCsvData={setCsvData}
          headers={headers}
          setHeaders={setHeaders}
          orgCsvData={orgCsvData}
          setOrgCsvData={setOrgCsvData}
        />
      </div>
    </div>
  );
};

export default Home;
