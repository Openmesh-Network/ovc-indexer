export const deployment = {
  openRD: {
    openRD: { tasks: "0x00ABa4E556Fb72D5fA7D8085F3ab716fA998dF40" },
    openRDDaoExtensions: {
      taskDisputes: "0x52608D67Ed4D8136A18674570d6863d021FC6bf0",
      taskDrafts: "0x64882f9Ba2Df66C31C38b59b382F7e613717af34",
    },
    openRFP: { RFPs: "0xe14295f49C0d1e430B74f634c395Fa9805F12991" },
  },
  smartAccounts: {
    openmeshAdmin: { admin: "0xD8CEAE969142C9216893d4875c185b4bfbfF452e" },
    departments: {
      disputeDepartment: "0x49723Ea8db16bfD824A0bE9447D3ADA0fBAbB152",
      coreMemberDepartment: "0x8d11B55b0c010b00a17112180eF62F7FEB91a03c",
    },
  },
  tokennomics: {
    openToken: { openToken: "0x7a424675017c9B11D90080A95D5Bb75Ea10631Bb" },
    validatorPass: {
      validatorPass: "0x38C1fB668B8Ad15aeb109428Af4868b6e6FaB7a9",
    },
    openmeshGenesis: {
      openmeshGenesis: "0xffb8861F8fc16827dD21A9f3F44379AC2651B588",
    },
    openClaiming: {
      ovcClaiming: "0xc6a2CB9fb6Ba653Bc86EED18073457Dc0Bbe0C41",
      nodeClaiming: "0xbf37525b5B8b258ff714a5416aE7412C8B806581",
    },
  },
  departments: {
    verifiedContributor: {
      verifiedContributor: "0xe820B2Fef0484480d48F51e695781e3830526Cc7",
    },
    verifiedContributorTagManager: "0x5E11CD5865ac438e4C5E3bB9EC160bAC541fD1Af",
    verifiedContributorCountTrustlessManagement:
      "0x6387ADA364134ddC7F29b5837577E809C0741E29",
    verifiedContributorTagTrustlessManagement:
      "0xbDa98E0f508ED883bb7D067E28DCBd04fe1B1a7D",
    departmentDaos: {
      departmentFactory: {
        departmentFactory: "0x63Ff043A53f0E9A03b8203F40E9c4EE60561fC30",
        departmentOwner: "0xB45849A6c8F24905C4317e2AdE9e045EE70dfE3A",
      },
      disputeDepartment: {
        dao: "0xFDD2e0fF31a5cac5695cB8150D310DAf2A0ef91A",
        tagVoting: "0x04D28496B3d1164677fe5e0A44F857A4F18e72eE",
      },
      coreMemberDepartment: {
        dao: "0x41D8114Af7aB2CC2923B2F249C041411eb92594f",
        tagVoting: "0x89FdE26EEa96eC41217A46f37c8c87a1720c156f",
      },
    },
  },
  crossChainDepartments: {
    disputeDepartment: "0x429F6171bB46f9A3796Bd67980589D25149002Fb",
    coreMemberDepartment: "0x8aF4E3F829de9E913A7fEEd48e26054E09378e87",
  },
} as const;
