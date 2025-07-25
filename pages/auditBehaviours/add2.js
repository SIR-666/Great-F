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
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";

// import dayjs from "dayjs";

const options2 = [
  { value: "Adi_Nugroho", label: " Adi Nugroho" },
  { value: "Ahmad_Alvi_Syahrin", label: " Ahmad Alvi Syahrin" },
  { value: "Aji_Yahnuar_Prasetyo", label: " Aji Yahnuar Prasetyo" },
  { value: "Akmal_Adyarazan", label: " Akmal Adyarazan" },
  { value: "Andi_Suryo_Putro", label: " Andi Suryo Putro" },
  { value: "Yohanes_Sigit", label: " Yohanes Sigit" },
  { value: "Andri_Swasono", label: " Andri Swasono" },
  { value: "Ari_Isnadi", label: " Ari Isnadi" },
  { value: "Arief_Musthofa,_Stp", label: " Arief Musthofa, Stp" },
  { value: "Arif_Hidayatullah", label: " Arif Hidayatullah" },
  // { value: "Arifni_Choirussabila", label: " Arifni Choirussabila" },
  { value: "Array_Sidi_Tirtana", label: " Array Sidi Tirtana" },
  { value: "Avida_Nur_Hidayah", label: " Avida Nur Hidayah" },
  { value: "Bambang_Setyawan", label: " Bambang Setyawan" },
  { value: "Bhayu_Dian_Cahyono", label: " Bhayu Dian Cahyono" },
  { value: "Budi_Haryanto", label: " Budi Haryanto" },
  { value: "Cahyono", label: " Cahyono" },
  { value: "Danang_Galih", label: " Danang Galih" },
  { value: "Deni_Hari_Jaya", label: " Deni Hari Jaya" },
  { value: "Didik_Setyono_Adi", label: " Didik Setyono Adi" },
  { value: "Dwi_Prasetya_Adi", label: " Dwi Prasetya Adi" },
  { value: "Dwi_Putranto_Sulyandoko", label: " Dwi Putranto Sulyandoko" },
  { value: "Dyah_Ratri_Rahadini", label: " Dyah Ratri Rahadini" },
  { value: "Edy_Winarto", label: " Edy Winarto" },
  { value: "Eko_Retnaning_Puspitasari", label: " Eko Retnaning Puspitasari" },
  { value: "Eva_Yuliana_Ari_Wardhani", label: " Eva Yuliana Ari Wardhani" },
  { value: "Fadil_Amrulloh", label: " Fadil Amrulloh" },
  { value: "Faridah_Sri_Wahyuningsih", label: " Faridah Sri Wahyuningsih" },
  { value: "Hariyati,_Amd", label: " Hariyati, Amd" },
  { value: "Heri_Susanto", label: " Heri Susanto" },
  { value: "Ida_Wati", label: " Ida Wati" },
  { value: "Ido_Sigit_Triwinanto", label: " Ido Sigit Triwinanto" },
  { value: "Imam_Nurhadi", label: " Imam Nurhadi" },
  { value: "Imam_Suyoko", label: " Imam Suyoko" },
  { value: "Irma_Lesyana", label: " Irma Lesyana" },
  { value: "Irmansah", label: " Irmansah" },
  // { value: "Iswara", label: " Iswara" },
  { value: "Iwan_Purnomo", label: " Iwan Purnomo" },
  { value: "Jamaludin", label: " Jamaludin" },
  { value: "Jamingan", label: " Jamingan" },
  { value: "Joeng_Loekman_Adi_Oetomo", label: " Joeng Loekman Adi Oetomo" },
  // { value: "Jusep_Pramudanto", label: " Jusep Pramudanto" },
  { value: "Kholilurrahman", label: " Kholilurrahman" },
  { value: "Kusminardi", label: " Kusminardi" },
  { value: "Kustiadi", label: " Kustiadi" },
  { value: "Ladiono", label: " Ladiono" },
  { value: "Marjhy_Maratapatria", label: " Marjhy Maratapatria" },
  { value: "Minto", label: " Minto" },
  { value: "Mohammad_Tatok_Efendi", label: " Mohammad Tatok Efendi" },
  { value: "Mulyo_Kuntono", label: " Mulyo Kuntono" },
  { value: "Norma_Fabian_S", label: " Norma Fabian S" },
  { value: "Noviana_Ika_Setyaningrum", label: " Noviana Ika Setyaningrum" },
  { value: "Nur_Ngazam_Fuadi", label: " Nur Ngazam Fuadi" },
  // { value: "Nur_Sidiq", label: " Nur Sidiq" },
  { value: "Pungky_Artiwi", label: " Pungky Artiwi" },
  { value: "Puput_Mosthoqolifah", label: " Puput Mosthoqolifah" },
  { value: "R._Bambang_Tri_Atmadja", label: " R. Bambang Tri Atmadja" },
  { value: "Rahpuan_Katk", label: " Rahpuan Katk" },
  { value: "Ricky_Adi_Sanja", label: " Ricky Adi Sanja" },
  { value: "Rifai_Santoso", label: " Rifai Santoso" },
  { value: "Robby_Sashudi", label: " Robby Sashudi" },
  { value: "Roni_Pambudi", label: " Roni Pambudi" },
  { value: "Ronny_Hari_Prasetyono", label: " Ronny Hari Prasetyono" },
  { value: "Roufu_Rokhim", label: " Roufu Rokhim" },
  { value: "Ruswanto", label: " Ruswanto" },
  { value: "Saiful_Imam", label: " Saiful Imam" },
  { value: "Subroto", label: " Subroto" },
  { value: "Sudarwanto_", label: " Sudarwanto " },
  { value: "Sugiono,_Stp", label: " Sugiono, Stp" },
  { value: "Suherman_Hasan", label: " Suherman Hasan" },
  { value: "Suprayitno", label: " Suprayitno" },
  { value: "Supriadi", label: " Supriadi" },
  { value: "Susetyo_Hadi_Purwanto", label: " Susetyo Hadi Purwanto" },
  { value: "Syahrul_Marufi", label: " Syahrul Marufi" },
  { value: "Taat_Mulyono", label: " Taat Mulyono" },
  { value: "Tarmujiono", label: " Tarmujiono" },
  { value: "Taufik_Septiyanto", label: " Taufik Septiyanto" },
  { value: "Teguh_Iman_Santoso", label: " Teguh Iman Santoso" },
  { value: "Teguh_Istiono", label: " Teguh Istiono" },
  { value: "Thio_Budi_Utomo", label: " Thio Budi Utomo" },
  { value: "Tri_Puguh_Widodo", label: " Tri Puguh Widodo" },
  { value: "Wahyu_Prihanto", label: " Wahyu Prihanto" },
  { value: "Wahyudi_Alutfi", label: " Wahyudi Alutfi" },
  { value: "Wiyatno", label: " Wiyatno" },
  { value: "Yan_Ardianto", label: " Yan Ardianto" },
  { value: "Yudho_Lestari_Dwi_Puspito", label: " Yudho Lestari Dwi Puspito" },
  { value: "Yudi_Eko_Prabowo", label: " Yudi Eko Prabowo" },
  { value: "Yusuf_Agus_Prastomo", label: " Yusuf Agus Prastomo" },
  { value: "Tri_Edi_Kurniawanto", label: " Tri Edi Kurniawanto" },
  { value: "Zoni_Wirawan", label: " Zoni Wirawan" },
  { value: "Zuh_Rotul_Aulia", label: " Zuh Rotul Aulia" },
];

