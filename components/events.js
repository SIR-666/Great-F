import React from "react";

export const EVENTS = [
  // {
  //   event_id: 1,
  //   title: "Meeting Weekly",
  //   start: new Date(new Date(new Date().setHours(9)).setMinutes(30)),
  //   end: new Date(new Date(new Date().setHours(10)).setMinutes(30)),
  //   resource_id: 1,
  // },
  // {
  //   event_id: 2,
  //   title: "Meeting BR",
  //   start: new Date(new Date(new Date().setHours(10)).setMinutes(0)),
  //   end: new Date(new Date(new Date().setHours(11)).setMinutes(0)),
  //   resource_id: 2,
  // },
  // {
  //   event_id: 3,
  //   title: "Meeting Quality",
  //   start: new Date(
  //     new Date(new Date(new Date().setHours(9)).setMinutes(0)).setDate(
  //       new Date().getDate() - 1
  //     )
  //   ),
  //   end: new Date(new Date(new Date().setHours(10)).setMinutes(0)),
  //   resource_id: 1,
  // },
  // {
  //   event_id: 4,
  //   title: "Meeting Logistik",
  //   start: new Date(
  //     new Date(new Date(new Date().setHours(9)).setMinutes(0)).setDate(
  //       new Date().getDate() - 2
  //     )
  //   ),
  //   end: new Date(
  //     new Date(new Date(new Date().setHours(10)).setMinutes(0)).setDate(
  //       new Date().getDate() - 2
  //     )
  //   ),
  //   resource_id: 2,
  // },
  // {
  //   event_id: 5,
  //   title: "Meeting QC",
  //   start: new Date(
  //     new Date(new Date(new Date().setHours(10)).setMinutes(0)).setDate(
  //       new Date().getDate() - 2
  //     )
  //   ),
  //   end: new Date(
  //     new Date(new Date(new Date().setHours(11)).setMinutes(0)).setDate(
  //       new Date().getDate() + 10
  //     )
  //   ),
  //   resource_id: 4,
  // },
  // {
  //   event_id: 6,
  //   title: "Meeting Performance",
  //   start: new Date(new Date(new Date().setHours(11)).setMinutes(0)),
  //   end: new Date(new Date(new Date().setHours(12)).setMinutes(0)),
  //   resource_id: 2,
  // },
  // {
  //   event_id: 7,
  //   title: "Meeting Safety",
  //   start: new Date(
  //     new Date(new Date(new Date().setHours(11)).setMinutes(0)).setDate(
  //       new Date().getDate() - 1
  //     )
  //   ),
  //   end: new Date(
  //     new Date(new Date(new Date().setHours(12)).setMinutes(0)).setDate(
  //       new Date().getDate() - 1
  //     )
  //   ),
  //   resource_id: 3,
  // },
  // {
  //   event_id: 8,
  //   title: "Meeting QC",
  //   start: new Date(
  //     new Date(new Date(new Date().setHours(13)).setMinutes(0)).setDate(
  //       new Date().getDate() - 1
  //     )
  //   ),
  //   end: new Date(
  //     new Date(new Date(new Date().setHours(14)).setMinutes(0)).setDate(
  //       new Date().getDate() - 1
  //     )
  //   ),
  //   resource_id: 4,
  // },
  // {
  //   event_id: 9,
  //   title: "Meeting Logistik",
  //   start: new Date(
  //     new Date(new Date(new Date().setHours(13)).setMinutes(0)).setDate(
  //       new Date().getDate() + 1
  //     )
  //   ),
  //   end: new Date(
  //     new Date(new Date(new Date().setHours(15)).setMinutes(30)).setDate(
  //       new Date().getDate() + 1
  //     )
  //   ),
  //   resource_id: 1,
  // },
  // {
  //   event_id: 10,
  //   title: "Meeting BR",
  //   start: new Date(
  //     new Date(new Date(new Date().setHours(15)).setMinutes(0)).setDate(
  //       new Date().getDate() + 1
  //     )
  //   ),
  //   end: new Date(
  //     new Date(new Date(new Date().setHours(16)).setMinutes(30)).setDate(
  //       new Date().getDate() + 1
  //     )
  //   ),
  //   resource_id: 2,
  // },
  // {
  //   event_id: 11,
  //   title: "Meeting Greenway",
  //   start: new Date(
  //     new Date(new Date(new Date().setHours(11)).setMinutes(0)).setDate(
  //       new Date().getDate() - 1
  //     )
  //   ),
  //   end: new Date(
  //     new Date(new Date(new Date().setHours(15)).setMinutes(0)).setDate(
  //       new Date().getDate() - 1
  //     )
  //   ),
  //   resource_id: 1,
  // },
];

