import React, { useReducer, useState, useContext, useEffect } from "react";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "@/components/Layout";
import styles from "@/styles/Form.module.css";
import AuthContext from "@/context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";
import { getCookie } from "cookies-next";

const optionsArea = [
  { value: "AHU Area Milk", label: " AHU Area Milk" },
  {
    value: "Anteroom dan hoot room yogurt",
    label: " Anteroom dan hoot room yogurt",
  },
  { value: "Are Anteroom Chilled", label: " Are Anteroom Chilled" },
  { value: "Area CIP Road tanker", label: " Area CIP Road tanker" },
  {
    value: "Area Istirahat Project (Bedeng)",
    label: " Area Istirahat Project (Bedeng)",
  },
  { value: "Area Loading Dock Chilled", label: " Area Loading Dock Chilled" },
  { value: "Area Office Chilled", label: " Area Office Chilled" },
  {
    value: "Area Parkir Truk  Precolling",
    label: " Area Parkir Truk  Precolling",
  },
  { value: "Area Robot Chilled", label: " Area Robot Chilled" },
  {
    value: "Area Warehouse Chilled Baru",
    label: " Area Warehouse Chilled Baru",
  },
  {
    value: "Area Warehouse Chilled Lama",
    label: " Area Warehouse Chilled Lama",
  },
  { value: "Auditorium", label: " Auditorium" },
  { value: "Balkon Cheese", label: " Balkon Cheese" },
  { value: "Blending ", label: " Blending " },
  { value: "Boiler", label: " Boiler" },
  { value: "Chiller", label: " Chiller" },
  { value: "CIP Kitchen ", label: " CIP Kitchen " },
  { value: "Cold Storage", label: " Cold Storage" },
  { value: "Cold Storage Cheese", label: " Cold Storage Cheese" },
  { value: "Cooling tower", label: " Cooling tower" },
  { value: "Decon  Yogurt", label: " Decon  Yogurt" },
  { value: "Decon Cheese", label: " Decon Cheese" },
  { value: "Decon Milk", label: " Decon Milk" },
  { value: "Driver Room", label: " Driver Room" },
  { value: "Esleeve", label: " Esleeve" },
  { value: "Filing Yogurt", label: " Filing Yogurt" },
  { value: "Filling Milk", label: " Filling Milk" },
  { value: "Gazebo (office)", label: " Gazebo (office)" },
  { value: "Gazebo Unloading Milk", label: " Gazebo Unloading Milk" },
  { value: "Genset", label: " Genset" },
  { value: "Kantin", label: " Kantin" },
  { value: "Klinik", label: " Klinik" },
  { value: "Kompresor High Press", label: " Kompresor High Press" },
  { value: "Kompresor Low Press", label: " Kompresor Low Press" },
  { value: "Koperasi", label: " Koperasi" },
  { value: "Lab", label: " Lab" },
  { value: "Laundry", label: " Laundry" },
  { value: "Loading Cheese", label: " Loading Cheese" },
  { value: "Loading/Unloading WH Dry", label: " Loading/Unloading WH Dry" },
  {
    value: "Loading/Unloading WH Material & Chemical",
    label: " Loading/Unloading WH Material & Chemical",
  },
  {
    value: "Loading/Unloading WH Packaging",
    label: " Loading/Unloading WH Packaging",
  },
  { value: "Lobby", label: " Lobby" },
  { value: "Loker Karyawan", label: " Loker Karyawan" },
  { value: "Masjid", label: " Masjid" },
  { value: "Office", label: " Office" },
  { value: "Office Cheese", label: " Office Cheese" },
  { value: "Office Logistik", label: " Office Logistik" },
  { value: "Office QC", label: " Office QC" },
  { value: "Office WWTP", label: " Office WWTP" },
  { value: "Packaging material yogurt", label: " Packaging material yogurt" },
  { value: "Packing Cheese", label: " Packing Cheese" },
  { value: "Packing Milk", label: " Packing Milk" },
  { value: "Packing Yogurt", label: " Packing Yogurt" },
  { value: "Parkir Mobil", label: " Parkir Mobil" },
  { value: "Parkir Motor", label: " Parkir Motor" },
  { value: "Parkir Rest Area", label: " Parkir Rest Area" },
  { value: "Parkir Road Tanker", label: " Parkir Road Tanker" },
  { value: "Parkir Truck", label: " Parkir Truck" },
  { value: "Pass Box Filling Milk", label: " Pass Box Filling Milk" },
  { value: "Pos Security 1", label: " Pos Security 1" },
  { value: "Pos Security 2", label: " Pos Security 2" },
  { value: "Process ", label: " Process " },
  { value: "Processing Cheese", label: " Processing Cheese" },
  { value: "Processing Milk", label: " Processing Milk" },
  { value: "Processing Yogurt", label: " Processing Yogurt" },
  { value: "Rest Area", label: " Rest Area" },
  { value: "Robotik ESL (cold storage)", label: " Robotik ESL (cold storage)" },
  { value: "Robotik UHT", label: " Robotik UHT" },
  { value: "Robotik Yogurt", label: " Robotik Yogurt" },
  { value: "Ruang Inkubasi QC", label: " Ruang Inkubasi QC" },
  {
    value: "Ruang Tunggu driver road tanker",
    label: " Ruang Tunggu driver road tanker",
  },
  { value: "Tanki Solar", label: " Tanki Solar" },
  { value: "TPS", label: " TPS" },
  { value: "TPS LB3", label: " TPS LB3" },
  { value: "TPS Sampah Ekonomis", label: " TPS Sampah Ekonomis" },
  { value: "Trafo", label: " Trafo" },
  {
    value: "Unloading Chemical Processing",
    label: " Unloading Chemical Processing",
  },
  { value: "Unloading Milk", label: " Unloading Milk" },
  { value: "Unloading Milk Cheese", label: " Unloading Milk Cheese" },
  { value: "Unloading Spare part", label: " Unloading Spare part" },
  { value: "UPS", label: " UPS" },
  { value: "View Galery", label: " View Galery" },
  { value: "View Galery Cheese", label: " View Galery Cheese" },
  { value: "Warehouse Cangkang", label: " Warehouse Cangkang" },
  { value: "Warehouse Cheese", label: " Warehouse Cheese" },
  { value: "Warehouse Chemical", label: " Warehouse Chemical" },
  { value: "Warehouse dry", label: " Warehouse dry" },
  { value: "Warehouse Raw Material", label: " Warehouse Raw Material" },
  { value: "Warehouse Spare Part", label: " Warehouse Spare Part" },
  { value: "Workshop Boiler", label: " Workshop Boiler" },
  { value: "Workshop Utility", label: " Workshop Utility" },
  { value: "WT/Holding Tank", label: " WT/Holding Tank" },
  { value: "WWTP", label: " WWTP" },
];

