import React, {
  useState,
  useContext,
  useEffect,
  Fragment,
  useRef,
} from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useState } from "react-usestateref";
import AuthContext from "@/context/AuthContext";
import Layout from "@/components/Layout";
import { Scheduler } from "@aldabil/react-scheduler";
import moment from "moment";
import { Button, Typography } from "@mui/material";
import {
  RESOURCES,
  RESOURCESALT,
  EVENTS,
  EVENTSALT,
} from "@/components/events";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import id from "date-fns/locale/id";
import { useRouter } from "next/router";
import { NEXT_URL } from "@/config/index";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";

export default function App() {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  // const [user, setUser] = useState(null);

  const options2 = [
    { text: "Adi Nugroho", value: " Adi Nugroho" },
    { text: "Aji Yahnuar Prasetyo", value: " Aji Yahnuar Prasetyo" },
    { text: "Akmal Adyarazan", value: " Akmal Adyarazan" },
    { text: "Andri Swasono", value: " Andri Swasono" },
    { text: "Anggia Dwi Sevina", value: " Anggia Dwi Sevina" },
    { text: "Ari Isnadi", value: " Ari Isnadi" },
    { text: "Arief Musthofa, Stp", value: " Arief Musthofa, Stp" },
    { text: "Arif Hidayatullah", value: " Arif Hidayatullah" },
    { text: "Array Sidi Tirtana", value: " Array Sidi Tirtana" },
    { text: "Avida Nur Hidayah", value: " Avida Nur Hidayah" },
    { text: "Darmanto Setyawan", value: " Darmanto Setyawan" },
    { text: "Devi Alvina", value: "Devi Alvina" },
    { text: "Didik Setyono Adi", value: " Didik Setyono Adi" },
    { text: "Dimas Arga Saputra", value: " Dimas Arga Saputra" },
    { text: "Dwi Prasetya Adi", value: " Dwi Prasetya Adi" },
    { text: "Dwi Putranto Sulyandoko", value: " Dwi Putranto Sulyandoko" },
    { text: "Dyah Ratri Rahadini", value: " Dyah Ratri Rahadini" },
    { text: "Eka Susilowati", value: " Eka Susilowati" },
    { text: "Eni Sri", value: " Eni Sri" },
    { text: "Eva Yuliana Ari Wardhani", value: " Eva Yuliana Ari Wardhani" },
    { text: "Fadil Amrulloh", value: " Fadil Amrulloh" },
    { text: "Farida S", value: " Farida S" },
    { text: "Ferilia Diadara Ramadhan", value: " Ferilia Diadara Ramadhan" },
    { text: "Fidyah Afiyata", value: " Fidyah Afiyata" },
    { text: "Firda Rahmatika", value: " Firda Rahmatika" },
    { text: "Fitri Aliandini Nakul", value: " Fitri Aliandini Nakul" },
    { text: "Hamam Abi Andrika Lutfi", value: " Hamam Abi Andrika Lutfi" },
    { text: "Hariyati, Amd", value: " Hariyati, Amd" },
    { text: "Heri Susanto", value: " Heri Susanto" },
    { text: "Hidayatul Izza Mufasiroh", value: " Hidayatul Izza Mufasiroh" },
    { text: "Ida Wati", value: " Ida Wati" },
    { text: "Imam Nurhadi", value: " Imam Nurhadi" },
    { text: "Irma lesyana", value: " Irma lesyana" },
    { text: "Irmansah", value: " Irmansah" },
    { text: "Iwan Purnomo", value: " Iwan Purnomo" },
    { text: "Jamaludin", value: " Jamaludin" },
    { text: "Jamingan", value: " Jamingan" },
    { text: "Joeng Loekman Adi Oetomo", value: " Joeng Loekman Adi Oetomo" },
    { text: "M. Saifulloh", value: " M. Saifulloh" },
    { text: "Marjhy Maratapatriata", value: " Marjhy Maratapatriata" },
    { text: "Moh. Tatok Efendi", value: " Moh. Tatok Efendi" },
    { text: "Moch Saifulloh", value: " Moch Saifulloh" },
    { text: "Muhammad Udin Harianto", value: " Muhammad Udin Harianto" },
    { text: "Mulyo Kuntono", value: " Mulyo Kuntono" },
    { text: "Naila R", value: " Naila R" },
    { text: "Nurkolis", value: " Nurkolis" },
    { text: "Pungky Artiwi", value: " Pungky Artiwi" },
    { text: "Puput M", value: " Puput M" },
    { text: "R. Bambang Tri Atmadja", value: " R. Bambang Tri Atmadja" },
    { text: "Ravi Harish Maulana", value: " Ravi Harish Maulana" },
    { text: "Ricky Adi Sanja", value: " Ricky Adi Sanja" },
    { text: "Ristina Yuliani", value: " Ristina Yuliani" },
    { text: "Rizki Kustian", value: " Rizki Kustian" },
    { text: "Robby Sashudi", value: " Robby Sashudi" },
    { text: "Roni Pambudi", value: " Roni Pambudi" },
    { text: "Ronny Hari Prasetyono", value: " Ronny Hari Prasetyono" },
    { text: "Rosita Laila Dewi", value: " Rosita Laila Dewi" },
    { text: "Saiful Imam", value: " Saiful Imam" },
    { text: "Sugeng Asdianto", value: " Sugeng Asdianto" },
    { text: "Sugiono, Stp", value: " Sugiono, Stp" },
    { text: "Susetyo Hadi Purwanto", value: " Susetyo Hadi Purwanto" },
    { text: "Syahrul Marufi", value: " Syahrul Marufi" },
    { text: "Taat Mulyono", value: " Taat Mulyono" },
    { text: "Taufik Septiyanto", value: " Taufik Septiyanto" },
    { text: "Thio Budi Utomo", value: " Thio Budi Utomo" },
    { text: "Tri Edi Kurniawanto", value: " Tri Edi Kurniawanto" },
    { text: "Wahyu Prihanto", value: " Wahyu Prihanto" },
    { text: "Widi Nugraha", value: " Widi Nugraha" },
    { text: "Yanwari Basuki Widodo", value: " Yanwari Basuki Widodo" },
    { text: "Yeni Andriani", value: " Yeni Andriani" },
    { text: "Yudho Lestari Dwi Puspito", value: " Yudho Lestari Dwi Puspito" },
    { text: "Yudi Eko Prabowo", value: " Yudi Eko Prabowo" },
    { text: "Yunita Suzan", value: " Yunita Suzan" },
    { text: "Yusuf Agus Prastomo", value: " Yusuf Agus Prastomo" },
    { text: "Zoni Wirawan", value: " Zoni Wirawan" },
    { text: "Zuh Rohtul Aulia", value: " Zuh Rohtul Aulia" },
  ];

  // const [options, setOptions] = useState([]);
  // const [ruangan, setRuangan] = useState("Ruang tidak terdaftar");
  const ruang = null;

  // let today2 = moment().format("YYYY-MM-DD");
  ///format
  const now = new Date();
  // Mendapatkan tanggal dalam format "YYYY-MM-DD"
  const dateOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "Asia/Jakarta",
  };
  const formattedDate = new Intl.DateTimeFormat("en-US", dateOptions)
    .format(now)
    .replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$3-$1-$2");

  // Mendapatkan waktu dalam format "HH:MM" dengan 24 jam
  const timeOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Jakarta",
  };
  const formattedTime = new Intl.DateTimeFormat("en-US", timeOptions).format(
    now
  );
  const today2 = `${formattedDate} ${formattedTime}`;
  // console.log("today2 ", today2);
  //format end time

  const DUMMY_DB = [
    {
      event_id: 1,
      title: "Meeting Weekly",
      start: new Date(new Date(new Date().setHours(9)).setMinutes(30)),
      end: new Date(new Date(new Date().setHours(10)).setMinutes(30)),
      resource_id: 1,
    },
    {
      event_id: 2,
      title: "Meeting BR",
      start: new Date(new Date(new Date().setHours(11)).setMinutes(0)),
      end: new Date(new Date(new Date().setHours(12)).setMinutes(0)),
      resource_id: 1,
    },
    {
      event_id: 3,
      title: "Meeting Quality",
      start: new Date(
        new Date(new Date(new Date().setHours(9)).setMinutes(0)).setDate(
          new Date().getDate() - 1
        )
      ),
      end: new Date(new Date(new Date().setHours(10)).setMinutes(0)),
      resource_id: 1,
    },
  ];

  const [resources, setResources] = useState("resources");

  const fetchRemote = async (query) => {
    const d = new Date();
    let year = d.getFullYear();
    // console.log("Query: ", query);

    /**Simulate fetching remote data */
    return new Promise((res) => {
      fetch(`http://10.24.7.70:8080/getRESERVE/${year}`, {
        method: "GET",
      })
        .then((response) => {
          return response.json(); // return response.json() first
        })
        .then((json) => {
          // console.log("json ", json);
          const data = json.map((d) => ({
            event_id: d.ID,
            title: d.client_data,
            start: new Date(d.date_of_reserveS),
            end: new Date(d.date_of_reserveE),
            client_name: d.client_name,
            asset_type: d.asset_type,
            destination: d.destination,
            facility: d.facility,
            facility2: d.facility2,
            facility3: d.facility3,
            facility4: d.facility4,
            facility5: d.facility5,
            remarks: d.remarks,
            resource_id:
              d.asset_name == "Auditorium"
                ? 1
                : d.asset_name == "Milk Room"
                ? 2
                : d.asset_name == "Cheese Room"
                ? 3
                : d.asset_name == "Yogurt Room"
                ? 4
                : d.asset_name == "Jersey Room"
                ? 5
                : d.asset_name == "Canteen Room"
                ? 6
                : null,
          }));
          console.log("resources ", resources);
          resources == "resources" ? res(data) : res(DUMMY_DB);
          // setTimeout(() => {
          // }, 1000);
        })
        .catch((error) => {
          toast.error(`onRejected function called: ${error.message}`);
        });
    });
  };

  function parseQuery(queryString) {
    var query = {};
    var pairs = (
      queryString[0] === "?" ? queryString.substr(1) : queryString
    ).split("&");
    for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i].split("=");
      query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || "");
    }
    return query;
  }
  const checkUser = (username) => {
    if (!username) {
      router.push(`/`);
    }
  };

  const checkAdmin = (username, role) => {
    !username || role != 6 ? router.push(`/`) : null;
    // console.log(user);
  };

  const handleConfirm = async (event, action) => {
    // console.log("yang di tambah", event);

    if (event.resource_id === 1) {
      ruang = "Auditorium";
    } else if (event.resource_id === 2) {
      ruang = "Milk Room";
    } else if (event.resource_id === 3) {
      ruang = "Cheese Room";
    } else if (event.resource_id === 4) {
      ruang = "Yogurt Room";
    } else if (event.resource_id === 5) {
      ruang = "Jersey Room";
    } else if (event.resource_id === 6) {
      ruang = "Canteen Room";
    }
    // console.log("setelah edit ruangan ", event);

    if (action === "edit") {
      /** PUT event to remote DB */
      // console.log("user ", user);
      // console.log("user.email ", user.email);
      const newArray = Object.assign(event, {
        ID: event.event_id,
        datesystem: today2,
        footprint: user ? user.email : null,
        asset_name: ruang,
        client_name: event.client_name,
        asset_type: event.asset_type,
        destination: event.destination,
        date_of_reserveS: event.start,
        date_of_reserveE: event.end,
        facility: event.facility,
        remarks: event.remarks,
        client_data: event.title,
        facility2: event.facility2,
        facility3: event.facility3,
        facility4: event.facility4,
        facility5: event.facility5,
        // asset_type: event.asset_type,
        // priority: event.priority,
      });
      // console.log("newArray ", newArray);
      const res = await fetch(`http://10.24.7.70:8080/editRESERVE/${ruang}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newArray),
      });
      if (!res.ok) {
        if (res.status === 403 || res.status === 404) {
          // toast.error("No token included");
          // console.log("No token included");
          // alert("data gagal dirubah");
          toast.error("Change data's failed!");
          return new Promise((res, rej) => {
            // console.log("event before", event);
            res({
              // ...event,event_id: event.event_id || Math.random(),
              event: [],
            });
            // console.log("event after", event);
          });
          return;
        }
        // console.log(res);
        // // setLoading(false);
        // console.log(res.message);
      } else {
        // const evt = await res.json();
        // router.push(`/`);
        console.log(res);
        // setLoading(false);
        // console.log(res.message);
      }
      // Simulate http request: return added/edited event
      return new Promise((res, rej) => {
        setTimeout(() => {
          res({
            ...event,
            event_id: event.event_id || Math.random(),
          });
          // }
        }, 1000);
        // console.log("event2 ", event);
      });
    } else if (action === "create") {
      /**POST/PUT event to remote DB */

      const newArray = Object.assign(event, {
        ID: event.event_id,
        datesystem: today2,
        footprint: user ? user.email : null,
        asset_name: ruang,
        client_name: event.client_name,
        asset_type: event.asset_type,
        destination: event.destination,
        date_of_reserveS: event.start,
        date_of_reserveE: event.end,
        facility: event.facility,
        remarks: event.remarks,
        client_data: event.title,
        facility2: event.facility2,
        facility3: event.facility3,
        facility4: event.facility4,
        facility5: event.facility5,
      });
      // console.log("newArray ", newArray);

      // console.log(fetchRemote);
      const res = await fetch(`http://10.24.7.70:8080/addRESERVE/${ruang}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newArray),
      });
      if (!res.ok) {
        if (res.status === 403 || res.status === 404) {
          // toast.error("No token included");
          // console.log("Data sudah ada");
          // alert("The reservation time's conflict!!");
          toast.error("The reservation time's conflict!!");
          return new Promise((res, rej) => {
            // console.log("event before", event);
            res({
              // ...event,event_id: event.event_id || Math.random(),
              event: [],
            });
            // console.log("event after", event);
          });
          return;
        }
        // console.log("res ", res);
        // setLoading(false);
      } else {
        // const evt = await res.json();
        // router.push(`/`);
        // console.log("res sukses ", res);
        // console.log("res sukses msg ", res.status);
        // setLoading(false);
      }
    }
    // Simulate http request: return added/edited event
    return new Promise((res, rej) => {
      setTimeout(() => {
        res({
          ...event,
          event_id: event.event_id || Math.random(),
        });
        // }
      }, 1000);
      // console.log("event2 ", event);
    });
  };

  const handleDelete = async (deletedId) => {
    // Simulate http request: return the deleted id

    // console.log("deletedId ", deletedId);

    const res = await fetch(
      `http://10.24.7.70:8080/deleteRESERVE/${deletedId}/`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
        // body: JSON.stringify(newArray),
      }
    );
    if (!res.ok) {
      if (res.status === 403 || res.status === 404) {
        // alert("data gagal didelete");
        toast.error("Delete data's failed");
        return new Promise((res, rej) => {
          // console.log("event before", event);
          res({
            // ...event,event_id: event.event_id || Math.random(),
            event: [],
          });
          // console.log("event after", event);
        });
        return;
      }
      // console.log(res);
      // // setLoading(false);
      // console.log(res.message);
    } else {
      // const evt = await res.json();
      // router.push(`/`);
      // console.log(res);
      toast.success("Deleted successfully");
      // setLoading(false);
      // console.log(res.message);
    }
    // Simulate http request: return added/edited event
    // return new Promise((res, rej) => {
    //   setTimeout(() => {
    //     res({
    //       ...event,
    //       event_id: event.event_id || Math.random(),
    //     });
    //     // }
    //   }, 1000);
    //   // console.log("event2 ", event);
    // });

    return new Promise((res, rej) => {
      setTimeout(() => {
        res(deletedId);
      }, 1000);
    });
  };

  const toggleTheme = () => {
    if (resources === "resources") {
      setResources("resourcesAlt");
    } else {
      setResources("resources");
    }
  };

  useEffect(() => {
    // checkUserLoggedIn();
    const username = getCookie("username");
    const role = getCookie("role");
    checkAdmin(username, role);
    // console.log("user", username);
    // console.log("role", role);
    // console.log("all ", getCookies());
  }, []);

  return (
    <Layout Layout title="Room reservation">
      <div style={{ textAlign: "center" }}>
        {/* <span>Resource: </span> */}
        <Button
          color={resources === "resources" ? "primary" : "inherit"}
          variant={resources === "resources" ? "contained" : "text"}
          size="small"
          onClick={() => {
            setResources("resources");
            // console.log(resources);
          }}
        >
          ROOM
        </Button>
        <Button
          color={resources === "resourcesAlt" ? "primary" : "inherit"}
          variant={resources === "resourcesAlt" ? "contained" : "text"}
          size="small"
          onClick={() => {
            setResources("resourcesAlt");
            // console.log(resources);
          }}
        >
          VEHICLE
        </Button>
      </div>
      <ToastContainer />
      <Scheduler
        locale={id}
        getRemoteEvents={fetchRemote}
        editable={true}
        deletable={true}
        draggable={true}
        // events={resources === "resources" ? EVENTS : EVENTSALT}
        resources={resources === "resources" ? RESOURCES : RESOURCESALT}
        onConfirm={handleConfirm}
        onDelete={handleDelete}
        month={{ startHour: 8, weekStartOn: 1, endHour: 17 }}
        week={{ startHour: 8, weekStartOn: 1, endHour: 17 }}
        day={{ startHour: 8, endHour: 17 }}
        hourFormat={24}
        translations={{
          form: {
            addTitle: "Add Meeting",
            editTitle: "Edit Meeting",
            confirm: "Confirm",
            delete: "Delete",
            cancel: "Cancel",
          },
          event: {
            title: " Meeting Title",
            start: "Start",
            end: "End",
            allDay: "All Day",
          },
        }}
        timezone="Asia/Jakarta"
        resourceFields={{
          idField: "resource_id",
          textField: "title",
          subTextField: "mobile",
          avatarField: "title",
          colorField: "color",
        }}
        resourceViewMode="tabs" //default
        fields={[
          {
            name: "resource_id",
            type: "select",
            default: RESOURCES[0].resource_id,
            options: RESOURCES.map((res) => {
              return {
                id: res.resource_id,
                text: `${res.title} (${res.mobile})`,
                value: res.resource_id, //Should match "name" property
              };
            }),
            config: { label: "Room", required: true },
          },
          {
            name: "destination",
            type: "input",
            default: "",

            config: {
              label: "Number of Guests (and companions)",
              multiline: true,
              rows: 2,
              required: true,
              errMsg: "Number of Guests who use the room",
            },
          },
          {
            name: "client_name",
            type: "select",
            // Should provide options with type:"select"

            options: options2,

            // options: options.map((data) => {
            //   return {
            //     text: data.text,
            //     value: data.value,
            //   };
            // }),

            config: {
              label: "Requestor",
              required: true,
              errMsg: "User who reserved the room",
            },
          },
          {
            name: "facility",
            type: "select",
            default: "No",
            // Should provide options with type:"select"
            options: [
              { id: 1, text: "No", value: "No" },
              { id: 2, text: "Lunch", value: "Lunch" },
            ],
            config: {
              label: "Lunch",
              required: true,
              md: 2,
              sm: 2.4,
              errMsg: "Want some Lunch",
            },
          },
          {
            name: "facility3",
            type: "select",
            default: "No",
            // Should provide options with type:"select"
            options: [
              { id: 1, text: "No", value: "No" },
              { id: 2, text: "Snack", value: "Snack" },
            ],
            config: {
              label: "Snack",
              required: true,
              md: 2,
              sm: 2.4,
              errMsg: "Want some Snack",
            },
          },
          {
            name: "facility2",
            type: "select",
            default: "No",
            // Should provide options with type:"select"
            options: [
              { id: 1, text: "No", value: "No" },
              { id: 2, text: "Milk", value: "Milk" },
            ],
            config: {
              label: "Milk",
              required: true,
              md: 2,
              sm: 2.4,
              errMsg: "Want some Milk",
            },
          },
          {
            name: "facility4",
            type: "select",
            default: "No",
            // Should provide options with type:"select"
            options: [
              { id: 1, text: "No", value: "No" },
              { id: 2, text: "Yogurt", value: "Yogurt" },
            ],
            config: {
              label: "Yogurt",
              required: true,
              md: 2,
              sm: 2.4,
              errMsg: "Want some Yogurt",
            },
          },
          {
            name: "facility5",
            type: "select",
            default: "No",
            // Should provide options with type:"select"
            options: [
              { id: 1, text: "No", value: "No" },
              // { id: 2, text: "Milk", value: "Milk" },
              // { id: 3, text: "Snack", value: "Snack" },
              // { id: 4, text: "Yogurt", value: "Yogurt" },
              { id: 2, text: "Other", value: "Other" },
            ],
            config: {
              label: "Other",
              required: true,
              md: 2,
              sm: 2.4,
              errMsg: "anything more ?",
            },
          },
          {
            name: "asset_type",
            type: "select",
            // default: "Tanpa Snack",
            // Should provide options with type:"select"
            options: [
              // { id: 0, text: "Tanpa Snack", value: "Tanpa Snack" },
              {
                id: 3,
                text: "ENGINEERING - 9210DP1105 UTILITIES-MP.PL",
                value: " ENGINEERING - 9210DP1105 UTILITIES-MP.PL",
              },
              {
                id: 12,
                text: "FINANCE - 9210DP3001 F&A-PL",
                value: " FINANCE - 9210DP3001 F&A-PL",
              },
              {
                id: 17,
                text: "FINANCE HO - 9201DQGI91 F&A HO",
                value: " FINANCE HO - 9201DQGI91 F&A HO",
              },
              {
                id: 13,
                text: "HRGA - 9210DP3002 HR & GA-PL",
                value: " HRGA - 9210DP3002 HR & GA-PL",
              },
              {
                id: 2,
                text: "MILK PRODUCTION - FILLING - 9210DP1103 FILLING PACKING GALDI 270-MP.PL",
                value:
                  " MILK PRODUCTION - FILLING - 9210DP1103 FILLING PACKING GALDI 270-MP.PL",
              },
              {
                id: 1,
                text: "MILK PRODUCTION - PROCESSING - 9210DP1101 STERILISASI & PASTEURISASI-MP.PL",
                value:
                  " MILK PRODUCTION - PROCESSING - 9210DP1101 STERILISASI & PASTEURISASI-MP.PL",
              },
              {
                id: 14,
                text: "PERFORMANCE & SAFETY - 9210DP3007 HEALTH SAFETY ENVIRONMENT-PL",
                value:
                  " PERFORMANCE & SAFETY - 9210DP3007 HEALTH SAFETY ENVIRONMENT-PL",
              },
              {
                id: 16,
                text: "PRODUCTION - CHEESE - 9210DP1201 CHEESE PROCESSING-CHEESE PL",
                value:
                  " PRODUCTION - CHEESE - 9210DP1201 CHEESE PROCESSING-CHEESE PL",
              },
              {
                id: 15,
                text: "PRODUCTION - YOGURT - 9210DP1308 GENERAL YOGURT",
                value: " PRODUCTION - YOGURT - 9210DP1308 GENERAL YOGURT",
              },
              {
                id: 6,
                text: "QA - LABORATORY - 9210DP1107 OTH PROD-MP.PL",
                value: " QA - LABORATORY - 9210DP1107 OTH PROD-MP.PL",
              },
              {
                id: 5,
                text: "QUALITY ASSURANCE - 9210DP1107 OTH PROD-MP.PL",
                value: " QUALITY ASSURANCE - 9210DP1107 OTH PROD-MP.PL",
              },
              {
                id: 4,
                text: "QUALITY CONTROL - 9210DP1106 QC-MP.PL",
                value: " QUALITY CONTROL - 9210DP1106 QC-MP.PL",
              },
              {
                id: 7,
                text: "SUPPLY CHAIN - LOGISTIC/WAREHOUSE - 9210DP1161 WAREHOUSE PL-MP.PL",
                value:
                  " SUPPLY CHAIN - LOGISTIC/WAREHOUSE - 9210DP1161 WAREHOUSE PL-MP.PL",
              },
              {
                id: 8,
                text: "SUPPLY CHAIN - LOGISTIC/WAREHOUSE - 9210DP1165 WAREHOUSE UHT – MP PL",
                value:
                  " SUPPLY CHAIN - LOGISTIC/WAREHOUSE - 9210DP1165 WAREHOUSE UHT – MP PL",
              },
              {
                id: 9,
                text: "SUPPLY CHAIN - LOGISTIC/WAREHOUSE - 9210DP1166 WAREHOUSE MATERIAL & SP PL – MP PL",
                value:
                  " SUPPLY CHAIN - LOGISTIC/WAREHOUSE - 9210DP1166 WAREHOUSE MATERIAL & SP PL – MP PL",
              },
              {
                id: 10,
                text: "SUPPLY CHAIN - LOGISTIC/WAREHOUSE - 9210DP1164 WAREHOUSE CHILL PL – MP PL",
                value:
                  " SUPPLY CHAIN - LOGISTIC/WAREHOUSE - 9210DP1164 WAREHOUSE CHILL PL – MP PL",
              },
              {
                id: 11,
                text: "SUPPLY CHAIN - PPIC - 9210DP3004 SUPPLY CHAIN MANAGEMENT-PL",
                value:
                  " SUPPLY CHAIN - PPIC - 9210DP3004 SUPPLY CHAIN MANAGEMENT-PL",
              },
            ],
            config: {
              label: "Cost Center",
              required: true,
              // md: 2,
              // sm: 2.4,
              errMsg: "c ?",
            },
          },
          {
            name: "remarks",
            type: "input",
            default: "",
            config: {
              label: "Requested detail",
              multiline: true,
              rows: 4,
            },
          },
        ]}
        viewerExtraComponent={(fields, event) => {
          return (
            <div>
              {fields.map((field, i) => {
                if (field.name === "resource_id") {
                  const admin = field.options.find(
                    (fe) => fe.id === event.resource_id
                  );
                  return (
                    // <Typography
                    //   key={i}
                    //   style={{ display: "flex", alignItems: "center" }}
                    //   color="textSecondary"
                    //   variant="caption"
                    //   noWrap
                    // >
                    //   <PersonRoundedIcon /> {admin ? admin.text : ""}
                    // </Typography>
                    <Typography
                      style={{ display: "flex", alignItems: "center" }}
                      color="textSecondary"
                      variant="caption"
                      noWrap
                    >
                      <PersonRoundedIcon /> {event.client_name} -
                      {event.facility}
                    </Typography>
                  );
                } else {
                  return "";
                }
              })}
            </div>
          );
        }}
      />
    </Layout>
  );
}
