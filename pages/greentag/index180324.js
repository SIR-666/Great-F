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
import Image from "next/image";
import { FaImage } from "react-icons/fa";
import UploadModal from "@/components/ImageUploadNode";
import Modal from "@/components/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Grid } from "@mui/material";
import Modalx from "@mui/material/Modal";
// import { addBusinessDays } from "moment-business-days";

// import dayjs from "dayjs";

// Fungsi untuk menambahkan jumlah hari, mengecualikan hari Sabtu dan Minggu
const addBusinessDays = (startDate, days) => {
  let resultDate = moment(startDate);
  let addedDays = 0;
  while (addedDays < days) {
    resultDate = resultDate.add(1, "days");
    if (resultDate.day() !== 0 && resultDate.day() !== 6) {
      // Hari bukan Sabtu (0) atau Minggu (6)
      addedDays++;
    }
  }
  return resultDate;
};

const optionsAbnormalityType = [
  { label: "Safety", value: "Safety" },
  { label: "Quality", value: "Quality" },
  { label: "5S", value: "5S" },
  { label: "Kerusakan Ringan", value: "Kerusakan Ringan" },
];

const optionsLineOLD = [
  { label: "Line A", value: "Line A" },
  { label: "Line B", value: "Line B" },
  { label: "Line C", value: "Line C" },
  { label: "Line D", value: "Line D" },
  { label: "Line E", value: "Line E" },
  { label: "Line F", value: "Line F" },
  { label: "Line G", value: "Line G" },
  { label: "YA", value: "YA" },
  { label: "YB", value: "YB" },
  { label: "YD", value: "YD" },
  { label: "RTD", value: "RTD" },
  { label: "FLEX 1", value: "FLEX 1" },
  { label: "FLEX 2", value: "FLEX 2" },
  { label: "GEA 3", value: "GEA 3" },
  { label: "GEA 4", value: "GEA 4" },
  { label: "GEA 5", value: "GEA 5" },
  { label: "OTHERS", value: "OTHER" },
];

const optionsArea = [
  { value: "Milk Filling", label: "Milk Filling" },
  {
    value: "Milk Processing",
    label: "Milk Processing",
  },
];

const optionsLineOLD2 = [
  { label: "Line A", value: "Line A" },
  { label: "Line B", value: "Line B" },
];

const optionsLine = {
  "Milk Filling": [
    { label: "Filling", value: "Filling" },
    { label: "Packing", value: "Packing" },
    { label: "Robot", value: "Robot" },
    { label: "Air Shower", value: "Air Shower" },
  ],
  "Milk Processing": [
    { label: "Sterilizer", value: "Sterilizer" },
    { label: "Storage Tank", value: "Storage Tank" },
    { label: "AT", value: "AT" },
    { label: "Matrix Valve", value: "Matrix Valve" },
    { label: "Incoming Area", value: "Incoming Area" },
    { label: "Blending Area", value: "Blending Area" },
    { label: "CIP Kitchen", value: "CIP Kitchen" },
    { label: "Control Room", value: "Control Room" },
    { label: "MCC Panel Room", value: "MCC Panel Room" },
    { label: "Decon Milk", value: "Decon Milk" },
    { label: "Workshop Processing", value: "Workshop Processing" },
  ],
};