const optionOpenClose = [
  { label: "Open", value: "Open" },
  { label: "Close", value: "Close" },
];

const POPULATE_STATE = "populateState";
const CLEAR = "clear";

const data = {
  safety_categories: [
    {
      label: "Unsafe Action (Perilaku Tidak Aman)",
      value: "Unsafe Act",
      states: [
        {
          value: "Minor (Berpotensi nearmiss & P3K)",
          label:
            "Minor (Berpotensi nearmiss & P3K) - nilai kerusakan hingga Rp. 1.5 Jt",
        },
        {
          value: "Mayor (Berpotensi bencana,kematian LTI/hilang hari kerja)",
          label:
            "Mayor (Berpotensi bencana,kematian LTI/hilang hari kerja)  - nilai kerusakan antara Rp. 1.5 Jt - 15 Jt",
        },
        {
          value: "Serius",
          label:
            "Serius (Berpotensi RDC & MTC) - nilai kerusakan lebih dari Rp. 15 Jt",
        },
      ],
      states2: [
        {
          label: "Reaksi Orang",
          value: "Reaksi Orang",
        },
        {
          label: "Posisi Orang",
          value: "Posisi Orang",
        },
        {
          label: "APD",
          value: "APD",
        },
        {
          label: "Peralatan & Equipment",
          value: "Peralatan & Equipment",
        },
        {
          label: "Prosedur & Pemeliharaan Area",
          value: "Prosedur & Pemeliharaan Area",
        },
      ],
    },
    {
      label: "Safe Action (Perilaku Aman)",
      value: "Safe Act",
      states: [
        {
          value: "Tidak ada Potensi Bahaya",
          label: "Tidak ada Potensi Bahaya",
        },
      ],
      states2: [
        {
          label: "Reaksi Orang",
          value: "Reaksi Orang",
        },
        {
          label: "Posisi Orang",
          value: "Posisi Orang",
        },
        {
          label: "APD",
          value: "APD",
        },
        {
          label: "Peralatan & Equipment",
          value: "Peralatan & Equipment",
        },
        {
          label: "Prosedur & Pemeliharaan Area",
          value: "Prosedur & Pemeliharaan Area",
        },
      ],
    },
    {
      label: "Unsafe Condition (Kondisi Tidak Aman)",
      value: "Safety Inspection Negative",
      states: [
        {
          value: "Minor (Berpotensi nearmiss & P3K)",
          label:
            "Minor (Berpotensi nearmiss & P3K) - nilai kerusakan hingga Rp. 1.5 Jt",
        },
        {
          value: "Mayor (Berpotensi bencana,kematian LTI/hilang hari kerja)",
          label:
            "Mayor (Berpotensi bencana,kematian LTI/hilang hari kerja)  - nilai kerusakan antara Rp. 1.5 Jt - 15 Jt",
        },
        {
          value: "Serius",
          label:
            "Serius (Berpotensi RDC & MTC) - nilai kerusakan lebih dari Rp. 15 Jt",
        },
      ],
      states2: [
        { label: "Mechanical", value: "Mechanical" },
        {
          label: "Electric",
          value: "Electric",
        },
        {
          label: "Building",
          value: "Building",
        },
      ],
    },
    {
      label: "Safe Condition (Kondisi Aman)",
      value: "Safety Inspection Positive",
      states: [
        {
          value: "Tidak ada Potensi Bahaya",
          label: "Tidak ada Potensi Bahaya",
        },
      ],
      states2: [
        { label: "Mechanical", value: "Mechanical" },
        {
          label: "Electric",
          value: "Electric",
        },
        {
          label: "Building",
          value: "Building",
        },
        {
          label: "Reaksi Orang",
          value: "Reaksi Orang",
        },
        {
          label: "Posisi Orang",
          value: "Posisi Orang",
        },
        {
          label: "APD",
          value: "APD",
        },
        {
          label: "Peralatan & Equipment",
          value: "Peralatan & Equipment",
        },
        {
          label: "Prosedur & Pemeliharaan Area",
          value: "Prosedur & Pemeliharaan Area",
        },
      ],
    },
    {
      label: "Near Miss",
      value: "Near Miss",
      states: [
        {
          value: "Minor (Berpotensi nearmiss & P3K)",
          label:
            "Minor (Berpotensi nearmiss & P3K) - nilai kerusakan hingga Rp. 1.5 Jt",
        },
        {
          value: "Mayor (Berpotensi bencana,kematian LTI/hilang hari kerja)",
          label:
            "Mayor (Berpotensi bencana,kematian LTI/hilang hari kerja)  - nilai kerusakan antara Rp. 1.5 Jt - 15 Jt",
        },
        {
          value: "Serius",
          label:
            "Serius (Berpotensi RDC & MTC) - nilai kerusakan lebih dari Rp. 15 Jt",
        },
      ],
      states2: [
        {
          label: "-",
          value: "-",
        },
      ],
    },
  ],
};

