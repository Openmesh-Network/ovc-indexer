export const deployment = {
  openRD: {
    openRD: { tasks: "0x52a7E7C9EB8d92BdFC3B08550EDC8B1f7Eb5fE47" },
    openRDDaoExtensions: {
      taskDisputes: "0x99b3c88E4c4Ab2489e487C9870899443dDDFdF00",
      taskDrafts: "0x21BAC8BA74E54eeCf9b67C509CF802f8FA938B67",
    },
    openRFP: { RFPs: "0x14384C4B046FB1908EC66cF0a936fA54053E2590" },
  },
  smartAccounts: {
    openmeshAdmin: { admin: "0xCb762Ab29cD7911B1d90ED588dE9d1cBdF21cD68" },
    departments: {
      disputeDepartment: "0x6003d4ce9C0441b6673669154392784Ad3dB1441",
      coreMemberDepartment: "0xC9e0D0386b223b3944E6F20685CDAF87aa34e1E6",
      expertDepartment: "0xA882Ed823558d2c0D1B2CBf5Fc7ED10C617D5607",
    },
  },
  tokennomics: {
    openToken: { openToken: "0xbd109A3B0c5a2A085F73240889cf2fe05c7e7d30" },
    validatorPass: {
      validatorPass: "0x9CDF15f93AC1F57419eE0ef313b04FcEdc946585",
    },
    openmeshGenesis: {
      openmeshGenesis: "0xbf818805e5431772ea6946ED4AEC614c51c37daf",
    },
    openClaiming: {
      ovcClaiming: "0x77147fD0142619CDF70369CdC90Bc4956c260953",
      nodeClaiming: "0xb1A1EEC92Dc71d0e4334c116B99512Eb9EA928c9",
    },
  },
  departments: {
    verifiedContributor: {
      verifiedContributor: "0x23cdba70470C2D119396fD5584b3e362727FcE4C",
    },
    verifiedContributorTagManager: "0x339cFED035F30A5155AAD4964565E8BdD7f70f0b",
    verifiedContributorCountTrustlessManagement: "0x1788Ff7597B77787bCd19A774f88D8237e2e7690",
    verifiedContributorTagTrustlessManagement: "0x4087CdEC13559B75428BE770e9799f2F02d21CaE",
    departmentDaos: {
      departmentFactory: {
        departmentFactory: "0x90962a3c16246D20a617D02dc88fc13b4128d7ad",
        departmentOwner: {
          dao: "0x8E3798A24c15C6E8e87ea02ef78B023710584e3a",
          tokenVoting: "0xB80cCc09c1A3C000702088B06aD6420F156eC07e",
        },
      },
      smartAccountDepartmentInstaller: "0x361d3799e3890627bb1b30AaF44eB84c7F5DB91C",
      disputeDepartment: {
        dao: "0xb689ad333eB30F67cdA8e8ebA4B18bdE14753dA1",
        tagVoting: "0xC02bd14d4dd41DBe027044FbeFab7c08f9055A9f",
      },
      coreMemberDepartment: {
        dao: "0x8300Df67b70E6CCCb2c3de5369C06b2C95d6DEBe",
        tagVoting: "0xf1A3Cc13B48C4A202B4552bCE9bC6cf3E21d4cFC",
      },
      expertDepartment: {
        dao: "0x028fC5eA1Adb81c91E7901F8AdA4eB63886b46cd",
        tagVoting: "0xC6bF369e0e29b7dc95C36b1daE097bB609A28e2b",
      },
    },
  },
  crossChainDepartments: {
    disputeDepartment: "0x3997611534D113d19766AddF0e8274BA4f03dfDd",
    coreMemberDepartment: "0x08435BFCc4ecDE7ef8fbf32F91b4384759407390",
    expertDepartment: "0xDa8818427586a5C24f55483F9709DB382DD578a3",
  },
} as const;
