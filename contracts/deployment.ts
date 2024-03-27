export const deployment = {
  openRD: {
    openRD: { tasks: "0xeF699CA61f04916358e446bA0DbB9C6Ab9F86A5C" },
    openRDDaoExtensions: {
      taskDisputes: "0xA358622722E21E4eA2641B8967187da2Ca2940BD",
      taskDrafts: "0x959e14f6a3522Ab193e1282964b532a05A43F780",
    },
    openRFP: { RFPs: "0x03034a94aA7e9A20EC50C1c3494E7f3b4b7B3405" },
  },
  smartAccounts: {
    openmeshAdmin: { admin: "0xB4e54a5B6b80AFdb5DC4B5d8c1c66b75FF75FCaE" },
    departments: {
      disputeDepartment: "0x8236E099826551b3e576643dc3CA3B6a005AFAe9",
      coreMemberDepartment: "0xE6E79d15cc2CD24038D535bBBb1942Efda917A67",
      expertDepartment: "0x875497BBa10de19eC4430BdBd1204FFB8C3aD635",
    },
  },
  tokennomics: {
    openToken: { openToken: "0xe13f4712233C534fbABd769e92B4acc716532157" },
    validatorPass: {
      validatorPass: "0x30D60732a26137696a2671CfEa19A9E8510E35fA",
    },
    openmeshGenesis: {
      openmeshGenesis: "0x4662d0de51fCA9e10AdD8C39171047dE639E2e22",
    },
    openClaiming: {
      ovcClaiming: "0x9f786a0cFaa948F027Dd34C72cf6A13B7b9e32E9",
      nodeClaiming: "0x084Dd44eA1DCEd487B566e5c9690dc0987b769B0",
    },
  },
  departments: {
    verifiedContributor: {
      verifiedContributor: "0x1a4b0079e59b470279552A70A540a51f6137f607",
    },
    verifiedContributorTagManager: "0x184d2cc273013bdeCDC57d2E7382f4d2795476a0",
    verifiedContributorCountTrustlessManagement: "0x16E518d5A9aa93a1A51c8c3DC46906DD18e8397D",
    verifiedContributorTagTrustlessManagement: "0x30669e4627C182d69D94E9FE923F68DC0E2353Fa",
    departmentDaos: {
      departmentFactory: {
        departmentFactory: "0x187c9A83C341D787de9D43535af8fcC29cDF6Bc1",
        departmentOwner: {
          dao: "0x274f2549b0d17447CBAa9a0f3b0Eb690dcEd359E",
          tokenVoting: "0x0D2A7e109E921bEbEEEC0129F0116B990BEC6fd6",
        },
      },
      disputeDepartment: {
        dao: "0x1C7363664B8CEE19E5fFcC6EE1855f748af80681",
        tagVoting: "0xEF8bb4aCb8cece62Ed353f18B8148869900a21E3",
      },
      coreMemberDepartment: {
        dao: "0x0f38a5a0907B4a97ab33d0152377f3351E1be06B",
        tagVoting: "0x55a1424A15516DE2DECd818f508750F07818B0B6",
      },
      expertDepartment: {
        dao: "0x3E0210B0798134866573AEa8F669cdc2166e818f",
        tagVoting: "0xdFD6F8a0855885BCCC374Cc878EB01d5E2D98f40",
      },
    },
  },
  crossChainDepartments: {
    disputeDepartment: "0x6F77a6db94CfF863312e6A56f748932e34dEB4e9",
    coreMemberDepartment: "0xE2a93889c351Fb4495C06B8f0b0A749C20222578",
    expertDepartment: "0x0755D32c18eab4E1A60BfCf6918b68831547dC22",
  },
} as const;
