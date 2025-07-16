import React, { useReducer, useState, useContext, useEffect } from "react";
import { parseCookies } from "@/helpers/index";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import ReactDOM from "react-dom";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import styles from "@/styles/Form.module.css";
import AuthContext from "@/context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";

// import dayjs from "dayjs";

// const daftarPIC = pic.map((orang) => {
//   return {
//     value: orang.name,
//     label: orang.name,
//   };
// });

const optionsArea = [
  { value: "MP-Decon Milk", label: "MP-Decon Milk" },
  { value: "MP-Processing Milk", label: "MP-Processing Milk" },
  { value: "MP-Milk Blending Room", label: "MP-Milk Blending Room" },
  {
    value: "MP-CIP Kitchen Milk Processing",
    label: "MP-CIP Kitchen Milk Processing",
  },
  {
    value: "MP-Control Room & Ruang Panel",
    label: "MP-Control Room & Ruang Panel",
  },
  { value: "MP-Area Outside (Silo)", label: "MP-Area Outside (Silo)" },
  {
    value: "MP-Workshop Processing Milk",
    label: "MP-Workshop Processing Milk",
  },
  { value: "MF-Milk Filling Machine", label: "MF-Milk Filling Machine" },
  {
    value: "MF-Reprocess & Chemical Milk",
    label: "MF-Reprocess & Chemical Milk",
  },
  { value: "MF-CIP Filling Milk", label: "MF-CIP Filling Milk" },
  { value: "MF-Sparepart Filling Milk", label: "MF-Sparepart Filling Milk" },
  {
    value: "MF-Packaging Material Milk Filling",
    label: "MF-Packaging Material Milk Filling",
  },
  { value: "MF-Packing Milk", label: "MF-Packing Milk" },
  { value: "MF-Palletizing Milk", label: "MF-Palletizing Milk" },
  { value: "YG-Decon Yogurt", label: "YG-Decon Yogurt" },
  {
    value: "YG-Area RM & Timbang Yogurt",
    label: "YG-Area RM & Timbang Yogurt",
  },
  { value: "YG-CIP Kitchen Yogurt", label: "YG-CIP Kitchen Yogurt" },
  { value: "YG-Processing Yogurt", label: "YG-Processing Yogurt" },
  { value: "YG-Multipack Yogurt", label: "YG-Multipack Yogurt" },
  { value: "YG-Mesin Filling RTD", label: "YG-Mesin Filling RTD" },
  {
    value: "YG-Mesin Filling Stirred Nova",
    label: "YG-Mesin Filling Stirred Nova",
  },
  { value: "YG-Mesin Filling Pouch", label: "YG-Mesin Filling Pouch" },
  { value: "YG-Freezer Yogurt", label: "YG-Freezer Yogurt" },
  { value: "YG-Dynamix Mixer", label: "YG-Dynamix Mixer" },
  { value: "YG-Area E-sleeve", label: "YG-Area E-sleeve" },
  { value: "YG-Packing Yogurt", label: "YG-Packing Yogurt" },
  { value: "YG-Palletizing Yogurt", label: "YG-Palletizing Yogurt" },
  { value: "CS-Decon Cheese", label: "CS-Decon Cheese" },
  { value: "CS-Processing Cheese", label: "CS-Processing Cheese" },
  { value: "CS-Primary Packing Cheese", label: "CS-Primary Packing Cheese" },
  { value: "CS-Secondary Packing Lt.1", label: "CS-Secondary Packing Lt.1" },
  { value: "CS-Dry Off Room", label: "CS-Dry Off Room" },
  { value: "CS-Shredded Room ", label: "CS-Shredded Room " },
  {
    value: "CS-Area Material & Packaging Lt. 2",
    label: "CS-Area Material & Packaging Lt. 2",
  },
  { value: "CS-Cold Storage Cheese", label: "CS-Cold Storage Cheese" },
  { value: "CS-Frozen Container", label: "CS-Frozen Container" },
  {
    value: "CS-Secondary Packing Cheese Lt. 2",
    label: "CS-Secondary Packing Cheese Lt. 2",
  },
  { value: "CS-Workshop Cheese", label: "CS-Workshop Cheese" },
  { value: "UT-Chiller ", label: "UT-Chiller " },
  { value: "UT-Boiler", label: "UT-Boiler" },
  { value: "UT-Warehouse Cangkang", label: "UT-Warehouse Cangkang" },
  { value: "UT-Workshop Engineering", label: "UT-Workshop Engineering" },
  {
    value: "UT-Waste Water Treatment Plant (WWTP)",
    label: "UT-Waste Water Treatment Plant (WWTP)",
  },
  {
    value: "UT-Area Penyimpanan Spare Part & Chemical",
    label: "UT-Area Penyimpanan Spare Part & Chemical",
  },
  {
    value: "UT-Water Treatment Plant (WTP)",
    label: "UT-Water Treatment Plant (WTP)",
  },
  { value: "UT-UPS dan Genset ", label: "UT-UPS dan Genset " },
  { value: "UT-Compressor", label: "UT-Compressor" },
  { value: "UT-Trafo depan", label: "UT-Trafo depan" },
  { value: "BF-Taman", label: "BF-Taman" },
  { value: "BF-Selokan ", label: "BF-Selokan " },
  { value: "BF-Jalan & Pedestrian ", label: "BF-Jalan & Pedestrian " },
  { value: "BF-Perimeter Bangunan", label: "BF-Perimeter Bangunan" },
  { value: "BF-Building (Outside)", label: "BF-Building (Outside)" },
  { value: "BF-Area Parkir Truck", label: "BF-Area Parkir Truck" },
  { value: "BF-Smoking Area", label: "BF-Smoking Area" },
  { value: "BF-Kontainer Selatan", label: "BF-Kontainer Selatan" },
  { value: "HR-Loker Pos 2", label: "HR-Loker Pos 2" },
  { value: "HR-Kantin", label: "HR-Kantin" },
  { value: "HR-Ruang Tunggu Driver", label: "HR-Ruang Tunggu Driver" },
  { value: "HR-Auditorium", label: "HR-Auditorium" },
  { value: "HR-Masjid", label: "HR-Masjid" },
  { value: "HR-Laundry", label: "HR-Laundry" },
  { value: "HR-Janitor", label: "HR-Janitor" },
  { value: "HR-Parkir Mobil", label: "HR-Parkir Mobil" },
  { value: "HR-Parkir Sepeda Motor", label: "HR-Parkir Sepeda Motor" },
  { value: "HR-Kantor BS", label: "HR-Kantor BS" },
  { value: "SH-Pos 1", label: "SH-Pos 1" },
  { value: "SH-Pos 2", label: "SH-Pos 2" },
  { value: "SH-Pos Pantau ", label: "SH-Pos Pantau " },
  { value: "SH-TPS LB3", label: "SH-TPS LB3" },
  { value: "SH-Klinik", label: "SH-Klinik" },
  { value: "SH-TPS Sampah Ekonomis", label: "SH-TPS Sampah Ekonomis" },
  { value: "SH-TPS Sampah Non-Ekonomis", label: "SH-TPS Sampah Non-Ekonomis" },
  {
    value: "LO-Unloading Road Tanker Milk",
    label: "LO-Unloading Road Tanker Milk",
  },
  {
    value: "LO-Warehouse Material (Utara)",
    label: "LO-Warehouse Material (Utara)",
  },
  { value: "LO-Warehouse Spare part", label: "LO-Warehouse Spare part" },
  {
    value: "LO-Warehouse Packaging (Selatan)",
    label: "LO-Warehouse Packaging (Selatan)",
  },
  { value: "LO-Warehouse Dry Baru", label: "LO-Warehouse Dry Baru" },
  { value: "LO-Warehouse Dry Lama", label: "LO-Warehouse Dry Lama" },
  { value: "LO-Warehouse Chilled Lama", label: "LO-Warehouse Chilled Lama" },
  { value: "LO-Warehouse Chilled Baru", label: "LO-Warehouse Chilled Baru" },
  { value: "LA-LAB Mikro", label: "LA-LAB Mikro" },
  { value: "LA-LAB Kimia", label: "LA-LAB Kimia" },
  { value: "QC-QC Office", label: "QC-QC Office" },
  {
    value: "QC-QC Inkubasi 7, 30, 24 & 55",
    label: "QC-QC Inkubasi 7, 30, 24 & 55",
  },
  { value: "QC-QC Inkubasi 4", label: "QC-QC Inkubasi 4" },
  { value: "QC-QC Repacking", label: "QC-QC Repacking" },
];