export const RESOURCES = [
  {
    resource_id: 1,
    title: "Auditorium",
    mobile: "40 person",
    avatar: "https://picsum.photos/200/300",
    color: "#ab2d2d",
  },
  {
    resource_id: 2,
    title: "Milk Room",
    mobile: "25 person",
    avatar: "https://picsum.photos/200/300",
    color: "#08c5bd",
  },
  {
    resource_id: 3,
    title: "Cheese Room",
    mobile: "5 person",
    avatar: "https://picsum.photos/200/300",
    color: "#58ab2d",
  },

  {
    resource_id: 4,
    title: "Yogurt Room",
    mobile: "5 person",
    avatar: "https://picsum.photos/200/300",
    color: "#28c508",
  },
  {
    resource_id: 5,
    title: "Jersey Room",
    mobile: "22 person",
    avatar: "https://picsum.photos/200/300",
    color: "#a001a2",
  },
  {
    resource_id: 6,
    title: "Canteen Room",
    mobile: "15 person",
    avatar: "https://picsum.photos/200/300",
    color: "#1567bf",
  },
  {
    resource_id: 7,
    title: "PKL Room",
    mobile: "2 person",
    avatar: "https://picsum.photos/200/300",
    color: "#FF9900",
  },
  // {
  //     resource_id: 7,
  //     title: "MES Room",
  //     mobile: "4 orang",
  //     avatar: "https://picsum.photos/200/300",
  //     color: "#28c508",
  //   },
];

export const EVENTSALT = [
  {
    event_id: 1,
    title: "Ke Surabaya",
    start: new Date(new Date(new Date().setHours(9)).setMinutes(30)),
    end: new Date(new Date(new Date().setHours(10)).setMinutes(30)),
    resource_id: "work",
  },
  {
    event_id: 2,
    title: "Ke PT SAG",
    start: new Date(new Date(new Date().setHours(10)).setMinutes(0)),
    end: new Date(new Date(new Date().setHours(11)).setMinutes(0)),
    resource_id: "leasure",
  },
  {
    event_id: 3,
    title: "Antar tamu BOD",
    start: new Date(
      new Date(new Date(new Date().setHours(9)).setMinutes(0)).setDate(
        new Date().getDate() - 1
      )
    ),
    end: new Date(new Date(new Date().setHours(10)).setMinutes(0)),
    resource_id: "leasure",
  },
  {
    event_id: 4,
    title: "Ke Farm 2",
    start: new Date(
      new Date(new Date(new Date().setHours(9)).setMinutes(0)).setDate(
        new Date().getDate() - 2
      )
    ),
    end: new Date(
      new Date(new Date(new Date().setHours(10)).setMinutes(0)).setDate(
        new Date().getDate() - 2
      )
    ),
    resource_id: "leasure",
  },
  {
    event_id: 5,
    title: "Event Marketing",
    start: new Date(
      new Date(new Date(new Date().setHours(10)).setMinutes(0)).setDate(
        new Date().getDate() - 2
      )
    ),
    end: new Date(
      new Date(new Date(new Date().setHours(11)).setMinutes(0)).setDate(
        new Date().getDate() + 10
      )
    ),
    resource_id: "work",
  },
  {
    event_id: 6,
    title: "Dinas Luar Pak Loekman",
    start: new Date(new Date(new Date().setHours(11)).setMinutes(0)),
    end: new Date(new Date(new Date().setHours(12)).setMinutes(0)),
    resource_id: "work",
  },
  {
    event_id: 7,
    title: "Jemput tamu Bu Eva",
    start: new Date(
      new Date(new Date(new Date().setHours(11)).setMinutes(0)).setDate(
        new Date().getDate() - 1
      )
    ),
    end: new Date(
      new Date(new Date(new Date().setHours(12)).setMinutes(0)).setDate(
        new Date().getDate() - 1
      )
    ),
    resource_id: "work",
  },
  {
    event_id: 8,
    title: "Training di Four Points",
    start: new Date(
      new Date(new Date(new Date().setHours(13)).setMinutes(0)).setDate(
        new Date().getDate() - 1
      )
    ),
    end: new Date(
      new Date(new Date(new Date().setHours(14)).setMinutes(0)).setDate(
        new Date().getDate() - 1
      )
    ),
    resource_id: "leasure",
  },
  {
    event_id: 9,
    title: "Antar Bu Irma ke Juanda",
    start: new Date(
      new Date(new Date(new Date().setHours(13)).setMinutes(0)).setDate(
        new Date().getDate() + 1
      )
    ),
    end: new Date(
      new Date(new Date(new Date().setHours(15)).setMinutes(30)).setDate(
        new Date().getDate() + 1
      )
    ),
    resource_id: "leasure",
  },
  {
    event_id: 10,
    title: "Antar PKL visit Farm",
    start: new Date(
      new Date(new Date(new Date().setHours(15)).setMinutes(0)).setDate(
        new Date().getDate() + 1
      )
    ),
    end: new Date(
      new Date(new Date(new Date().setHours(16)).setMinutes(30)).setDate(
        new Date().getDate() + 1
      )
    ),
    resource_id: "work",
  },
  {
    event_id: 11,
    title: "Audit distributor QA",
    start: new Date(
      new Date(new Date(new Date().setHours(11)).setMinutes(0)).setDate(
        new Date().getDate() - 1
      )
    ),
    end: new Date(
      new Date(new Date(new Date().setHours(15)).setMinutes(0)).setDate(
        new Date().getDate() - 1
      )
    ),
    resource_id: "work",
  },
];

export const RESOURCESALT = [
  {
    resource_id: "leasure",
    title: "Mobil 1",
    mobile: "N 217 AN",
    avatar: "Leasure",
    color: "#ff0000",
  },
  {
    resource_id: "work",
    title: "Mobil 2",
    mobile: "N 3 EO",
    avatar: "Work",
    color: "#58ab2d",
  },
];