const optionsMachine = {
  Filling: [
    { label: "Filling Line A", value: "Filling Line A" },
    { label: "Filling Line B", value: "Filling Line B" },
    { label: "Filling Line C", value: "Filling Line C" },
    { label: "Filling Line D", value: "Filling Line D" },
    { label: "Filling Line E", value: "Filling Line E" },
    { label: "Filling Line F", value: "Filling Line F" },
    { label: "Filling Line G", value: "Filling Line G" },
    { label: "CIP Kitchen", value: "CIP Kitchen" },
    { label: "Reprocess Room", value: "Reprocess Room" },
    { label: "Chemical Room", value: "Chemical Room" },
    { label: "Material Room", value: "Material Room" },
  ],
  Packing: [
    { label: "Packing Line A", value: "Packing Line A" },
    { label: "Packing Line B", value: "Packing Line B" },
    { label: "Packing Line C", value: "Packing Line C" },
    { label: "Packing Line D", value: "Packing Line D" },
    { label: "Packing Line E", value: "Packing Line E" },
    { label: "Packing Line F", value: "Packing Line F" },
    { label: "Packing Line G", value: "Packing Line G" },
  ],
  Robot: [
    { label: "ABB ESL", value: "ABB ESL" },
    { label: "YASKAWA ESL", value: "YASKAWA ESL" },
    { label: "ABB UHT", value: "ABB UHT" },
  ],
  "Air Shower": [{ label: "Air Shower", value: "Air Shower" }],
  Sterilizer: [
    { label: "Flex 1", value: "Flex 1" },
    { label: "Flex 2", value: "Flex 2" },
    { label: "GEA 3", value: "GEA 3" },
    { label: "GEA 4", value: "GEA 4" },
    { label: "GEA 5", value: "GEA 5" },
  ],
  "Storage Tank": [
    { label: "ST 1", value: "ST 1" },
    { label: "ST 2", value: "ST 2" },
    { label: "ST 3", value: "ST 3" },
    { label: "ST 4", value: "ST 4" },
    { label: "ST 5", value: "ST 5" },
    { label: "ST 6", value: "ST 6" },
    { label: "ST 7", value: "ST 7" },
    { label: "ST 8", value: "ST 8" },
    { label: "ST 9", value: "ST 9" },
    { label: "ST 10", value: "ST 10" },
    { label: "ST 11", value: "ST 11" },
    { label: "ST 12", value: "ST 12" },
    { label: "ST 13", value: "ST 13" },
    { label: "Cream Tank 1", value: "Cream Tank 1" },
    { label: "Cream Tank 2", value: "Cream Tank 2" },
    { label: "Cream Tank 3", value: "Cream Tank 3" },
    { label: "Premix Tank 1", value: "Premix Tank 1" },
    { label: "Premix Tank 2", value: "Premix Tank 2" },
    { label: "Raw Milk Tank 1", value: "Raw Milk Tank 1" },
    { label: "Raw Milk Tank 2", value: "Raw Milk Tank 2" },
    { label: "Rework Tank", value: "Rework Tank" },
    { label: "Hot Water Tank", value: "Hot Water Tank" },
    { label: "Choco Slurry Tank", value: "Choco Slurry Tank" },
  ],
  AT: [
    { label: "AT 1", value: "AT 1" },
    { label: "AT 2", value: "AT 2" },
    { label: "AT 3", value: "AT 3" },
    { label: "AT 4", value: "AT 4" },
    { label: "AT 5", value: "AT 5" },
  ],
  "Matrix Valve": [{ label: "Matrix Valve", value: "Matrix Valve" }],
  "Incoming Area": [
    { label: "Thermizer 1", value: "Thermizer 1" },
    { label: "Thermizer 2", value: "Thermizer 2" },
    { label: "Pasteurizer Cream", value: "Pasteurizer Cream" },
    { label: "Separator 1", value: "Separator 1" },
    { label: "Separator 2", value: "Separator 2" },
  ],
  "Blending Area": [
    { label: "Bredo", value: "Bredo" },
    { label: "Scanima Mixer", value: "Scanima Mixer" },
    { label: "Ruang Timbang", value: "Ruang Timbang" },
    { label: "Ruang Timbang Ponceau", value: "Ruang Timbang Ponceau" },
    { label: "Ruang Material", value: "Ruang Material" },
  ],
  "CIP Kitchen": [
    { label: "CIP Kitchen 1", value: "CIP Kitchen 1" },
    { label: "CIP Kitchen 2", value: "CIP Kitchen 2" },
    { label: "CIP Kitchen 3", value: "CIP Kitchen 3" },
    { label: "Penerimaan Chemical", value: "Penerimaan Chemical" },
    { label: "Storage Tank Chemical", value: "Storage Tank Chemical" },
  ],
  "Control Room": [{ label: "Control Room", value: "Control Room" }],
  "MCC Panel Room": [{ label: "MCC Panel Room", value: "MCC Panel Room" }],
  "Decon Milk": [
    { label: "Loker", value: "Loker" },
    { label: "Ruang Sepatu", value: "Ruang Sepatu" },
    { label: "Decon Luar", value: "Decon Luar" },
  ],
  "Workshop Processing": [
    { label: "Workshop Processing", value: "Workshop Processing" },
  ],
};