const optionInternal = [
  // { label: "-", value: "-" },
  { label: "Internal", value: "Internal" },
  { label: "Third Party", value: "Third Party" },
];

const optionOpenClose = [
  // { label: "-", value: "-" },
  { label: "Open", value: "Open" },
  { label: "Close", value: "Close" },
];

////////////////////////////////////////////////////////////////////////
// untuk select multi
////////////////////////////////
const POPULATE_STATE = "populateState";
const CLEAR = "clear";

const data = {
  safety_categories: [
    {
      label: "Behavior Personal",
      value: "Behavior Personal",
      states: [
        {
          value: "Minor",
          label: "Minor",
        },
        {
          value: "Major",
          label: "Major",
        },
        // { value: "Serius", label: "Serius (Berpotensi RDC & MTC)" },
      ],
      states2: [
        { value: "Personal Hygiene", label: "Personal Hygiene" },
        {
          value: "Fasilitas Personal Hygiene dan Toilet",
          label: "Fasilitas Personal Hygiene dan Toilet",
        },
        {
          value: "Seragam hygiene, APD dan Decon",
          label: "Seragam hygiene, APD dan Decon",
        },
      ],
    },
    {
      label: "Program Cleaning & Housekeeping",
      value: "Program Cleaning & Housekeeping",
      states: [
        {
          value: "Minor",
          label: "Minor",
        },
        {
          value: "Major",
          label: "Major",
        },
      ],
      states2: [
        {
          value: "Daily Cleaning  dan Housekeeping",
          label: "Daily Cleaning  dan Housekeeping",
        },
        {
          value: "Peralatan dan Bahan Kimia Cleaning",
          label: "Peralatan dan Bahan Kimia Cleaning",
        },
        {
          value: "Cleaning Food Contact Produksi",
          label: "Cleaning Food Contact Produksi",
        },
        { value: "Pembuangan Limbah", label: "Pembuangan Limbah" },
      ],
    },
    {
      label: "Pengendalian Risiko & Bahaya Kontaminasi",
      value: "Pengendalian Risiko & Bahaya Kontaminasi",
      states: [
        {
          value: "Minor",
          label: "Minor",
        },
        {
          value: "Major",
          label: "Major",
        },
      ],
      states2: [
        {
          value:
            "Pengendalian Kontaminan (Bahan Glass dan Hard Plastic, ATK, loosen part) & Device (Filter, Strainer, Magnet Trap, dll)",
          label:
            "Pengendalian Kontaminan (Bahan Glass dan Hard Plastic, ATK, loosen part) & Device (Filter, Strainer, Magnet Trap, dll)",
        },
        { value: "Penanganan Allergen", label: "Penanganan Allergen" },
        {
          value: "Pengendalian Bahan Kimia dan Lubricant",
          label: "Pengendalian Bahan Kimia dan Lubricant",
        },
        {
          value: "Penyimpanan Material, Packaging, Produk, Spare part",
          label: "Penyimpanan Material, Packaging, Produk, Spare part",
        },
        {
          value: "Pengendalian Operasional (Quality/ Food Safety Issue)",
          label: "Pengendalian Operasional (Quality/ Food Safety Issue)",
        },
        {
          value: "Stuffing dan Transportasi Produk",
          label: "Stuffing dan Transportasi Produk",
        },
        {
          value: "Pengendalian Hama (Pest Control)",
          label: "Pengendalian Hama (Pest Control)",
        },
        {
          value: "Rework (Soritr, Reproses & Repacking)",
          label: "Rework (Soritr, Reproses & Repacking)",
        },
      ],
    },
    {
      label: "Pemeliharaan Sarana & Prasarana",
      value: "Pemeliharaan Sarana & Prasarana",
      states: [
        {
          value: "Minor",
          label: "Minor",
        },
        {
          value: "Major",
          label: "Major",
        },
      ],
      states2: [
        {
          value: "Bangunan, Lokasi dan Lingkungan (Area Luar)",
          label: "Bangunan, Lokasi dan Lingkungan (Area Luar)",
        },
        {
          value:
            "Internal structure (Lantai, Dinding, Drainase, Langit-langit, Pintu, Jendela, Pencahayaan)",
          label:
            "Internal structure (Lantai, Dinding, Drainase, Langit-langit, Pintu, Jendela, Pencahayaan)",
        },
        {
          value: "Konstruksi dan Desain Hygiene Mesin dan Peralatan",
          label: "Konstruksi dan Desain Hygiene Mesin dan Peralatan",
        },
        { value: "Kalibrasi Alat Ukur", label: "Kalibrasi Alat Ukur" },
        {
          value:
            "Utilitas - Water, Compressed Air, Steam Supply, Chilled Water, Unit Make up Udara (AHU, HVAC), WWTP",
          label:
            "Utilitas - Water, Compressed Air, Steam Supply, Chilled Water, Unit Make up Udara (AHU, HVAC), WWTP",
        },
        {
          value: "Peralatan Transportasi (forklift, liftruck, handpallet, dll)",
          label: "Peralatan Transportasi (forklift, liftruck, handpallet, dll)",
        },
      ],
    },
    // {
    //   label: "Near Miss",
    //   value: "Near Miss",
    //   states: [
    //     {
    //       value: "Minor",
    //       label: "Minor",
    //     },
    //     {
    //       value: "Major",
    //       label: "Major",
    //     },
    //     { value: "Serius", label: "Serius (Berpotensi RDC & MTC)" },
    //   ],
    //   states2: [
    //     {
    //       label: "-",
    //       value: "-",
    //     },
    //   ],
    // },
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
        // disableCountry: true,
        // disableState: false,
        // loadingState: true,
        statesToBeLoaded: data.safety_categories.find(
          (gmp_category) => gmp_category.value === action.gmp_category
        ).states,
        statesToBeLoaded2: data.safety_categories.find(
          (gmp_category) => gmp_category.value === action.gmp_category
        ).states2,
      };
    case CLEAR:
    default:
      return initialState;
  }
}