// const daftarPIC = pic.map((orang) => {
//   return {
//     value: orang.name,
//     label: orang.name,
//   };
// });

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
      label: "Unsafe Act",
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
      label: "Safe Act",
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
      label: "Safety Inspection Negative",
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
      label: "Safety Inspection Positive",
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
        // disableCountry: true,
        // disableState: false,
        // loadingState: true,
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

//END untuk select multi
// //////////////////////////////

export default function AddEventPage({}) {
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
    safety_category: "",
    potential_hazard: "",
    internal_3rdparty: "",
    behaviour_category: "",
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
      const res = await fetch(`http://10.24.7.70:8080/ab`, {
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
        router.push(`/auditBehaviours`);
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
    // const { name, value } = e.value;
    setValues({ ...values, corrective_status: e.value });
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
    const username = getCookie("username");
    const role = getCookie("role");
    checkUser(username);
  }, []);

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
            <label htmlFor="safety_category">Safety Category</label>
            <Select
              isDisabled={state.disableCountry}
              isLoading={state.loadingState}
              // isClearable
              // isSearchable
              // placeholder="Safety Category"
              name="safety_category"
              options={data.safety_categories}
              onChange={(e) => {
                dispatch({
                  type: POPULATE_STATE,
                  safety_category: e.value,
                });
                // dispatch({ type: CLEAR });
                handleInputChange4(e);
                setSdata(e);
              }}
            />
          </div>
          <div>
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
          </div>
          <div>
            <label htmlFor="behaviour_category">Behaviour category</label>
            <Select
              // isClearable
              // isSearchable
              // placeholder="Behaviour category"
              name="behaviour_category"
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
            {values.safety_category == "Safety Inspection Positive" ||
            values.safety_category == "Safe Act" ? (
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
            {values.safety_category == "Safety Inspection Positive" ||
            values.safety_category == "Safe Act" ? (
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
            {values.safety_category == "Safety Inspection Positive" ||
            values.safety_category == "Safe Act" ? (
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
            {values.safety_category == "Safety Inspection Positive" ||
            values.safety_category == "Safe Act" ? (
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
