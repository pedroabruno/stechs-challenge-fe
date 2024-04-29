export const cableModemTableColumns = [
    {
      key: "name",
      label: "NAME",
    },
    {
      key: "description",
      label: "DESCRIPTION",
    },
    {
      key: "status",
      label: "STATUS",
    },
    {
        key: "validSince",
        label: "Valid Since",
      },
      {
        key: "actions",
        label: "Actions",
      },
  ];



export const cableModemTagList = [
    {label: "Coaxial Cable", value: "coaxialCable"},
    {label: "Optical Fiber", value: "opticalFiber"},
    {label: "Modem", value: "modem"},
    {label: "Router", value: "router"},
    {label: "Hub", value: "hub"},
  ];

export const CABLE_MODEM_BUTTON_TYPE = {
    EDIT:{value:'edit'},
    DELETE:{value:'delete'},
}

export const CABLE_MODEM_STATUS = {
    ACTIVE:{value:'Active'},
    SUSPENDED:{value:'Suspended'},
    PROVISION:{value:'Provision'}
}

export const cableModemStatusList = [
    {
      key: CABLE_MODEM_STATUS.ACTIVE.value,
      label: "Active",
    },
    {
      key: CABLE_MODEM_STATUS.SUSPENDED.value,
      label: "Suspended",
    },
    {
      key: CABLE_MODEM_STATUS.PROVISION.value,
      label: "Provision",
    },
];