const initialState = {
  disableCountry: false,
  disableState: true,
  loadingState: false,
  statesToBeLoaded: [],
  statesToBeLoaded2: [],
};

function reducer(state, action) {
  switch (action.type) {
    case POPULATE_STATE:
      return {
        ...state,
        statesToBeLoaded: data.safety_categories.find(
          (safety_category) => safety_category.value === action.safety_category
        ).states,
        statesToBeLoaded2: data.safety_categories.find(
          (safety_category) => safety_category.value === action.safety_category
        ).states2,
      };
    case CLEAR:
    default:
      return initialState;
  }
}

export default function AddEventPage({}) {
  const { user, getIdentityData } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [employeeName, setEmployeeName] = useState("");
  const [employeeDept, setEmployeeDept] = useState("");
  let today = moment().format("YYYY-MM-DD");
  const router = useRouter();
  const [values, setValues] = useState({
    date_of_audit: "",
    due_date_of_close: today,
    pic: "",
    safety_category: "",
    potential_hazard: "",
    internal_3rdparty: "",
    behaviour_category: "",
    location: "",
    description: "",
    corrective_action: "",
    preventive_action: "",
    corrective_status: "",
    preventive_status: "",
    datesystem: today,
    department_area: "",
    footprint: user ? user.email : null,
    finding_audit_status: "",
  });

  useEffect(() => {
    async function fetchAuditBehaviourData() {
      const { id } = router.query;

      if (!id) {
        setLoading(false);
        return;
      }

      try {
        console.log("Fetching data for ID:", id);
        const res = await fetch(
          `http://10.24.0.155:3030/api/audit-behaviour/${id}`
        );

        if (!res.ok) {
          console.error("Failed to fetch:", res.status, res.statusText);
          toast.error("Failed to load data");
          setLoading(false);
          return;
        }

        const response = await res.json();
        console.log("Raw API response:", response);

        const data = response.data || response;
        console.log("Extracted data:", data);

        // Helper function untuk construct URL foto
        const constructImageURL = (filename) => {
          if (!filename) return null;
          if (filename.startsWith("http")) return filename;
          return `http://10.24.0.155:3030/uploads/audit-behaviour/${filename}`;
        };

        // ✅ Fix due_date_of_close logic
        let dueDateClose;

        if (data.due_date_of_close && data.due_date_of_close !== null) {
          // Jika sudah ada di database, gunakan yang existing
          dueDateClose = data.due_date_of_close.split("T")[0];
          console.log("Using existing due_date_of_close:", dueDateClose);
        } else {
          // Jika null/kosong, set ke current date
          dueDateClose = moment().format("YYYY-MM-DD");
          console.log(
            "Auto-set due_date_of_close to current date:",
            dueDateClose
          );
        }

        setValues((prevValues) => ({
          ...prevValues,
          date_of_audit: data.date_of_audit
            ? data.date_of_audit.split("T")[0]
            : "",
          due_date_of_close: dueDateClose, // ✅ Gunakan value yang sudah di-calculate
          pic: data.pic || "",
          footprint: data.footprint || user ? user.email : null,
          safety_category: data.safety_category || "",
          potential_hazard: data.potential_hazard || null,
          internal_3rdparty: data.internal_3rdparty || "",
          behaviour_category: data.behaviour_category || "",
          location: data.location || "",
          description: data.description || "",
          corrective_action: data.corrective_action || "",
          preventive_action: data.preventive_action || "",
          corrective_status: data.corrective_status || "",
          preventive_status: data.preventive_status || "",
          department_area: data.department_area || "",
          finding_audit_status: data.finding_audit_status || "",
          photo_before: data.photo_before || null,
          photo_before_preview: constructImageURL(data.photo_before),
          photo_after_preview: constructImageURL(data.photo_after),
        }));

        // Update reducer untuk dropdown
        if (data.safety_category) {
          dispatch({
            type: POPULATE_STATE,
            safety_category: data.safety_category,
          });
        }

        console.log("Data loaded successfully");
        console.log("Final due_date_of_close value:", dueDateClose);

        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch audit behaviour data:", err);
        toast.error("Error loading data");
        setLoading(false);
      }
    }

    fetchAuditBehaviourData();
  }, [router.query.id]);

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];

    console.log(`File selected for ${name}:`, file);

    if (file) {
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);

      setValues({
        ...values,
        [name]: file,
        [`${name}_preview`]: previewUrl, // Tambahkan preview URL
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(values);
    // Validation

    const { id } = router.query;
    const isEditMode = !!id;

    const hasEmptyFields = Object.values(values).some(
      (element) => element === ""
    );

    if (
      values.corrective_status == "Open" &&
      values.preventive_status == "Open"
    ) {
      values.finding_audit_status = "Open";
    } else if (
      values.corrective_status == "Close" &&
      values.preventive_status == "Open"
    ) {
      values.finding_audit_status = "Open";
    } else if (
      values.corrective_status == "Open" &&
      values.preventive_status == "Close"
    ) {
      values.finding_audit_status = "Open";
    } else if (
      values.corrective_status == "Close" &&
      values.preventive_status == "Close"
    ) {
      values.finding_audit_status = "Close";
    }

    // Log setelah setting finding_audit_status
    console.log("Form values after finding_audit_status set:", values);

    if (hasEmptyFields) {
      toast.error("Please fill in all fields");
    } else {
      setLoading(true);

      const formData = new FormData();

      // Tambahkan logging lebih detail di frontend
      const appendField = (key, value) => {
        console.log(
          `Attempting to append: ${key} = ${value} (type: ${typeof value})`
        );

        if (
          value !== null &&
          value !== undefined &&
          value !== "" &&
          value !== "undefined"
        ) {
          formData.append(key, value);
          console.log(`Successfully appended: ${key}`);
        } else {
          console.log(`Skipped: ${key} (value was null/undefined/empty)`);
        }
      };

      // Check specifically for date_of_audit
      console.log("date_of_audit before append:", data.date_of_audit);
      appendField("date_of_audit", data.date_of_audit);

      Object.keys(values).forEach((key) => {
        if (values[key] !== null && values[key] !== undefined) {
          // Jika field adalah file
          if (key === "photo_before" || key === "photo_after") {
            if (values[key] instanceof File) {
              formData.append(key, values[key]);
            }
          } else {
            // Field biasa (text, date, etc)
            formData.append(key, values[key]);
          }
        }
      });

      for (let [key, value] of formData.entries()) {
        if (value instanceof File) {
          console.log(`${key}:`, {
            type: "File",
            name: value.name,
            size: value.size,
            lastModified: value.lastModified,
          });
        } else {
          console.log(`${key}:`, value);
        }
      }

      const res = await fetch(
        `http://10.24.0.155:3030/api/audit-behaviour/${id}`,
        {
          method: "PUT",
          headers: {
            // "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!res.ok) {
        if (res.status === 403 || res.status === 401) {
          // toast.error("No token included");
          console.log("No token included");
          return;
        }
        console.log(res);
        setLoading(false);
        console.log(res.message);
      } else {
        // const evt = await res.json();
        router.push(`/auditBehaviours`);
        setTimeout(() => {
          setLoading(false);
        }, 20000);
      }
    }

    //console.log akan diganti fetch api
    // console.log(values);
  };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setValues({ ...values, [name]: value });
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Jika yang diubah adalah corrective_action, update juga preventive_action
    if (name === "corrective_action") {
      setValues({ ...values, [name]: value, preventive_action: value });
    } else if (name === "date_of_audit") {
      const auditDate = new Date(value);
      auditDate.setDate(auditDate.getDate() + 1);
      const dueDateClose = moment(auditDate).format("YYYY-MM-DD");

      setValues({
        ...values,
        [name]: value,
        due_date_of_close: dueDateClose,
      });
    } else {
      setValues({ ...values, [name]: value });
    }
  };

  // Modifikasi handleInputChange2 untuk menggunakan employeeName dan employeeDept
  const handleInputChange2 = () => {
    setValues({
      ...values,
      department_area: employeeDept,
      pic: employeeName,
    });
  };

  useEffect(() => {
    if (employeeName && employeeDept) {
      handleInputChange2();
    }
  }, [employeeName, employeeDept]);

  const handleInputChange3 = (e) => {
    // const { name, value } = e.value;
    setValues({ ...values, location: e.value });
  };

  const handleInputChange4 = (e) => {
    // const { name, value } = e.value;
    // console.log(e.value);
    console.log(e.value);
    if (e.value == "Safety Inspection Positive" || e.value == "Safe Act") {
      setValues({
        ...values,
        safety_category: e.value,
        preventive_action: "-",
        corrective_action: "-",
        corrective_status: "Close",
        preventive_status: "Close",
        finding_audit_status: "Close",
        potential_hazard: "Tidak ada Potensi Bahaya",
      });
      // console.log(
      //   e.preventive_action,
      //   e.corrective_action,
      //   e.corrective_status,
      //   e.preventive_status,
      //   e.finding_audit_status,
      //   e.potential_hazard
      // );
    } else {
      setValues({
        ...values,
        safety_category: e.value,
        preventive_action: " ",
        corrective_action: " ",
        potential_hazard: " ",
        finding_audit_status: " ",
      });
      // console.log(
      //   e.preventive_action,
      //   e.corrective_action,
      //   e.corrective_status,
      //   e.preventive_status,
      //   e.finding_audit_status,
      //   e.potential_hazard
      // );
    }
    // setValues({ ...values, corrective_status: e.value });
  };

  const handleInputChange5 = (e) => {
    // const { name, value } = e.value;
    setValues({ ...values, internal_3rdparty: e.value });
  };

  const handleInputChange6 = (e) => {
    // Update corrective_status dan preventive_status secara bersamaan
    setValues({
      ...values,
      corrective_status: e.value,
      preventive_status: e.value, // Tambahkan ini
    });
  };

  const handleInputChange7 = (e) => {
    // const { name, value } = e.value;
    setValues({ ...values, preventive_status: e.value });
  };

  const handleInputChange8 = (e) => {
    // const { name, value } = e.value;
    setValues({ ...values, potential_hazard: e.value });
  };

  const handleInputChange9 = (e) => {
    // const { name, value } = e.value;
    setValues({ ...values, behaviour_category: e.value });
  };

  const checkUser = (username) => {
    if (!username) {
      router.push(`/`);
    }
  };

  useEffect(() => {
    // Get employee data
    const empName = getIdentityData("employee_name") || "";
    const empDept = getIdentityData("section_name") || "";

    console.log("=== SETTING EMPLOYEE DATA ===");
    console.log("empName from getIdentityData:", empName);
    console.log("empDept from getIdentityData:", empDept);

    setEmployeeName(empName);
    setEmployeeDept(empDept);

    // Set values langsung di sini untuk memastikan sinkronisasi
    if (empName && empDept) {
      console.log("Updating values with employee data");
      setValues((prevValues) => ({
        ...prevValues,
        department_area: empDept,
        pic: empName,
      }));
      console.log("Values updated with:", {
        pic: empName,
        department_area: empDept,
      });
    }

    const username = getCookie("username");
    checkUser(username);
  }, [getIdentityData]);

  return (
    <Layout title="Add New Event">
      <Link href="/events">Go Back</Link>
      <h1>Add Audit Behaviour / Near Miss</h1>
      <ToastContainer />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="date_of_audit">Date of Audit</label>
            <input
              type="date"
              name="date_of_audit"
              id="date_of_audit"
              // min={tanggalSiji}
              disabled={true}
              // max={today}
              value={values.date_of_audit}
              // onChange={handleInputChange}
            ></input>
          </div>
          {/* <div>
            <label htmlFor="due_date_of_close">Due Date of Close</label>
            <input
              type="date"
              name="due_date_of_close"
              id="due_date_of_close"
              min={tanggalSiji}
              value={values.due_date_of_close}
              onChange={handleInputChange}
            ></input>
          </div> */}
          <input
            type="hidden"
            name="due_date_of_close"
            id="due_date_of_close"
            value={values.due_date_of_close}
          />

          <div>
            <label htmlFor="pic">Auditor</label>
            <Select
              value={
                employeeName
                  ? {
                      value: employeeName,
                      label: employeeName + " / " + employeeDept,
                    }
                  : null
              }
              name="pic"
              id="pic"
              placeholder="Select Auditor"
              isDisabled={true} // Ubah menjadi false
              onChange={handleInputChange2}
            />
          </div>
          <div>
            <label htmlFor="safety_category">Safety Category</label>
            <Select
              value={
                values.safety_category
                  ? {
                      value: values.safety_category,
                      label:
                        data.safety_categories.find(
                          (cat) => cat.value === values.safety_category
                        )?.label || values.safety_category,
                    }
                  : null
              }
              isDisabled={true}
              isLoading={state.loadingState}
              name="safety_category"
              options={data.safety_categories}
              onChange={(e) => {
                dispatch({
                  type: POPULATE_STATE,
                  safety_category: e.value,
                });
                handleInputChange4(e);
              }}
            />
          </div>
          {/* <div>
            <label htmlFor="state">Potential Hazard</label>

            {values.safety_category == "Safety Inspection Positive" ||
            values.safety_category == "Safe Act" ? (
              <input
                type="text"
                disabled
                name="potential_hazard"
                id="potential_hazard"
                value={values.potential_hazard}
                onChange={handleInputChange8}
              ></input>
            ) : (
              <Select
                // isClearable
                // isSearchable
                // placeholder="Potential Hazard"
                name="potential_hazard"
                options={state.statesToBeLoaded}
                onChange={(e) => {
                  setSdata2(e);
                  handleInputChange8(e);
                }}
              />
            )}
          </div> */}
          <div>
            <label htmlFor="behaviour_category">Behaviour category</label>
            <Select
              value={
                values.behaviour_category
                  ? {
                      value: values.behaviour_category,
                      label:
                        state.statesToBeLoaded2.find(
                          (cat) => cat.value === values.behaviour_category
                        )?.label || values.behaviour_category,
                    }
                  : null
              }
              isDisabled={true}
              name="behaviour_category"
              options={state.statesToBeLoaded2}
              onChange={(e) => {
                handleInputChange9(e);
              }}
            />
          </div>
          <div>
            <label htmlFor="location">Audit Area</label>
            <Select
              value={
                values.location
                  ? {
                      value: values.location,
                      label:
                        optionsArea.find(
                          (area) => area.value === values.location
                        )?.label || values.location,
                    }
                  : null
              }
              isDisabled={true}
              name="location"
              id="location"
              onChange={handleInputChange3}
              options={optionsArea}
            />
          </div>
          <div>
            <label>Internal / 3rd Party</label>
            <div style={{ display: "flex", gap: "15px", marginTop: "5px" }}>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <input
                  type="radio"
                  name="internal_3rdparty"
                  value="Internal"
                  disabled={true}
                  checked={values.internal_3rdparty === "Internal"}
                  onChange={handleInputChange}
                  style={{
                    marginRight: "5px",
                    width: "16px",
                    height: "16px",
                    accentColor: "#007bff",
                  }}
                />
                Internal
              </label>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <input
                  type="radio"
                  name="internal_3rdparty"
                  value="Third Party"
                  disabled={true}
                  checked={values.internal_3rdparty === "Third Party"}
                  onChange={handleInputChange}
                  style={{
                    marginRight: "5px",
                    width: "16px",
                    height: "16px",
                    accentColor: "#007bff",
                  }}
                />
                Third Party
              </label>
            </div>
          </div>
          {/* <div>
            <label htmlFor="internal_3rdparty">Internal / 3rd Party</label>
            <Select
              defaultValue={values.internal_3rdparty}
              // value={values.internal_3rdparty}
              // onChange={setSelectedOption}
              name="internal_3rdparty"
              id="internal_3rdparty"
              onChange={handleInputChange5}
              options={optionInternal}
            />
          </div> */}
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="description">Audit Description</label>
          <textarea
            type="text"
            name="description"
            id="description"
            disabled={true}
            placeholder="Enter audit description..."
            value={values.description}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="corrective_action">
            Actions That Must be Taken (Temporary/Recommendations)
          </label>
          {values.safety_category == "Safety Inspection Positive" ||
          values.safety_category == "Safe Act" ? (
            <textarea
              type="text"
              name="corrective_action"
              id="corrective_action"
              placeholder="Enter corrective action..."
              value={values.corrective_action}
              onChange={handleInputChange}
            ></textarea>
          ) : (
            <textarea
              type="text"
              name="corrective_action"
              placeholder="Enter corrective action..."
              id="corrective_action"
              value={values.corrective_action}
              onChange={handleInputChange}
            ></textarea>
          )}
        </div>
        <div>
          <input
            type="hidden"
            name="preventive_action"
            id="preventive_action"
            value={values.corrective_action}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="corrective_status">Corrective Status</label>
          {values.safety_category == "Safety Inspection Positive" ||
          values.safety_category == "Safe Act" ? (
            <input
              type="text"
              name="corrective_status"
              id="corrective_status"
              value={values.corrective_status}
              onChange={handleInputChange6}
            />
          ) : (
            <Select
              value={
                values.corrective_status
                  ? {
                      value: values.corrective_status,
                      label:
                        optionOpenClose.find(
                          (opt) => opt.value === values.corrective_status
                        )?.label || values.corrective_status,
                    }
                  : null
              }
              onChange={handleInputChange6}
              name="corrective_status"
              id="corrective_status"
              options={optionOpenClose}
            />
          )}
        </div>
        <div>
          <input
            type="hidden"
            name="preventive_status"
            id="preventive_status"
            value={values.corrective_status}
          />
        </div>
        <div className={styles.grid}>
          {values.safety_category !== "Safe Act" &&
            values.safety_category !== "Unsafe Act" &&
            values.safety_category !== "Safety Inspection Positive" && (
              <>
                <div>
                  <label htmlFor="photo_before">Photo Before (Evidence)</label>
                  <input
                    type="file"
                    name="photo_before"
                    id="photo_before"
                    accept="image/*"
                    disabled={true} // Tetap disabled karena tidak bisa diubah
                    onChange={handleFileChange}
                    style={{
                      padding: "8px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      width: "100%",
                      backgroundColor: "#f5f5f5", // Visual indicator bahwa disabled
                      cursor: "not-allowed",
                    }}
                  />

                  {values.photo_before_preview && (
                    <div style={{ marginTop: "10px" }}>
                      <p
                        style={{
                          fontSize: "12px",
                          color: "#666",
                          marginBottom: "5px",
                        }}
                      >
                        Current photo before:
                      </p>
                      <img
                        src={values.photo_before_preview}
                        alt="Current Photo Before"
                        style={{
                          maxWidth: "200px",
                          maxHeight: "150px",
                          border: "1px solid #ddd",
                          borderRadius: "4px",
                          objectFit: "cover",
                        }}
                        onError={(e) => {
                          console.error(
                            "Error loading photo before:",
                            values.photo_before_preview
                          );
                          e.target.style.display = "none";
                          // Pesan error
                          e.target.parentNode.innerHTML = `
                  <p style="color: red; font-size: 12px;">
                    Unable to load photo before
                  </p>
                `;
                        }}
                        onLoad={() => {
                          console.log(
                            "Photo before loaded successfully:",
                            values.photo_before_preview
                          );
                        }}
                      />
                    </div>
                  )}

                  {!values.photo_before_preview && (
                    <div style={{ marginTop: "10px" }}>
                      <p
                        style={{
                          fontSize: "12px",
                          color: "#999",
                          fontStyle: "italic",
                        }}
                      >
                        No photo before available
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="photo_after">
                    Photo After (Corrective Action)
                  </label>
                  <input
                    type="file"
                    name="photo_after"
                    id="photo_after"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{
                      padding: "8px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      width: "100%",
                    }}
                  />
                  {values.photo_after && (
                    <div style={{ marginTop: "10px" }}>
                      <p
                        style={{
                          fontSize: "12px",
                          color: "#666",
                          marginBottom: "5px",
                        }}
                      >
                        Selected: {values.photo_after.name}
                      </p>
                      {values.photo_after_preview && (
                        <img
                          src={values.photo_after_preview}
                          alt="Photo After Preview"
                          style={{
                            maxWidth: "200px",
                            maxHeight: "150px",
                            border: "1px solid #ddd",
                            borderRadius: "4px",
                            objectFit: "cover",
                          }}
                        />
                      )}
                    </div>
                  )}
                </div>
              </>
            )}

          {(values.safety_category === "Safe Act" ||
            values.safety_category === "Unsafe Act" ||
            values.safety_category === "Safety Inspection Positive") && (
            <div
              style={{
                gridColumn: "1 / -1",
                textAlign: "center",
                padding: "20px",
                backgroundColor: "#f8f9fa",
                border: "1px solid #dee2e6",
                borderRadius: "4px",
                color: "#6c757d",
              }}
            >
              <p style={{ margin: 0, fontStyle: "italic" }}>
                📸 Photo uploads are not required
              </p>
            </div>
          )}
        </div>
        {loading ? (
          <CircularProgress />
        ) : (
          <input
            type="submit"
            value="Add Audit Behaviour"
            className="btn"
            disabled={loading}
          />
        )}
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
