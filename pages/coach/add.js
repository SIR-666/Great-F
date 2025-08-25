import React, { useState, useEffect, useContext } from "react";
import AuthContext from "@/context/AuthContext";
import { useRouter } from "next/router";
import { API_URL3 } from "@/config/index";
import Layout from "@/components/Layout";
import coachyStyles from "@/styles/Coachy.module.css";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";
import "react-toastify/dist/ReactToastify.css";
export default function AddCoachPage() {
  // const optionsArea = [
  //   { value: "Milk-(Filling)", label: " (Milk-Filling)" },
  //   {
  //     value: "Milk-(Packing, Inkubasi QC)",
  //     label: " Anteroom dan hoot room yogurt",
  //   },
  //   { value: "Are Anteroom Chilled", label: " Are Anteroom Chilled" },
  //   { value: "Area CIP Road tanker", label: " Area CIP Road tanker" },
  //   {
  //     value: "Area Istirahat Project (Bedeng)",
  //     label: " Area Istirahat Project (Bedeng)",
  //   },
  //   { value: "Area Loading Dock Chilled", label: " Area Loading Dock Chilled" },
  //   { value: "Area Office Chilled", label: " Area Office Chilled" },
  //   {
  //     value: "Area Parkir Truk  Precolling",
  //     label: " Area Parkir Truk  Precolling",
  //   },
  //   { value: "Area Robot Chilled", label: " Area Robot Chilled" },
  //   {
  //     value: "Area Warehouse Chilled Baru",
  //     label: " Area Warehouse Chilled Baru",
  //   },
  //   {
  //     value: "Area Warehouse Chilled Lama",
  //     label: " Area Warehouse Chilled Lama",
  //   },
  //   { value: "Auditorium", label: " Auditorium" },
  //   { value: "Balkon Cheese", label: " Balkon Cheese" },
  //   { value: "Blending ", label: " Blending " },
  //   { value: "Boiler", label: " Boiler" },
  //   { value: "Chiller", label: " Chiller" },
  //   { value: "CIP Kitchen ", label: " CIP Kitchen " },
  //   { value: "Cold Storage", label: " Cold Storage" },
  //   { value: "Cold Storage Cheese", label: " Cold Storage Cheese" },
  //   { value: "Cooling tower", label: " Cooling tower" },
  //   { value: "Decon  Yogurt", label: " Decon  Yogurt" },
  //   { value: "Decon Cheese", label: " Decon Cheese" },
  //   { value: "Decon Milk", label: " Decon Milk" },
  //   { value: "Driver Room", label: " Driver Room" },
  //   { value: "Esleeve", label: " Esleeve" },
  //   { value: "Filing Yogurt", label: " Filing Yogurt" },
  //   { value: "Filling Milk", label: " Filling Milk" },
  //   { value: "Gazebo (office)", label: " Gazebo (office)" },
  //   { value: "Gazebo Unloading Milk", label: " Gazebo Unloading Milk" },
  //   { value: "Genset", label: " Genset" },
  //   { value: "Kantin", label: " Kantin" },
  //   { value: "Klinik", label: " Klinik" },
  //   { value: "Kompresor High Press", label: " Kompresor High Press" },
  //   { value: "Kompresor Low Press", label: " Kompresor Low Press" },
  //   { value: "Koperasi", label: " Koperasi" },
  //   { value: "Lab", label: " Lab" },
  //   { value: "Laundry", label: " Laundry" },
  //   { value: "Loading Cheese", label: " Loading Cheese" },
  //   { value: "Loading/Unloading WH Dry", label: " Loading/Unloading WH Dry" },
  //   {
  //     value: "Loading/Unloading WH Material & Chemical",
  //     label: " Loading/Unloading WH Material & Chemical",
  //   },
  //   {
  //     value: "Loading/Unloading WH Packaging",
  //     label: " Loading/Unloading WH Packaging",
  //   },
  //   { value: "Lobby", label: " Lobby" },
  //   { value: "Loker Karyawan", label: " Loker Karyawan" },
  //   { value: "Masjid", label: " Masjid" },
  //   { value: "Office", label: " Office" },
  //   { value: "Office Cheese", label: " Office Cheese" },
  //   { value: "Office Logistik", label: " Office Logistik" },
  //   { value: "Office QC", label: " Office QC" },
  //   { value: "Office WWTP", label: " Office WWTP" },
  //   { value: "Packaging material yogurt", label: " Packaging material yogurt" },
  //   { value: "Packing Cheese", label: " Packing Cheese" },
  //   { value: "Packing Milk", label: " Packing Milk" },
  //   { value: "Packing Yogurt", label: " Packing Yogurt" },
  //   { value: "Parkir Mobil", label: " Parkir Mobil" },
  //   { value: "Parkir Motor", label: " Parkir Motor" },
  //   { value: "Parkir Rest Area", label: " Parkir Rest Area" },
  //   { value: "Parkir Road Tanker", label: " Parkir Road Tanker" },
  //   { value: "Parkir Truck", label: " Parkir Truck" },
  //   { value: "Pass Box Filling Milk", label: " Pass Box Filling Milk" },
  //   { value: "Pos Security 1", label: " Pos Security 1" },
  //   { value: "Pos Security 2", label: " Pos Security 2" },
  //   { value: "Process ", label: " Process " },
  //   { value: "Processing Cheese", label: " Processing Cheese" },
  //   { value: "Processing Milk", label: " Processing Milk" },
  //   { value: "Processing Yogurt", label: " Processing Yogurt" },
  //   { value: "Rest Area", label: " Rest Area" },
  //   {
  //     value: "Robotik ESL (cold storage)",
  //     label: " Robotik ESL (cold storage)",
  //   },
  //   { value: "Robotik UHT", label: " Robotik UHT" },
  //   { value: "Robotik Yogurt", label: " Robotik Yogurt" },
  //   { value: "Ruang Inkubasi QC", label: " Ruang Inkubasi QC" },
  //   {
  //     value: "Ruang Tunggu driver road tanker",
  //     label: " Ruang Tunggu driver road tanker",
  //   },
  //   { value: "Tanki Solar", label: " Tanki Solar" },
  //   { value: "TPS", label: " TPS" },
  //   { value: "TPS LB3", label: " TPS LB3" },
  //   { value: "TPS Sampah Ekonomis", label: " TPS Sampah Ekonomis" },
  //   { value: "Trafo", label: " Trafo" },
  //   {
  //     value: "Unloading Chemical Processing",
  //     label: " Unloading Chemical Processing",
  //   },
  //   { value: "Unloading Milk", label: " Unloading Milk" },
  //   { value: "Unloading Milk Cheese", label: " Unloading Milk Cheese" },
  //   { value: "Unloading Spare part", label: " Unloading Spare part" },
  //   { value: "UPS", label: " UPS" },
  //   { value: "View Galery", label: " View Galery" },
  //   { value: "View Galery Cheese", label: " View Galery Cheese" },
  //   { value: "Warehouse Cangkang", label: " Warehouse Cangkang" },
  //   { value: "Warehouse Cheese", label: " Warehouse Cheese" },
  //   { value: "Warehouse Chemical", label: " Warehouse Chemical" },
  //   { value: "Warehouse dry", label: " Warehouse dry" },
  //   { value: "Warehouse Raw Material", label: " Warehouse Raw Material" },
  //   { value: "Warehouse Spare Part", label: " Warehouse Spare Part" },
  //   { value: "Workshop Boiler", label: " Workshop Boiler" },
  //   { value: "Workshop Utility", label: " Workshop Utility" },
  //   { value: "WT/Holding Tank", label: " WT/Holding Tank" },
  //   { value: "WWTP", label: " WWTP" },
  // ];
  const [optionsArea, setOptionsArea] = useState([]);
  // const [loading, setLoading] = useState(true);

  const { getIdentityData } = useContext(AuthContext);
  const [employeeName, setEmployeeName] = useState("");
  const [employeeDept, setEmployeeDept] = useState("");
  const [values, setValues] = useState({
    date_of_coach: "",
    coach: "",
    area_observation: "",
    result_observation: "",
    coachy: [], // array of selected coachee employee objects
    photo: null, // file object
  });
  // --- Coachy (Coachee) selection logic ---
  const [allEmployees, setAllEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [pickedAvailable, setPickedAvailable] = useState([]); // ids
  const [pickedSelected, setPickedSelected] = useState([]); // ids
  const [lastAvailableIndex, setLastAvailableIndex] = useState(null);
  const [lastSelectedIndex, setLastSelectedIndex] = useState(null);
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  // Fetch employees on mount
  // useEffect(() => {
  //   fetch("http://10.24.0.155:3030/api/employees")
  //     .then((res) => res.json())
  //     .then(({ data }) => setAllEmployees(data || []))
  //     .catch(() => setAllEmployees([]));
  // }, []);

  // Fetch employees & area options on mount
  useEffect(() => {
    // Fetch employees
    fetch(`${API_URL3}/api/employees`)
      .then((res) => res.json())
      .then(({ data }) => {
        // Tambahkan Others dengan semua field null
        const withOthers = [
          ...(data || []),
          {
            employee_no: null,
            employee_name: "Others (Third Party)",
            department_name: null,
            section_name: null,
            position_name: null,
          },
        ];
        setAllEmployees(withOthers);
      })
      .catch(() => setAllEmployees([
        {
          employee_no: null,
          employee_name: "Others (Third Party)",
          department_name: null,
          section_name: null,
          position_name: null,
        },
      ]));

    // Fetch area options
    fetch(`${API_URL3}/api/areas`)
      .then((res) => res.json())
      .then(({ data }) => {
        const mapped = (data || []).map((item) => ({
          value: item.area_name,
          label: item.area_name,
        }));
        setOptionsArea(mapped);
      })
      .catch(() => setOptionsArea([]));
  }, []);

  // Filter employees by search term
  useEffect(() => {
    const lower = searchTerm.toLowerCase();
    setFilteredEmployees(
      allEmployees.filter(
        (e) =>
          e.employee_name?.toLowerCase().includes(lower) ||
          e.department_name?.toLowerCase().includes(lower) ||
          e.position_name?.toLowerCase().includes(lower)
      )
    );
  }, [allEmployees, searchTerm]);

  // Selected coachy (coachee) list
  const selectedCoachy = values.coachy;

  // Add picked available to selected (fix: ambil dari allEmployees agar pickedAvailable tetap global)
  const movePickedToSelected = () => {
    const toAdd = allEmployees.filter((e) =>
      pickedAvailable.includes(e.employee_no)
    );
    setValues((prev) => ({
      ...prev,
      coachy: Array.from(new Set([...prev.coachy, ...toAdd])),
    }));
    setPickedAvailable([]);
    setLastAvailableIndex(null);
  };
  // Remove picked selected from selected
  const movePickedToAvailable = () => {
    setValues((prev) => ({
      ...prev,
      coachy: prev.coachy.filter(
        (e) => !pickedSelected.includes(e.employee_no)
      ),
    }));
    setPickedSelected([]);
    setLastSelectedIndex(null);
  };

  // Deselect all available picks
  const clearPickedAvailable = () => {
    setPickedAvailable([]);
    setLastAvailableIndex(null);
  };
  // Deselect all selected picks
  const clearPickedSelected = () => {
    setPickedSelected([]);
    setLastSelectedIndex(null);
  };

  // Shift+Click support for available list
  const handleAvailableRowClick = (e, idx, empNo) => {
    if (e.shiftKey) e.preventDefault();
    if (e.shiftKey && lastAvailableIndex !== null) {
      const list = filteredEmployees.filter(
        (emp) => !selectedCoachy.some((c) => c.employee_no === emp.employee_no)
      );
      const start = Math.min(lastAvailableIndex, idx);
      const end = Math.max(lastAvailableIndex, idx);
      const rangeIds = list.slice(start, end + 1).map((emp) => emp.employee_no);
      setPickedAvailable((prev) => Array.from(new Set([...prev, ...rangeIds])));
    } else {
      setPickedAvailable((prev) =>
        prev.includes(empNo)
          ? prev.filter((id) => id !== empNo)
          : [...prev, empNo]
      );
      setLastAvailableIndex(idx);
    }
  };

  // Shift+Click support for selected list
  const handleSelectedRowClick = (e, idx, empNo) => {
    if (e.shiftKey) e.preventDefault();
    if (e.shiftKey && lastSelectedIndex !== null) {
      const list = selectedCoachy;
      const start = Math.min(lastSelectedIndex, idx);
      const end = Math.max(lastSelectedIndex, idx);
      const rangeIds = list.slice(start, end + 1).map((emp) => emp.employee_no);
      setPickedSelected((prev) => Array.from(new Set([...prev, ...rangeIds])));
    } else {
      setPickedSelected((prev) =>
        prev.includes(empNo)
          ? prev.filter((id) => id !== empNo)
          : [...prev, empNo]
      );
      setLastSelectedIndex(idx);
    }
  };
  useEffect(() => {
    // Ambil nama dan dept dari identityData
    const empName = getIdentityData ? getIdentityData("employee_name") : "";
    const empDept = getIdentityData ? getIdentityData("department_name") : "";
    setEmployeeName(empName || "");
    setEmployeeDept(empDept || "");
    // Set coach otomatis
    setValues((prev) => ({
      ...prev,
      coach: empName && empDept ? empName + " / " + empDept : "",
    }));
  }, [getIdentityData]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleInputChange3 = (e) => {
    setValues((prev) => ({ ...prev, area_observation: e.value }));
  };

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setValues((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setValues((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validasi sederhana
    if (!values.date_of_coach || !values.coach) {
      toast.error("Date of coach dan Coach wajib diisi");
      return;
    }
    if (!values.coachy || values.coachy.length === 0) {
      toast.error("Pilih minimal satu Coachy (Coachee)");
      return;
    }
    setLoading(true);
    try {
      let res, data;
      if (values.photo) {
        // Kirim multipart/form-data jika ada file photo
        const formData = new FormData();
        formData.append("date_of_coach", values.date_of_coach);
        formData.append("coach", values.coach);
        formData.append("area_observation", values.area_observation);
        formData.append("result_observation", values.result_observation);
        values.coachy.forEach((c, idx) => { 
          formData.append("employee_ids[]", c.employee_no || "");
        });
        formData.append("photo", values.photo);
        res = await fetch(`${API_URL3}/api/coaching`, {
          method: "POST",
          body: formData,
        });
      } else {
        // Kirim JSON biasa jika tidak ada file
        res = await fetch(`${API_URL3}/api/coaching`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            date_of_coach: values.date_of_coach,
            coach: values.coach,
            area_observation: values.area_observation,
            result_observation: values.result_observation,
            employee_ids: values.coachy.map((c) => c.employee_no || null),
          }),
        });
      }
      data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Gagal menyimpan data");
      }
      toast.success("Data coach berhasil disimpan!");
      setTimeout(() => {
        router.push("/coach");
      }, 1200);
    } catch (err) {
      toast.error(err.message || "Gagal menyimpan data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Add Coach">
      <h1>Add Coaching</h1>
      <ToastContainer />

      <form onSubmit={handleSubmit} className={coachyStyles.form}>
        <div className={coachyStyles.grid}>
          <div className={coachyStyles.formGroup}>
            <label htmlFor="date_of_coach" className={coachyStyles.formLabel}>
              Date of Coaching
            </label>
            <input
              type="date"
              name="date_of_coach"
              id="date_of_coach"
              value={values.date_of_coach}
              onChange={handleInputChange}
              required
              className={coachyStyles.formInput}
              min={(() => {
                const now = new Date();
                return `${now.getFullYear()}-${String(
                  now.getMonth() + 1
                ).padStart(2, "0")}-01`;
              })()}
              max={(() => {
                const now = new Date();
                return `${now.getFullYear()}-${String(
                  now.getMonth() + 1
                ).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
              })()}
            />
          </div>
          <div className={coachyStyles.formGroup}>
            <label htmlFor="coach" className={coachyStyles.formLabel}>
              Coach
            </label>
            <input
              type="text"
              name="coach"
              id="coach"
              value={
                employeeName && employeeDept
                  ? employeeName + " / " + employeeDept
                  : ""
              }
              disabled
              placeholder="Coach"
              className={
                coachyStyles.formInput + " " + coachyStyles.formInputDisabled
              }
            />
          </div>
        </div>
        <div className={coachyStyles.grid}>
          <div className={coachyStyles.formGroup}>
            <label
              htmlFor="area_observation"
              className={coachyStyles.formLabel}
            >
              Area Observation
            </label>
            <Select
              value={
                optionsArea.find(
                  (opt) => opt.value === values.area_observation
                ) || null
              }
              name="area_observation"
              id="area_observation"
              onChange={handleInputChange3}
              options={optionsArea}
              className={coachyStyles.reactSelect}
              classNamePrefix="react-select"
            />
          </div>
        </div>
        {/* Coachy (Coachee) selection - styled with CSS module */}
        <div className={coachyStyles.coachySection}>
          <label className={coachyStyles.coachyLabel}>Coachee</label>
          <div className={coachyStyles.searchBoxWrapper}>
            <input
              type="text"
              placeholder="Cari nama, departemen, atau posisi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={coachyStyles.searchBox}
            />
          </div>
          <div className={coachyStyles.listsWrapper}>
            {/* Available employees */}
            <div className={coachyStyles.listCol}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 4,
                }}
              >
                <div className={coachyStyles.listTitle}>Daftar Karyawan</div>
                <button
                  type="button"
                  className={coachyStyles.clearBtn}
                  style={{
                    display: pickedAvailable.length ? "inline-block" : "none",
                  }}
                  onClick={clearPickedAvailable}
                >
                  Batal Pilih
                </button>
              </div>
              <div className={coachyStyles.listBox}>
                {filteredEmployees
                  .filter(
                    (e) =>
                      !selectedCoachy.some(
                        (c) => c.employee_no === e.employee_no
                      )
                  )
                  .map((e, idx) => (
                    <div
                      key={e.employee_no !== null ? e.employee_no : 'Others (Third Party)'}
                      className={
                        coachyStyles.listItem +
                        (pickedAvailable.includes(e.employee_no)
                          ? " " + coachyStyles.listItemPicked
                          : "")
                      }
                      onClick={(event) =>
                        handleAvailableRowClick(event, idx, e.employee_no)
                      }
                    >
                      <input
                        type="checkbox"
                        checked={pickedAvailable.includes(e.employee_no)}
                        readOnly
                        className={coachyStyles.checkbox}
                      />
                      <span>
                        {e.employee_name === "Others (Third Party)"
                          ? "Others (Third Party)"
                          : <>
                              {e.employee_name}{" "}
                              <span className={coachyStyles.itemMeta}>
                                ({e.department_name} • {e.section_name})
                              </span>
                            </>
                        }
                      </span>
                    </div>
                  ))}
                {filteredEmployees.filter(
                  (e) =>
                    !selectedCoachy.some((c) => c.employee_no === e.employee_no)
                ).length === 0 && (
                  <div className={coachyStyles.emptyMsg}>
                    Tidak ada karyawan tersedia
                  </div>
                )}
              </div>
              <button
                type="button"
                className={
                  coachyStyles.addBtn +
                  (pickedAvailable.length ? "" : " " + coachyStyles.btnDisabled)
                }
                disabled={!pickedAvailable.length}
                onClick={movePickedToSelected}
              >
                Tambahkan ke Coachee
              </button>
            </div>
            {/* Selected coachy */}
            <div className={coachyStyles.listCol}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 4,
                }}
              >
                <div className={coachyStyles.listTitle}>Coachee Terpilih</div>
                <button
                  type="button"
                  className={coachyStyles.clearBtn}
                  style={{
                    display: pickedSelected.length ? "inline-block" : "none",
                  }}
                  onClick={clearPickedSelected}
                >
                  Batal Pilih
                </button>
              </div>
              <div className={coachyStyles.listBox}>
                {selectedCoachy.map((e, idx) => (
                  <div
                    key={e.employee_no !== null ? e.employee_no : 'Others (Third Party)'}
                    className={
                      coachyStyles.listItem +
                      (pickedSelected.includes(e.employee_no)
                        ? " " + coachyStyles.listItemRemove
                        : "")
                    }
                    onClick={(event) =>
                      handleSelectedRowClick(event, idx, e.employee_no)
                    }
                  >
                    <input
                      type="checkbox"
                      checked={pickedSelected.includes(e.employee_no)}
                      readOnly
                      className={coachyStyles.checkbox}
                    />
                    <span>
                      {e.employee_name === "Others (Third Party)"
                        ? "Others (Third Party)"
                        : <>
                            {e.employee_name}{" "}
                            <span className={coachyStyles.itemMeta}>
                              ({e.department_name} • {e.position_name})
                            </span>
                          </>
                      }
                    </span>
                  </div>
                ))}
                {selectedCoachy.length === 0 && (
                  <div className={coachyStyles.emptyMsg}>
                    Belum ada coachee terpilih
                  </div>
                )}
              </div>
              <button
                type="button"
                className={
                  coachyStyles.removeBtn +
                  (pickedSelected.length ? "" : " " + coachyStyles.btnDisabled)
                }
                disabled={!pickedSelected.length}
                onClick={movePickedToAvailable}
              >
                Hapus dari Coachee
              </button>
            </div>
          </div>
        </div>

        <div className={coachyStyles.formGroup}>
          <label
            htmlFor="result_observation"
            className={coachyStyles.formLabel}
          >
            Result Observation
          </label>
          <textarea
            name="result_observation"
            id="result_observation"
            value={values.result_observation}
            onChange={handleInputChange}
            rows={4}
            className={coachyStyles.formTextarea}
          />
        </div>

        {/* Input photo */}
        <div className={coachyStyles.formGroup}>
          <label htmlFor="photo" className={coachyStyles.formLabel}>
            Photo (optional)
          </label>
          <input
            type="file"
            name="photo"
            id="photo"
            accept="image/*"
            onChange={handleInputChange}
            className={coachyStyles.formInput}
          />
          {values.photo && (
            <div style={{ marginTop: 8 }}>
              <img
                src={URL.createObjectURL(values.photo)}
                alt="Preview"
                style={{
                  maxWidth: 180,
                  maxHeight: 180,
                  borderRadius: 8,
                  border: "1px solid #eee",
                }}
              />
            </div>
          )}
        </div>

        <div style={{ marginTop: "2.5rem" }}>
          {loading ? (
            <button type="button" className={coachyStyles.submitBtn} disabled>
              Saving...
            </button>
          ) : (
            <button type="submit" className={coachyStyles.submitBtn}>
              Add Coach
            </button>
          )}
        </div>
      </form>
    </Layout>
  );
}

// export async function getServerSideProps({ req }) {
//   const { token } = parseCookies(req);

//   return {
//     props: {
//       token,
//     },
//   };
// }