const optionsMaintenanceType = [
  // { label: "-", value: "-" },
  { label: "Autonomous Maintenance", value: "Autonomous Maintenance" },
  { label: "Planned Maintenance", value: "Planned Maintenance" },
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

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
    TagNo: "",
    // IssuedDate: today,
    // ExpectedDate: today,
    IssuedDate: moment().format("YYYY-MM-DD"), // Tanggal hari ini
    ExpectedDate: moment().format("YYYY-MM-DD"), // Tanggal hari ini
    AbnormalityType: "",
    ObservedArea: "",
    Line: "",
    Machine: "",
    TaggerName: "",
    MaintenanceType: "",
    Picture: "", //auto by login
    AbnormalityDescription: "",
    ProposedSolution: "",
    info1: "Open",
    datesystem: today,
    footprint: user ? user.email : null, // auto by login
    // footprint: "marjhy@gmail.com",
  });
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  const [uploadedImagePath, setUploadedImagePath] = useState(null);
  const handleModalClose = (path) => {
    // path.preventDefault();
    setShowModal(false);
    // setShowModal(path);
    // console.log("path handleModalClose ", path);
  };
  const handleUploadComplete = (path) => {
    // path.preventDefault();
    setValues({ ...values, Picture: path });
    setUploadedImagePath(path); // Set state uploadedImagePath dengan path hasil upload
    // console.log("path handleUploadComplete ", path);
    setShowModal(false); // Tutup modal setelah berhasil mengunggah
  };

  const handleSubmitOLD = async (e) => {
    e.preventDefault();
    console.log(values);
    // Validation
    const hasEmptyFields = Object.values(values).some(
      (element) => element === ""
    );

    if (values.ExpectedDate < values.IssuedDate) {
      // alert("Tanggal close tidak boleh sebelum tanggal close");
      toast.error("Due date of close should be after date of audit");
    } else if (hasEmptyFields) {
      toast.error("Please fill in all fields");
    } else {
      console.log(values);
      setLoading(true);
      const res = await fetch(`http://10.24.7.70:8080/addgreenTAG`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        if (res.status === 403 || res.status === 401) {
          // toast.error("No token included");
          console.log(res);
          console.log("No token included");
          return;
        } else if (res.status === 404) {
          toast.error("No TAG has been used (still open)");
        }
        console.log(res);
        setLoading(false);
        console.log(res.message);
      } else {
        // const evt = await res.json();
        router.push(`/greentag/list`);
        console.log(res);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    }

    //console.log akan diganti fetch api
    // console.log(values);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(values);
    // Validation
    const hasEmptyFields = Object.values(values).some(
      (element) => element === ""
    );

    if (values.ExpectedDate < values.IssuedDate) {
      toast.error("Due date of close should be after date of audit");
    } else if (hasEmptyFields) {
      toast.error("Please fill in all fields");
    } else {
      console.log(values);
      setLoading(true);

      try {
        const res = await fetch(`http://10.24.7.70:8080/addgreenTAG`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(values),
        });

        if (!res.ok) {
          if (res.status === 403 || res.status === 401) {
            console.log("No token included");
            return;
          } else if (res.status === 404) {
            toast.error("No TAG has been used (still open)");
          }
          setLoading(false);
          console.log(res.message);
          return;
        }

        // If the greenTAG is successfully added, then send email
        const recipients = determineRecipients(values);
        if (recipients.length > 0) {
          const emailData = {
            to: recipients,
            subject: `GreenTag - ${values.TagNo} - ${values.info1} - ${values.AbnormalityType} - ${values.MaintenanceType} - ${values.Line} - ${values.ExpectedDate}`,
            body: `
              Dear All,

              Berikut laporan temuan abnormality ${
                values.AbnormalityType
              } yang terjadi di area ${values.ObservedArea}.
              Dalam rangka menjaga keberlanjutan operasional dan keselamatan lingkungan kerja, diperlukan tindak lanjut atas temuan berikut.
              
              Detail terkait temuan yang terjadi adalah sebagai berikut:
              Tag No. : ${values.TagNo}
              Tagger Name : ${values.TaggerName} 
              Sub Group : ${values.Machine}
              Issued Date : ${values.IssuedDate}
              Expected Date : ${values.ExpectedDate}
              
              Abnormality Description : ${values.AbnormalityDescription}
              
              Proposed Solution : ${values.ProposedSolution}
              
              Images :
              ${values.Picture.map((image) => image).join("\n")}

              Informasi lebih detail dapat diakses pada http://great.greenfieldsdairy.com/greentag/list
              Terima kasih atas perhatian dan kerjasamanya.


              Best Regards,
              GreenTag System`,
          };

          const resEmail = await fetch(`http://10.24.7.70:3333/send-email`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(emailData),
          });

          if (!resEmail.ok) {
            console.error("Failed to send email");
            setLoading(false);
            return;
          }
        }
        console.log(res);
        // setLoading(false);
        setTimeout(() => {
          setLoading(false);
        }, 5000);
        router.push(`/greentag/list`);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    }
  };

  const determineRecipients = (values) => {
    let recipients = [];
    if (
      (values.AbnormalityType === "5S" ||
        values.AbnormalityType === "Kerusakan Ringan") &&
      values.ObservedArea === "Milk Filling"
    ) {
      recipients = [
        "marjhy.maratapatriata@greenfieldsdairy.com",
        "firda.rahmatika@greenfieldsdairy.com",
      ];
    } else if (
      (values.AbnormalityType === "5S" ||
        values.AbnormalityType === "Kerusakan Ringan") &&
      values.ObservedArea === "Milk Processing"
    ) {
      recipients = [
        "marjhy.maratapatriata@greenfieldsdairy.com",
        "firda.rahmatika@greenfieldsdairy.com",
      ];
    } else if (
      values.AbnormalityType === "Safety" &&
      values.ObservedArea === "Milk Filling"
    ) {
      recipients = [
        "marjhy.maratapatriata@greenfieldsdairy.com",
        "firda.rahmatika@greenfieldsdairy.com",
      ];
    } else if (
      values.AbnormalityType === "Safety" &&
      values.ObservedArea === "Milk Processing"
    ) {
      recipients = [
        "marjhy.maratapatriata@greenfieldsdairy.com",
        "firda.rahmatika@greenfieldsdairy.com",
      ];
    } else if (
      values.AbnormalityType === "Quality" &&
      values.ObservedArea === "Milk Filling"
    ) {
      recipients = [
        "marjhy.maratapatriata@greenfieldsdairy.com",
        "firda.rahmatika@greenfieldsdairy.com",
      ];
    } else if (
      values.AbnormalityType === "Quality" &&
      values.ObservedArea === "Milk Processing"
    ) {
      recipients = [
        "marjhy.maratapatriata@greenfieldsdairy.com",
        "firda.rahmatika@greenfieldsdairy.com",
      ];
    }
    return recipients;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleInputAbnormalityTypeOld = (e) => {
    // const { name, value } = e.value;
    setValues({ ...values, AbnormalityType: e.value });
  };

  const handleInputTaggerName = (e) => {
    // const { name, value } = e.value;
    // setValues({ ...values, pic: e.value });
    // set value departement from mapping optionsDept
    const findDep = optionsDept.find(({ named }) => named == e.value);
    // console.log(findDep.dept);
    setValues({
      ...values,
      department_area: findDep.dept,
      TaggerName: e.value,
    });
  };

  const handleInputLine = (e) => {
    // const { name, value } = e.value;
    setValues({ ...values, Line: e.value });
  };

  const handleInputMachine = (e) => {
    // const { name, value } = e.value;
    setValues({ ...values, Machine: e.value });
  };

  const handleInputMaintenanceType = (e) => {
    // const { name, value } = e.value;
    setValues({ ...values, MaintenanceType: e.value });
  };

  const checkUser = (username) => {
    if (!username) {
      router.push(`/`);
    }
  };

  //buat modal
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //buat modal end

  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedLine, setSelectedLine] = useState(null);
  const [selectedMachine, setSelectedMachine] = useState(null);

  const handleInputObservedAreaOld = (e) => {
    // const { name, value } = e.value;
    setValues({ ...values, ObservedArea: e.value });
  };

  const handleInputObservedArea = (selectedOption) => {
    setSelectedArea(selectedOption);
    setSelectedLine(null); // Reset pilihan mesin saat ganti garis
    setSelectedMachine(null); // Reset pilihan mesin saat ganti garis
    setValues({ ...values, ObservedArea: selectedOption.value });
  };

  const handleLineChange = (selectedOption) => {
    setSelectedLine(selectedOption);
    console.log("so ", selectedOption);
    // setValues({ ...values, Line: selectedOption.value });
    // console.log("sv ", selectedOption.value);
    // Jika Line hanya memiliki satu pilihan Machine, maka otomatis pilih pilihan tersebut
    if (optionsMachine[selectedOption.value].length === 1) {
      setSelectedMachine(optionsMachine[selectedOption.value][0]);
      setValues({
        ...values,
        Machine: optionsMachine[selectedOption.value][0].value,
        Line: selectedOption.value,
      });
      console.log(optionsMachine[selectedOption.value][0].value);
    } else {
      setSelectedMachine(null);
      setValues({ ...values, Line: selectedOption.value });
    }
    // setSelectedMachine(null); // Reset pilihan mesin saat ganti garis
  };

  const handleMachineChange = (selectedOption) => {
    setSelectedMachine(selectedOption);
    setValues({ ...values, Machine: selectedOption.value });
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

  const handleInputAbnormalityType = (selectedOption) => {
    const { value } = selectedOption;
    let expectedDate;

    // Mendefinisikan jumlah hari berdasarkan AbnormalityType
    switch (value) {
      case "Safety":
      case "Quality":
        expectedDate = addBusinessDays(values.IssuedDate, 3).format(
          "YYYY-MM-DD"
        );

        break;
      case "5S":
      case "Kerusakan Ringan":
        expectedDate = addBusinessDays(values.IssuedDate, 20).format(
          "YYYY-MM-DD"
        );

        break;
      default:
        expectedDate = moment(values.IssuedDate); // Jika tidak ada AbnormalityType yang dipilih, gunakan IssuedDate
    }

    setValues({
      ...values,
      AbnormalityType: value,
      ExpectedDate: expectedDate,
    });
  };

  return (
    <Layout title="Add New TAG">
      <Link href="/events">Go Back</Link>
      <h1>Add greenTAG</h1>
      <ToastContainer />
      <Modalx
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Input Tag Number
          </Typography>
          <Divider />
          <br />
          <Grid container direction="row" justifyContent="space-between">
            <form onSubmit={() => setOpen(false)} className={styles.form2}>
              <div>
                <div>
                  <label htmlFor="TagNo">Tag No</label>

                  <input
                    type="number"
                    // disabled
                    name="TagNo"
                    id="TagNo"
                    value={values.TagNo}
                    onChange={handleInputChange}
                    height="40px"
                    padding="5px"
                    size="small"
                  ></input>
                </div>
              </div>
              <Divider />
              <br />

              <input
                type="submit"
                value="Select"
                className="btn"
                variant="contained"
              />
            </form>
          </Grid>
        </Box>
      </Modalx>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            {/* <h4>#tagNumber: </h4> */}
            <label htmlFor="AbnormalityType">Tag Number</label>
            <h2> {values.TagNo} </h2>
            <button
              onClick={(e) => {
                e.preventDefault();
                setOpen(true);
              }}
            >
              Change Tag Number
            </button>
          </div>
          <div>
            <label htmlFor="AbnormalityType">Abnormality Type</label>
            <Select
              defaultValue={values.AbnormalityType}
              // value={values.AbnormalityType}
              // onChange={setSelectedOption}
              name="AbnormalityType"
              id="AbnormalityType"
              onChange={handleInputAbnormalityType}
              options={optionsAbnormalityType}
            />
          </div>
          <div>
            <label htmlFor="ObservedArea">Observed Area</label>
            <Select
              defaultValue={values.ObservedArea}
              // value={values.ObservedArea}
              // onChange={setSelectedOption}
              name="ObservedArea"
              id="ObservedArea"
              onChange={handleInputObservedArea}
              options={optionsArea}
            />
          </div>
          <div>
            <label htmlFor="Line">Group</label>

            {/* <Select
              value={selectedLine}
              onChange={handleLineChange}
              options={optionsLine}
            /> */}

            <Select
              value={selectedLine}
              onChange={handleLineChange}
              options={selectedArea ? optionsLine[selectedArea.value] : []}
              isDisabled={!selectedArea} // Membuat opsi mesin tidak dapat dipilih jika tidak ada garis yang dipilih
            />
          </div>
          <div>
            <label htmlFor="Machine">Machine</label>
            {/* <Select
              defaultValue={values.optionsMachine}
              //inputValue={values.Machine}
              // defaultInputValue={values.Machine}
              name="Machine"
              id="Machine"
              onChange={handleInputMachine}
              options={optionsMachine}
              // size="small"
            /> */}

            <Select
              value={selectedMachine}
              onChange={handleMachineChange}
              options={selectedLine ? optionsMachine[selectedLine.value] : []}
              isDisabled={!selectedLine} // Membuat opsi mesin tidak dapat dipilih jika tidak ada garis yang dipilih
            />
          </div>

          <div>
            <label htmlFor="IssuedDate">Issued Date</label>
            <input
              type="date"
              name="IssuedDate"
              id="IssuedDate"
              // min={tanggalSiji}
              // max={today}
              min={values.IssuedDate}
              max={moment().format("YYYY-MM-DD")}
              // value={values.IssuedDate || today} // Set nilai default menjadi tanggal hari ini jika IssuedDate tidak ada
              value={values.IssuedDate}
              onChange={handleInputChange}
              disabled
            ></input>
          </div>
          <div>
            <label htmlFor="ExpectedDate">Expected Date</label>
            <input
              type="date"
              name="ExpectedDate"
              id="ExpectedDate"
              // min={tanggalSiji}
              // max={today}
              min={values.IssuedDate}
              max={moment().format("YYYY-MM-DD")}
              value={values.ExpectedDate}
              // value={values.ExpectedDate || today}
              onChange={handleInputChange}
              disabled
            ></input>
          </div>
          {/* ExpectedDate */}

          <div>
            <label htmlFor="TaggerName">Tagger Name</label>
            <Select
              defaultValue={values.TaggerName}
              name="TaggerName"
              id="TaggerName"
              onChange={handleInputTaggerName}
              options={options}
            />
          </div>

          <div>
            <label htmlFor="MaintenanceType">Maintenance Type</label>
            <Select
              defaultValue={values.MaintenanceType}
              name="MaintenanceType"
              id="MaintenanceType"
              onChange={handleInputMaintenanceType}
              options={optionsMaintenanceType}
            />
          </div>

          <div>
            <div>
              {!uploadedImagePath && (
                // <p>Uploaded image path: {uploadedImagePath}</p>
                <p>No image uploaded</p>
              )}
            </div>
            {uploadedImagePath ? (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShowModal(true);
                }}
              >
                Re-Upload Image
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShowModal(true);
                }}
              >
                Open Upload Image
              </button>
            )}
            {showModal && (
              <Modal
                show={showModal}
                onClose={handleModalClose}
                onUploadComplete={handleUploadComplete}
              >
                <UploadModal
                  onClose={handleModalClose}
                  onUploadComplete={handleUploadComplete}
                />
              </Modal>
            )}
            {uploadedImagePath &&
              uploadedImagePath.map((link, index) => (
                <Image
                  // src={uploadedImagePath}
                  src={link}
                  key={index}
                  alt="Uploaded Image"
                  width={900}
                  height={600}
                  margins={10}
                />
              ))}{" "}
            {/* Menampilkan gambar yang diunggah */}
          </div>
        </div>

        <div className={styles.grid}>
          <div>
            <label htmlFor="AbnormalityDescription">
              Abnormality Description
            </label>
            <textarea
              type="text"
              name="AbnormalityDescription"
              id="AbnormalityDescription"
              value={values.AbnormalityDescription}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div>
            <label htmlFor="ProposedSolution">Proposed Solution</label>

            <textarea
              type="text"
              name="ProposedSolution"
              id="ProposedSolution"
              value={values.ProposedSolution}
              onChange={handleInputChange}
            ></textarea>
          </div>
        </div>
        {loading ? (
          <CircularProgress />
        ) : (
          <input
            type="submit"
            value="SUBMIT TAG"
            className="btn"
            disabled={loading}
          />
        )}
      </form>
    </Layout>
  );
}
