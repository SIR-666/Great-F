/* eslint-disable react/display-name */

import React, { forwardRef, useEffect, useContext } from "react";
import { parseCookies } from "@/helpers/index";
// import MaterialTable from "material-table";
import MaterialTable from "@material-table/core";
import { ThemeProvider, createTheme } from "@mui/material";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import Layout from "@/components/LayoutLarge";
import AuthContext from "@/context/AuthContext";
import { useRouter } from "next/router";
import { WhatsappShareButton, WhatsappIcon } from "next-share";
import Select from "react-select";
import styles from "@/styles/Form.module.css";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Button, Grid } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import { ExportCsv, ExportPdf } from "@material-table/exporters";

// import Select from "@mui/material/Select";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

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

export default function DisableFieldEditable({ evt, token }) {
  const { useState } = React;
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  // const { user, logout } = useContext(AuthContext);
  let today = moment().format("YYYYMMDD-Hmm");
  let today2 = moment().format("YYYY-MM-DD");
  // const date = new Date();
  const [kode, setKode] = useState("");
  const [values, setValues] = useState({
    date_of_inspection: "",
    batch: "",
    date_of_production: "",
    date_of_expired: "",
    nama_produsen: "",
    quantity: "",
    remarks: "",
    tipe_material: "",
    nama_material: "",
    idDateData: "",
    footprint: user ? user.email : null, // auto by login
    datesystem: today2,
  });
  const [data, setData] = useState([]);
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");

  const optionsTipeMaterial = [
    // { label: "-", value: "-" },
    { label: "Raw Material", value: "RM" },
    // { label: "Packaging Material", value: "Packaging Material" },
    // { label: "Chemical", value: "Chemical" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleInputChange2 = (e) => {
    // const { name, value } = e.value;
    setValues({
      ...values,
      tipe_material: e.value,
    });
  };

  const handleInputChange3 = (e) => {
    // const { name, value } = e.value;
    setValues({
      ...values,
      nama_material: e.value,
      idDateData:
        values.tipe_material.replaceAll(" ", "-") +
        "-" +
        e.value.replaceAll(" ", "-") +
        "-" +
        today,
    });
  };

  const handleInputChange4 = (e) => {
    // const { name, value } = e.value;
    setValues({ ...values, nama_produsen: e.value });
  };

  const [columns, setColumns] = useState([
    // {
    //   title: "AUFNR",
    //   field: "AUFNR",
    //   editable: "never",
    // },
    {
      title: "Date",
      field: "DATE",
      type: "date",
      editable: "never",
    },
    {
      title: "Week",
      field: "WEEK",
      editable: "never",
    },
    { title: "MAKTX", field: "MAKTX", editable: "never" },
    // { title: "MATERIAL GROUP", field: "MATERIAL GROUP", editable: "never" },
    {
      title: "Batch",
      field: "CHARG",
      editable: "never",
    },
    {
      title: "Line",
      field: "LINE",
      editable: "never",
    },
    {
      title: "Paper used (pcs)",
      field: "PAPER USED-PCS",
      editable: "never",
    },
    {
      title: "FG-PCS",
      field: "FG-PCS",
      editable: "never",
    },
    {
      title: "Sample (pcs)",
      field: "INC-SMPLE-PCS",
      editable: "never",
    },
    {
      title: "Startup",
      field: "STARTUP",
      type: "numeric",
      // editable: "never",
    },
    {
      title: "Pack Kosong",
      field: "PENGECEKAN2",
      type: "numeric",
      // editable: "never",
    },
    {
      title: "Variable pack",
      field: "VARIABLE_PACK",
      type: "numeric",
      // editable: "never",
    },
    {
      title: "Variable fill",
      field: "VARIABLE_FILL",
      type: "numeric",
      // editable: "never",
    },
    {
      title: "Loss",
      field: "LOSS",
      editable: "never",
      render: (rowData) => {
        // console.log(rowData);
        return rowData["PAPER USED-PCS"] - rowData["FG-PCS"];
      },
    },
    {
      title: "Fix Loss",
      field: "FIX_LOSS",
      editable: "never",
      render: (rowData) => {
        // console.log(rowData);
        return (
          parseInt(rowData["STARTUP"]) +
          // parseInt(rowData["PENGECEKAN2"]) +
          rowData["INC-SMPLE-PCS"]
        );
      },
    },
    {
      title: "Selisih Loss",
      field: "SEL_LOSS",
      editable: "never",
      render: (rowData) => {
        // console.log(rowData);
        return parseInt(rowData["PAPER USED-PCS"]) -
          parseInt(rowData["FG-PCS"]) -
          (parseInt(rowData["STARTUP"]) +
            parseInt(rowData["PENGECEKAN2"]) +
            parseInt(rowData["INC-SMPLE-PCS"])) -
          parseInt(rowData["VARIABLE_PACK"]) -
          parseInt(rowData["VARIABLE_FILL"]) ==
          0 ? (
          parseInt(rowData["PAPER USED-PCS"]) -
            parseInt(rowData["FG-PCS"]) -
            (parseInt(rowData["STARTUP"]) +
              parseInt(rowData["PENGECEKAN2"]) +
              parseInt(rowData["INC-SMPLE-PCS"])) -
            parseInt(rowData["VARIABLE_PACK"]) -
            parseInt(rowData["VARIABLE_FILL"])
        ) : (
          <p style={{ color: "#E87722", fontWeight: "bold" }}>
            {parseInt(rowData["PAPER USED-PCS"]) -
              parseInt(rowData["FG-PCS"]) -
              (parseInt(rowData["STARTUP"]) +
                parseInt(rowData["PENGECEKAN2"]) +
                parseInt(rowData["INC-SMPLE-PCS"])) -
              parseInt(rowData["VARIABLE_PACK"]) -
              parseInt(rowData["VARIABLE_FILL"])}
          </p>
        );
      },
    },
    {
      title: "Paper Loss %",
      field: "PAPER LOSS %",
      editable: "never",
      // render: (rowData) => {
      //   // console.log(rowData);
      //   return (
      //     (parseInt(rowData["PAPER USED-PCS"]) -
      //       // parseInt(rowData["PENGECEKAN2"]) +
      //       rowData["FG-PCS"]) /
      //     parseInt(rowData["PAPER USED-PCS"])
      //   );
      // },
    },
    {
      title: "STD",
      field: "STD",
      editable: "never",
      type: "numeric",
      render: (rowData) => {
        // console.log(rowData);
        return Array.isArray(parseFloat(rowData.STD[0]) > 0)
          ? parseFloat(rowData.STD[0])
          : // : Array.isArray(parseFloat(rowData.STD[1]) > 0)
          // ? parseFloat(rowData.STD[1])
          rowData.STD > 0
          ? rowData.STD
          : parseFloat(rowData.STD[1]);
      },
    },
  ]);

  const rowBackgroundColors = {
    2: "green",
    3: "yellow",
    4: "red",
  };

  const [optionsNamaMaterial, setoptionsNamaMaterial] = useState([]);
  const [optionsNamaProd, setoptionsNamaProd] = useState([]);

  const postData = async (value, aufnr) => {
    //data fetch
    // console.log("id", id);
    console.log("values", value);
    console.log("aufnr ", aufnr);
    // console.log("bln ", bln);
    // console.log("mtg ", mtg);
    // const data2 = JSON.stringify(value);
    // const data3 = data2.push({ datesystem: today2 });
    // console.log("data2", data3);

    const res = await fetch(
      `http://10.24.7.70:8080/editGreatgetLossFilM/${aufnr}`,
      {
        // const res = await fetch(`http://10.24.7.70:8080/addSiqma`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(value),
      }
    );

    if (!res.ok) {
      if (res.status === 403 || res.status === 401) {
        // toast.error("No token included");
        console.log("No token included");
        return;
      }
      console.log(res);
      // console.log(res.message);
    } else {
      // const evt = await res.json();
      // router.push(`/`);
    }
    //data fetch end
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(values);
    const hasEmptyFields = Object.values(values).some(
      (element) => element === ""
    );

    //cek dulu apa table value ada isi semua
    if (hasEmptyFields) {
      toast.error("Please fill in all fields");
      // alert("Please fill in all fields");
    } else {
      setLoading(true);
      console.log(values);
      const res = await fetch(`http://10.24.7.70:8080/addSiqmaH`, {
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
        // console.log("res ", res);
        setLoading(false);
        // console.log("res msg ", res.message);
      } else {
        // const evt = await res.json();
        router.push(`/`);
        setLoading(false);
      }
    }
  };

  const handleSubmitModal = async (e) => {
    e.preventDefault();
    // const myArray = date1.split("-");
    // console.log("tahun", myArray[0]);
    // console.log("bulan", myArray[1]);
    // let thn = myArray[0];
    // let bln = myArray[1];
    // console.log("hs date 2", date2);
    // console.log("nama material", values.nama_material);
    //http://10.24.7.70:8080/GreatgetLossFilM/2022-09-01/2022-09-30
    const arr = [];
    try {
      await fetch(`http://10.24.7.70:8080/GreatgetLossFilM/${date1}/${date2}`, {
        method: "GET",
      })
        .then((response) => {
          return response.json(); // return response.json() first
        })
        .then((json) => {
          setData(json);
          console.log(json);
        });
      setOpen(false);
    } catch (err) {
      console.log("terjadi error:", err);
    }

    // console.log("id", kode); // ga keluar
  };

  //buat modal
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //buat modal end

  // useEffect(() => {
  //   const fetchData = async (date1, date2) => {
  //     console.log("date 1", date1);
  //     console.log("date 2", date2);
  //     const arr = [];
  //     try {
  //       await fetch(`http://10.24.7.70:8080/siQmaTable/${date1}/${date2}`, {
  //         method: "GET",
  //       })
  //         .then((response) => {
  //           return response.json(); // return response.json() first
  //         })
  //         .then((json) => {
  //           const options = json.map((d) => ({
  //             value: d.name,
  //             label: d.name,
  //           }));
  //           setoptionsNamaMaterial(options);
  //         });
  //     } catch (err) {
  //       console.log("terjadi error:", err);
  //     }
  //   };
  //   // fetchData();
  // }, [date1, date2]);

  return (
    <Layout title="G.R.E.A.T">
      {evt.length === 0 && <h3>No data to show</h3>}
      <ToastContainer />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Production Date
          </Typography>
          <Divider />
          <br />
          <Grid container direction="row" justifyContent="space-between">
            <form onSubmit={handleSubmitModal}>
              <div className={styles.form2}>
                <div>
                  <label htmlFor="date1">Production date start</label>
                  <input
                    type="date"
                    name="date1"
                    id="date1"
                    value={values.date1}
                    onChange={(e) => {
                      setDate1(e.target.value);
                      // console.log("month", e.target.value);
                      // handleChange();
                    }}
                  ></input>
                </div>
                <div>
                  <label htmlFor="date2">Production date end</label>
                  <input
                    type="date"
                    name="date2"
                    id="date2"
                    value={values.date2}
                    onChange={(e) => {
                      setDate2(e.target.value);
                      // console.log("month", e.target.value);
                      // handleChange();
                    }}
                  ></input>
                </div>
              </div>
              <Divider />
              <br />
              <br />
              <input
                type="submit"
                value="Select"
                className="btn"
                variant="contained"
              />
            </form>
            {/* <form onSubmit={handleSubmitModal}>
              <div className={styles.form2}>
                <div>
                  <label htmlFor="date1">Month / Year</label>
                  <input
                    type="month"
                    name="date1"
                    id="date1"
                    value={values.date1}
                    onChange={(e) => {
                      setDate1(e.target.value);
                      // console.log("month", e.target.value);
                      // handleChange();
                    }}
                  ></input>
                </div>
              </div>
              <Divider />
              <br />
              <br />
              <input
                type="submit"
                value="Select"
                className="btn"
                variant="contained"
              />
            </form> */}
          </Grid>
        </Box>
      </Modal>
      <MaterialTable
        title="Filling Milk Loss Packaging"
        // actions={[
        //   {
        //     icon: tableIcons.Delete,
        //     tooltip: "Delete User",
        //     onClick: (event, rowData) =>
        //       alert("You want to delete " + rowData.name),
        //   },
        //   {
        //     icon: tableIcons.Add,
        //     tooltip: "Add User",
        //     isFreeAction: true,
        //     onClick: (event) => alert("You want to add a new row"),
        //   },
        // ]}
        icons={tableIcons}
        columns={columns}
        data={data}
        editable={{
          // onRowAdd: (newData) =>
          //   new Promise((resolve, reject) => {
          //     setTimeout(() => {
          //       setData([...data, newData]);
          //       resolve();
          //     }, 1000);
          //   }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...data]; // buat variable dataUpdate ambil dari isi data
                const index = oldData.tableData.id; // dapatkan id nya
                // console.log("dataUpdate ", dataUpdate); //ID OF ARRAY
                dataUpdate[index] = newData;

                // console.log("newData ", newData); //data baru database
                // console.log("dataUpdate ", dataUpdate); //data baru database
                setData([...dataUpdate]); // data yg hasil update untuk ditampilkan di table di update
                //setData([newData]); //CARA ADD
                const newArray = Object.assign(newData, {
                  DATESYSTEM: today2,
                  FINGERPRINT: user ? user.email : null,
                  FLAG: 1,
                  LOSS: newData["PAPER USED-PCS"] - newData["FG-PCS"],
                  FIX_LOSS:
                    parseInt(newData["STARTUP"]) +
                    // parseInt(newData["PENGECEKAN2"]) +
                    newData["INC-SMPLE-PCS"],
                  PAPER_LOSS:
                    (parseInt(newData["PAPER USED-PCS"]) +
                      // parseInt(newData["PENGECEKAN2"]) +
                      newData["FG-PCS"]) /
                    parseInt(newData["PAPER USED-PCS"]),
                  SEL_LOSS:
                    parseInt(newData["PAPER USED-PCS"]) -
                    parseInt(newData["FG-PCS"]) -
                    (parseInt(newData["STARTUP"]) +
                      parseInt(newData["PENGECEKAN2"]) +
                      parseInt(newData["INC-SMPLE-PCS"])) -
                    parseInt(newData["VARIABLE_PACK"]) -
                    parseInt(newData["VARIABLE_FILL"]),
                  // STD: parseFloat(newData.STD[0]),
                });
                // console.log("index ", index);
                // console.log("newArray ", newArray);
                console.log("newArray  ", newArray); //ID database
                console.log("thn  ", newArray.STD); //ID database
                // console.log("bln  ", newArray.MONTHs); //ID database
                // console.log("mtg  ", newArray["MATERIAL GROUP"]); //ID database
                // console.log("newData code ", newData.code); //ID database
                // console.log("newData date data ", newData.idDateData); //ID database

                postData(newArray, newArray.AUFNR);
                //kirim ke database
                resolve();
              }, 1000);
            }),
          // onRowDelete: (oldData) =>
          //   new Promise((resolve, reject) => {
          //     setTimeout(() => {
          //       const dataDelete = [...data];
          //       const index = oldData.tableData.id;
          //       dataDelete.splice(index, 1);
          //       setData([...dataDelete]);
          //       resolve();
          //     }, 1000);
          //   }),
        }}
        options={{
          actionsColumnIndex: -1,
          headerStyle: {
            backgroundColor: "#11ba11",
            color: "#FFF",
          },
          // exportButton: true,
          exportMenu: [
            {
              label: "Export CSV",
              exportFunc: (cols, datas) =>
                ExportCsv(cols, datas, "CsvExportFromWEB"),
            },
          ],
          sorting: true,
          paging: true,
          pageSize: 10, // make initial page size
          filtering: true,
          emptyRowsWhenPaging: false, // To avoid of having empty rows
          pageSizeOptions: [10, 20, 30, 50, 100, 500, 10000], // rows selection options
          rowStyle: (rowData) => ({
            backgroundColor:
              rowData.tableData.finding_audit_status === "Open"
                ? "#EEE"
                : "#FFF",
          }),
        }}
      />
    </Layout>
  );
}

export async function getServerSideProps() {
  // const { token } = parseCookies(req);
  // const res = await fetch(`${API_URL}/events/${id}`);
  //http://10.24.7.70:8080/siQmaTable/2022-09-01/2022-09-30
  const res = await fetch(`http://10.24.7.70:8080/siQma06`);
  const evt = await res.json();

  return {
    props: {
      evt,
      // token,
    },
  };
}