//END untuk select multi
// //////////////////////////////

export default function AddEventPage({ token }) {
  const { user } = useContext(AuthContext);
  const [pic, setPic] = useState([]);
  const [options, setOptions] = useState([]);
  const [optionsDept, setOptionsDept] = useState([]);
  const [loading, setLoading] = useState(false);
  let today = moment().format("YYYY-MM-DD");
  // var hariIni = new Date().toISOString().split("T")[0];
  const date = new Date();
  const tanggal1 = new Date(date.getFullYear(), date.getMonth());
  let tanggalSiji = moment(tanggal1).format("YYYY-MM-DD");
  const [values, setValues] = useState({
    date_of_audit: "",
    due_date_of_close: "",
    pic: "", //auto by login
    gmp_category: "",
    grading_finding: "",
    internal_3rdparty: "",
    gmp_subcategory: "",
    location: "",
    internal_3rdparty: "",
    description: "",
    corrective_action: "",
    preventive_action: "",
    corrective_status: "",
    preventive_status: "",
    datesystem: today,
    department_area: "", // auto by rumus
    footprint: user ? user.email : null, // auto by login
    finding_audit_status: "", // rumus

    // safety_patrol: "", // ga dipake
    // photo_before: "",
    // phot_after: "",
    // locationpic: "",
  });
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState(null);

  const [state, dispatch] = useReducer(reducer, initialState);
  const [sdata, setSdata] = useState("");
  const [sdata2, setSdata2] = useState("");
  const [sdata3, setSdata3] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(values);
    // Validation
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

    if (values.due_date_of_close < values.date_of_audit) {
      // alert("Tanggal close tidak boleh sebelum tanggal close");
      toast.error("Due date of close should be after date of audit");
    } else if (hasEmptyFields) {
      toast.error("Please fill in all fields");
    } else {
      setLoading(true);
      const res = await fetch(`http://10.24.7.70:8080/addGMP`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });

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
        router.push(`/gmp`);
        setTimeout(() => {
          setLoading(false);
        }, 20000);
      }
    }

    //console.log akan diganti fetch api
    // console.log(values);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleInputChange2 = (e) => {
    // const { name, value } = e.value;
    // setValues({ ...values, pic: e.value });
    // set value departement from mapping optionsDept
    const findDep = optionsDept.find(({ named }) => named == e.value);
    // console.log(findDep.dept);
    setValues({ ...values, department_area: findDep.dept, pic: e.value });
  };

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
        gmp_category: e.value,
        preventive_action: "-",
        corrective_action: "-",
        corrective_status: "Close",
        preventive_status: "Close",
        finding_audit_status: "Close",
        grading_finding: "Tidak ada Potensi Bahaya",
      });
      // console.log(
      //   e.preventive_action,
      //   e.corrective_action,
      //   e.corrective_status,
      //   e.preventive_status,
      //   e.finding_audit_status,
      //   e.grading_finding
      // );
    } else {
      setValues({
        ...values,
        gmp_category: e.value,
        preventive_action: " ",
        corrective_action: " ",
        grading_finding: " ",
        finding_audit_status: " ",
      });
      // console.log(
      //   e.preventive_action,
      //   e.corrective_action,
      //   e.corrective_status,
      //   e.preventive_status,
      //   e.finding_audit_status,
      //   e.grading_finding
      // );
    }
    // setValues({ ...values, corrective_status: e.value });
  };

  const handleInputChange5 = (e) => {
    // const { name, value } = e.value;
    setValues({ ...values, internal_3rdparty: e.value });
  };

  const handleInputChange6 = (e) => {
    // const { name, value } = e.value;
    setValues({ ...values, corrective_status: e.value });
  };

  const handleInputChange7 = (e) => {
    // const { name, value } = e.value;
    setValues({ ...values, preventive_status: e.value });
  };

  const handleInputChange8 = (e) => {
    // const { name, value } = e.value;
    setValues({ ...values, grading_finding: e.value });
  };

  const handleInputChange9 = (e) => {
    // const { name, value } = e.value;
    setValues({ ...values, gmp_subcategory: e.value });
  };

  useEffect(() => {
    const fetchData = async () => {
      const arr = [];
      try {
        await fetch("http://10.24.7.70:8080/userDept", {
          method: "GET",
        })
          .then((response) => {
            return response.json(); // return response.json() first
          })
          .then((json) => {
            const options = json.map((d) => ({
              value: d.named,
              label: d.named,
            }));
            setOptions(options);
            //console.log(options);
            //optionsDept
            const optionsDept = json.map((d) => ({
              name: d.name,
              dept: d.dept,
              section: d.section,
              named: d.named,
            }));
            setOptionsDept(optionsDept);
            // console.log(optionsDept);
          });
      } catch (err) {
        console.log("terjadi error:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <Layout title="Add New Audit GMP">
      <Link href="/events">Go Back</Link>
      <h1>Add Audit GMP</h1>
      <ToastContainer />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="date_of_audit">Date of Audit</label>
            <input
              type="date"
              name="date_of_audit"
              id="date_of_audit"
              min={tanggalSiji}
              max={today}
              value={values.date_of_audit}
              onChange={handleInputChange}
            ></input>
          </div>
          <div>
            <label htmlFor="due_date_of_close">Due Date of Close</label>
            <input
              type="date"
              name="due_date_of_close"
              id="due_date_of_close"
              min={tanggalSiji}
              value={values.due_date_of_close}
              onChange={handleInputChange}
            ></input>
          </div>
          <div>
            <label htmlFor="pic">Auditor</label>
            <Select
              defaultValue={values.pic}
              name="pic"
              id="pic"
              onChange={handleInputChange2}
              options={options}
            />
          </div>
          <div>
            <label htmlFor="gmp_category">GMP Category</label>
            <Select
              isDisabled={state.disableCountry}
              isLoading={state.loadingState}
              // isClearable
              // isSearchable
              // placeholder="Safety Category"
              name="gmp_category"
              options={data.safety_categories}
              onChange={(e) => {
                dispatch({
                  type: POPULATE_STATE,
                  gmp_category: e.value,
                });
                // dispatch({ type: CLEAR });
                handleInputChange4(e);
                setSdata(e);
              }}
            />
          </div>
          <div>
            <label htmlFor="state">Grading finding</label>

            {values.gmp_category == "Safety Inspection Positive" ||
            values.gmp_category == "Safe Act" ? (
              <input
                type="text"
                disabled
                name="grading_finding"
                id="grading_finding"
                value={values.grading_finding}
                onChange={handleInputChange8}
              ></input>
            ) : (
              <Select
                // isClearable
                // isSearchable
                // placeholder="Potential Hazard"
                name="grading_finding"
                options={state.statesToBeLoaded}
                onChange={(e) => {
                  setSdata2(e);
                  handleInputChange8(e);
                }}
              />
            )}
          </div>
          <div>
            <label htmlFor="gmp_subcategory">GMP Sub-category</label>
            <Select
              // isClearable
              // isSearchable
              // placeholder="Behaviour category"
              name="gmp_subcategory"
              options={state.statesToBeLoaded2}
              onChange={(e) => {
                setSdata3(e);
                handleInputChange9(e);
              }}
            />
          </div>
          <div>
            <label htmlFor="location">Audit Area</label>
            <Select
              defaultValue={values.location}
              // value={values.location}
              // onChange={setSelectedOption}
              name="location"
              id="location"
              onChange={handleInputChange3}
              options={optionsArea}
            />
          </div>
          <div>
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
          </div>
        </div>

        <div>
          <label htmlFor="description">Audit Description</label>
          <textarea
            type="text"
            name="description"
            id="description"
            value={values.description}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className={styles.grid}>
          <div>
            <label htmlFor="corrective_action">Corrective Action</label>
            {values.gmp_category == "Safety Inspection Positive" ||
            values.gmp_category == "Safe Act" ? (
              <textarea
                type="text"
                name="corrective_action"
                id="corrective_action"
                disabled
                value={values.corrective_action}
                onChange={handleInputChange}
              ></textarea>
            ) : (
              <textarea
                type="text"
                name="corrective_action"
                id="corrective_action"
                value={values.corrective_action}
                onChange={handleInputChange}
              ></textarea>
            )}
          </div>
          <div>
            <label htmlFor="preventive_action">Preventive Action</label>
            {values.gmp_category == "Safety Inspection Positive" ||
            values.gmp_category == "Safe Act" ? (
              <textarea
                type="text"
                name="preventive_action"
                id="preventive_action"
                disabled
                value={values.preventive_action}
                onChange={handleInputChange}
              ></textarea>
            ) : (
              <textarea
                type="text"
                name="preventive_action"
                id="preventive_action"
                value={values.preventive_action}
                onChange={handleInputChange}
              ></textarea>
            )}
          </div>
          <div>
            <label htmlFor="corrective_status">Corrective Status</label>
            {values.gmp_category == "Safety Inspection Positive" ||
            values.gmp_category == "Safe Act" ? (
              <input
                type="text"
                disabled
                name="corrective_status"
                id="corrective_status"
                value={values.corrective_status}
                onChange={handleInputChange6}
              ></input>
            ) : (
              <Select
                defaultValue={values.corrective_status}
                onChange={handleInputChange6}
                // value={values.corrective_status}
                // onChange={setSelectedOption}
                name="corrective_status"
                id="corrective_status"
                options={optionOpenClose}
              />
            )}
          </div>
          <div>
            <label htmlFor="preventive_status">Preventive Status</label>
            {values.gmp_category == "Safety Inspection Positive" ||
            values.gmp_category == "Safe Act" ? (
              <input
                type="text"
                disabled
                name="preventive_status"
                id="preventive_status"
                value={values.preventive_status}
                onChange={handleInputChange7}
              ></input>
            ) : (
              <Select
                defaultValue={values.preventive_status}
                onChange={handleInputChange7}
                // value={values.preventive_status}
                // onChange={setSelectedOption}
                name="preventive_status"
                id="preventive_status"
                options={optionOpenClose}
              />
            )}
            {/* <Select
              defaultValue={values.preventive_status}
              value={values.preventive_status}
              // onChange={setSelectedOption}
              name="preventive_status"
              id="preventive_status"
              onChange={handleInputChange7}
              options={optionOpenClose}
            /> */}
          </div>
        </div>
        {loading ? (
          <CircularProgress />
        ) : (
          <input
            type="submit"
            value="Add GMP Audit"
            className="btn"
            disabled={loading}
          />
        )}
      </form>
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);

  return {
    props: {
      token,
    },
  };
}
